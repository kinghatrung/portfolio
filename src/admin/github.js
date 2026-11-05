// The repo is the database: the admin reads and commits content through the GitHub API,
// and the host redeploys on every commit. GitHub enforces the token, so no secret ships in the bundle.
const REPO = "kinghatrung/portfolio";
const BRANCH = "main";
const CONTENT_PATH = "src/data/content.json";
const API = `https://api.github.com/repos/${REPO}`;
const TOKEN_KEY = "admin_github_token";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);

const ERRORS = {
  401: "Token không hợp lệ hoặc đã hết hạn. Hãy đăng xuất và đăng nhập lại.",
  403: "Token không có quyền ghi vào repo, hoặc đã vượt giới hạn của GitHub.",
  404: `Không tìm thấy repo ${REPO} hoặc file nội dung. Kiểm tra quyền của token và đã push code lên nhánh ${BRANCH} chưa.`,
  409: "Nội dung trên GitHub vừa thay đổi. Chưa có gì bị ghi đè. Hãy thử lưu lại; nếu vẫn lỗi, tải lại trang.",
};

async function request(path, options = {}, token = getToken()) {
  let res;
  try {
    // no-store: a cached read would return an old sha and make the next save conflict.
    res = await fetch(`${API}${path}`, {
      cache: "no-store",
      ...options,
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    });
  } catch {
    throw new Error("Không kết nối được tới GitHub. Kiểm tra mạng rồi thử lại.");
  }
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(ERRORS[res.status] || detail.message || `GitHub báo lỗi ${res.status}.`);
  }
  return res.json();
}

function toBase64(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(base64) {
  const binary = atob(base64.replace(/\s/g, ""));
  return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
}

export async function login(rawToken) {
  const token = rawToken.trim();
  const repo = await request("", {}, token);
  if (repo.permissions?.push === false) throw new Error(ERRORS[403]);
  sessionStorage.setItem(TOKEN_KEY, token);
}

export async function loadContent() {
  const file = await request(`/contents/${CONTENT_PATH}?ref=${BRANCH}`);
  return { content: JSON.parse(fromBase64(file.content)), sha: file.sha };
}

export async function saveContent(content, sha) {
  const result = await request(`/contents/${CONTENT_PATH}`, {
    method: "PUT",
    body: JSON.stringify({
      message: "content: update from admin",
      branch: BRANCH,
      sha, // GitHub answers 409 if the file changed since we read it, so nothing gets overwritten.
      content: toBase64(new TextEncoder().encode(`${JSON.stringify(content, null, 2)}\n`)),
    }),
  });
  return { sha: result.content.sha, commitUrl: result.commit.html_url };
}

export function imageFileName(name, now = Date.now()) {
  const match = name.toLowerCase().match(/^(.*)\.(png|jpe?g|webp|gif|svg|avif)$/);
  if (!match) throw new Error("Chỉ nhận ảnh png, jpg, webp, gif, svg hoặc avif.");
  const slug = match[1]
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${now}-${slug || "image"}.${match[2]}`;
}

// Returns the public path to store in content.json.
export async function uploadImage(file) {
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Ảnh quá lớn, tối đa 5 MB.");
  const name = imageFileName(file.name);
  await request(`/contents/public/uploads/${name}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `content: upload ${name}`,
      branch: BRANCH,
      content: toBase64(new Uint8Array(await file.arrayBuffer())),
    }),
  });
  return `/uploads/${name}`;
}
