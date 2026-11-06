// Builds /llms.txt (https://llmstxt.org) from content.json at build time, so it follows admin edits.
const isLink = (s) => /^(https?:|mailto:)/.test(s || "");
const plain = (s = "") => s.replace(/\[\[|\]\]|\{\{|\}\}/g, "").replace(/\s+/g, " ").trim();

export function llmsTxt({ site, about, projects, contact }) {
  const item = (label, href, note) => {
    const text = isLink(href) ? `[${plain(label)}](${href})` : plain(label);
    return `- ${text}${note ? `: ${plain(note)}` : ""}`;
  };
  const projectItems = projects.items.map((p) => item(p.title, isLink(p.demo) ? p.demo : p.github, p.description));
  const contactItems = [
    ...(contact.email ? [item("Email", `mailto:${contact.email}`)] : []),
    ...contact.socials.filter((s) => isLink(s.href) && !s.href.startsWith("mailto:")).map((s) => item(s.label, s.href)),
  ];

  return [
    `# ${plain(site.title)}`,
    "",
    `> ${plain(site.description)}`,
    "",
    ...about.paragraphs.flatMap((p) => [plain(p), ""]),
    "## Projects",
    "",
    ...projectItems,
    "",
    "## Contact",
    "",
    ...contactItems,
    "",
  ].join("\n");
}
