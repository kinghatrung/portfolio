// Headings mark highlighted words as [[blue]] or {{violet}}.
export function parseRichText(text = "") {
  return text
    .split(/(\[\[.+?\]\]|\{\{.+?\}\})/)
    .filter(Boolean)
    .map((part) => {
      if (/^\[\[.+\]\]$/.test(part)) return { text: part.slice(2, -2), tone: "blue" };
      if (/^\{\{.+\}\}$/.test(part)) return { text: part.slice(2, -2), tone: "violet" };
      return { text: part };
    });
}
