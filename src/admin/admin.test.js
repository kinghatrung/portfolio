import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import content from "../data/content.json" with { type: "json" };
import { sections, emptyItem, move } from "./schema.js";
import { imageFileName, loadContent, login, saveContent, uploadImage } from "./github.js";
import { parseRichText } from "../utils/richText.js";
import { toWebp } from "./image.js";

const store = new Map();
globalThis.sessionStorage = {
  getItem: (k) => store.get(k) ?? null,
  setItem: (k, v) => store.set(k, v),
  removeItem: (k) => store.delete(k),
};

let calls;
const mockFetch = (status, body) => {
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: status < 400, status, json: async () => body };
  };
};

beforeEach(() => {
  calls = [];
  store.clear();
  store.set("admin_github_token", "secret");
});

// A key missing on either side means a field the admin can't edit, or one the site can't read.
function assertSchemaMatches(fields, value, where) {
  assert.deepEqual(Object.keys(value).sort(), fields.map((f) => f.key).sort(), where);
  for (const f of fields) {
    if (f.type !== "list") continue;
    value[f.key].forEach((item, i) => assertSchemaMatches(f.fields, item, `${where}.${f.key}[${i}]`));
  }
}

test("schema covers every field in content.json, nothing more", () => {
  for (const section of sections) assertSchemaMatches(section.fields, content[section.id], section.id);
  const ids = sections.map((s) => s.id);
  assert.deepEqual(Object.keys(content).filter((k) => k !== "sectionOrder").sort(), [...ids].sort());
});

test("every ordered section is marked orderable and vice versa", () => {
  const orderable = sections.filter((s) => s.orderable).map((s) => s.id);
  assert.deepEqual([...content.sectionOrder].sort(), orderable.sort());
});

test("emptyItem matches what section components read", () => {
  const projectFields = sections.find((s) => s.id === "projects").fields.find((f) => f.key === "items").fields;
  const item = emptyItem(projectFields);
  assert.deepEqual(item.technologies, []);
  assert.deepEqual(item.gallery, []);
  assert.equal(item.title, "");
  assert.match(item.color, /^#[0-9a-f]{6}$/);
  assert.equal(emptyItem([{ key: "icon", type: "select", options: ["a", "b"] }]).icon, "a");
});

test("move swaps neighbours and ignores out-of-range moves", () => {
  assert.deepEqual(move(["a", "b", "c"], 0, 1), ["b", "a", "c"]);
  assert.deepEqual(move(["a", "b"], 0, -1), ["a", "b"]);
  assert.deepEqual(move(["a", "b"], 1, 1), ["a", "b"]);
});

test("parseRichText splits highlights", () => {
  assert.deepEqual(parseRichText("A [[b]] c {{d}}."), [
    { text: "A " },
    { text: "b", tone: "blue" },
    { text: " c " },
    { text: "d", tone: "violet" },
    { text: "." },
  ]);
  assert.deepEqual(parseRichText("[[ only"), [{ text: "[[ only" }]);
  assert.deepEqual(parseRichText(), []);
});

test("load and save keep Vietnamese text intact", async () => {
  const original = { name: "Nguyễn Đức ∞" };
  let sent;
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    if (options.method === "PUT") {
      sent = JSON.parse(options.body);
      return { ok: true, status: 200, json: async () => ({ content: { sha: "new" }, commit: { html_url: "u" } }) };
    }
    const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(original))));
    return { ok: true, status: 200, json: async () => ({ content: b64, sha: "old" }) };
  };

  const loaded = await loadContent();
  assert.deepEqual(loaded, { content: original, sha: "old" });
  assert.equal(calls[0].options.cache, "no-store");

  const result = await saveContent(loaded.content, loaded.sha);
  assert.deepEqual(result, { sha: "new", commitUrl: "u" });
  assert.equal(sent.sha, "old");
  const decoded = new TextDecoder().decode(Uint8Array.from(atob(sent.content), (c) => c.charCodeAt(0)));
  assert.deepEqual(JSON.parse(decoded), original);
});

test("a stale save fails loudly instead of overwriting", async () => {
  mockFetch(409, { message: "conflict" });
  await assert.rejects(saveContent({}, "stale"), /Chưa có gì bị ghi đè/);
});

test("login stores the token only when it can write", async () => {
  store.clear();
  mockFetch(200, { permissions: { push: false } });
  await assert.rejects(login("readonly"));
  assert.equal(store.size, 0);

  mockFetch(401, {});
  await assert.rejects(login("bad"), /không hợp lệ/);
  assert.equal(store.size, 0);

  mockFetch(200, { permissions: { push: true } });
  await login("  good\n");
  assert.equal(store.get("admin_github_token"), "good");
});

test("network failure gives a readable error", async () => {
  globalThis.fetch = async () => {
    throw new TypeError("Failed to fetch");
  };
  await assert.rejects(loadContent(), /Không kết nối được/);
});

test("imageFileName makes a safe unique path", () => {
  assert.equal(imageFileName("Ảnh Bìa (1).PNG", 5), "5-anh-bia-1.png");
  assert.equal(imageFileName("../../evil.svg", 5), "5-evil.svg");
  assert.equal(imageFileName("文件.webp", 5), "5-image.webp");
  assert.throws(() => imageFileName("script.html"), /Chỉ nhận ảnh/);
  assert.throws(() => imageFileName("noextension"), /Chỉ nhận ảnh/);
});

test("uploadImage rejects oversize files before calling GitHub", async () => {
  mockFetch(201, {});
  await assert.rejects(uploadImage({ name: "a.png", size: 6 * 1024 * 1024 }), /quá lớn/);
  assert.equal(calls.length, 0);
});

test("uploadImage commits to public/uploads and returns the public path", async () => {
  mockFetch(201, {});
  const path = await uploadImage(new File([new Uint8Array([1, 2, 3])], "logo.png"));
  assert.match(path, /^\/uploads\/\d+-logo\.png$/);
  assert.ok(calls[0].url.endsWith(`/contents/public${path}`));
  assert.equal(JSON.parse(calls[0].options.body).content, "AQID");
});

test("toWebp shrinks png/jpeg to a WebP of at most 1600px and leaves other files alone", async () => {
  let drawn;
  globalThis.createImageBitmap = async () => ({ width: 4000, height: 2000, close() {} });
  globalThis.OffscreenCanvas = class {
    constructor(w, h) {
      this.width = w;
      this.height = h;
    }
    getContext() {
      return { drawImage: (_, x, y, w, h) => (drawn = [w, h]) };
    }
    async convertToBlob({ type }) {
      return new Blob([new Uint8Array(10)], { type: blobType ?? type });
    }
  };
  let blobType;
  const big = new File([new Uint8Array(1000)], "Shot.PNG", { type: "image/png" });

  const out = await toWebp(big);
  assert.deepEqual(drawn, [1600, 800]);
  assert.equal(out.name, "Shot.webp");
  assert.equal(out.type, "image/webp");

  const svg = new File(["<svg/>"], "logo.svg", { type: "image/svg+xml" });
  assert.equal(await toWebp(svg), svg);

  blobType = "image/png"; // browser without WebP encoding
  assert.equal(await toWebp(big), big);

  blobType = undefined;
  const tiny = new File([new Uint8Array(5)], "dot.png", { type: "image/png" });
  assert.equal(await toWebp(tiny), tiny); // re-encoding would not save anything

  globalThis.createImageBitmap = async () => {
    throw new Error("cannot decode");
  };
  assert.equal(await toWebp(big), big);
});
