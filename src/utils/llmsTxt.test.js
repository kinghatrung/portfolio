import { test } from "node:test";
import assert from "node:assert/strict";
import content from "../data/content.json" with { type: "json" };
import { llmsTxt } from "./llmsTxt.js";

test("llms.txt has one H1, links, and no rich-text markers", () => {
  const txt = llmsTxt({
    site: { title: "Hi [[Huyen]]", description: "Line one\nline two" },
    about: { paragraphs: ["I build {{3D}} sites."] },
    projects: {
      items: [
        { title: "Live", description: "d1", demo: "https://demo.example", github: "https://github.com/x" },
        { title: "Code only", description: "d2", demo: "#", github: "https://github.com/y" },
        { title: "No link", description: "", demo: "#", github: "" },
      ],
    },
    contact: {
      email: "a@b.c",
      socials: [
        { label: "GitHub", href: "https://github.com/x" },
        { label: "Email", href: "mailto:a@b.c" },
        { label: "Broken", href: "github.com" },
      ],
    },
  });
  assert.equal(txt.match(/^# /gm).length, 1);
  assert.ok(txt.startsWith("# Hi Huyen\n\n> Line one line two\n"));
  assert.ok(txt.includes("I build 3D sites."));
  assert.ok(txt.includes("- [Live](https://demo.example): d1"));
  assert.ok(txt.includes("- [Code only](https://github.com/y): d2"));
  assert.ok(txt.includes("- No link\n"));
  assert.ok(txt.includes("- [Email](mailto:a@b.c)"));
  assert.equal(txt.match(/mailto:/g).length, 1, "email listed once");
  assert.ok(!txt.includes("Broken"));
});

test("llms.txt builds from the real content", () => {
  const txt = llmsTxt(content);
  assert.match(txt, /^# .+\n/);
  assert.match(txt, /\]\(https:\/\//);
});
