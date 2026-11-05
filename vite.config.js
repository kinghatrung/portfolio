import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import content from "./src/data/content.json" with { type: "json" };

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

// Crawlers don't run JS, so SEO tags are written into index.html at build time.
const siteMeta = {
  name: "site-meta",
  transformIndexHtml: {
    order: "pre",
    handler: (html) => html.replace(/%site\.(\w+)%/g, (_, key) => escapeHtml(content.site[key])),
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta],
});
