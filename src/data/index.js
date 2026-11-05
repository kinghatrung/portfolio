import content from "./content.json";

export default content;

// Menu follows the section order; sections without a navLabel (hero) stay out of it.
export const navLinks = content.sectionOrder
  .filter((id) => content[id].navLabel)
  .map((id) => ({ id, title: content[id].navLabel }));
