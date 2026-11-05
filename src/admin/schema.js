// Describes every editable field. To make something new editable: add it to content.json,
// add one line here, and read it in the section component.
const HIGHLIGHT_TONE_HINT = "Bọc chữ trong [[...]] để tô xanh, {{...}} để tô tím.";
const HIDE_HINT = "Để trống để ẩn.";

// Keep in sync with `icons` in components/About.jsx and data/socialIcons.js
const HIGHLIGHT_ICONS = [
  "Code2",
  "Layers",
  "Zap",
  "Sparkles",
  "Rocket",
  "Heart",
  "Star",
  "Globe",
  "Cpu",
  "Palette",
  "Shield",
  "Terminal",
  "Smartphone",
];
const SOCIAL_ICONS = ["github", "facebook", "mail", "phone", "globe", "link"];

const field = (type) => (key, label, extra) => ({ key, label, type, ...extra });
const text = field("text");
const textarea = field("textarea");
const image = field("image");
const color = field("color");
const select = field("select");
const tags = field("tags");
const lines = field("lines");
const list = field("list");

const heading = () => text("heading", "Tiêu đề", { hint: HIGHLIGHT_TONE_HINT });
const sectionBasics = [text("navLabel", "Tên trên menu"), text("label", "Nhãn nhỏ phía trên"), heading()];

export const sections = [
  {
    id: "header",
    title: "Header",
    fields: [
      text("logoText", "Tên logo"),
      text("logoSuffix", "Ký tự sau logo", { hint: "Dấu chấm màu xanh sau tên logo." }),
      text("ctaLabel", "Chữ trên nút"),
      text("ctaHref", "Liên kết của nút"),
    ],
  },
  {
    id: "hero",
    title: "About",
    orderable: true,
    fields: [
      text("badge", "Dòng trạng thái trên cùng", { hint: HIDE_HINT }),
      heading(),
      text("headingSuffix", "Ký tự sau tiêu đề"),
      text("role", "Vị trí công việc"),
      textarea("description", "Mô tả"),
      text("primaryCtaLabel", "Nút chính: chữ"),
      text("primaryCtaHref", "Nút chính: liên kết", { hint: "Dùng #projects để cuộn tới một section." }),
      text("secondaryCtaLabel", "Nút phụ: chữ"),
      text("secondaryCtaHref", "Nút phụ: liên kết"),
      text("status", "Open to Work", { hint: HIDE_HINT }),
      text("location", "Địa điểm", { hint: HIDE_HINT }),
      text("scrollLabel", "Chữ gợi ý cuộn"),
    ],
  },
  {
    id: "about",
    title: "About Me",
    orderable: true,
    fields: [
      ...sectionBasics,
      lines("paragraphs", "Giới thiệu", { hint: "Mỗi dòng là một đoạn văn." }),
      list("highlights", "Điểm nổi bật", {
        itemLabel: "text",
        fields: [select("icon", "Biểu tượng", { options: HIGHLIGHT_ICONS }), text("text", "Nội dung")],
      }),
      text("location", "Địa điểm", { hint: HIDE_HINT }),
      list("stats", "Số liệu", {
        itemLabel: "label",
        fields: [text("value", "Giá trị"), text("label", "Nhãn")],
      }),
    ],
  },
  {
    id: "experience",
    title: "Experience",
    orderable: true,
    fields: [
      ...sectionBasics,
      list("items", "Các card kinh nghiệm", {
        itemLabel: "title",
        fields: [
          text("title", "Chức danh"),
          text("company", "Công ty"),
          text("duration", "Thời gian"),
          textarea("description", "Mô tả"),
          tags("technologies", "Công nghệ", { hint: "Ngăn cách bằng dấu phẩy." }),
        ],
      }),
    ],
  },
  {
    id: "skills",
    title: "Skills",
    orderable: true,
    fields: [
      ...sectionBasics,
      text("allLabel", "Tên bộ lọc tất cả"),
      list("categories", "Các mục kỹ năng", {
        itemLabel: "name",
        fields: [
          text("name", "Tên mục"),
          color("color", "Màu"),
          list("skills", "Kỹ năng", {
            itemLabel: "name",
            fields: [text("name", "Tên"), image("icon", "Ảnh")],
          }),
        ],
      }),
    ],
  },
  {
    id: "projects",
    title: "Projects",
    orderable: true,
    fields: [
      ...sectionBasics,
      text("viewAllLabel", "Liên kết xem tất cả: chữ"),
      text("viewAllHref", "Liên kết xem tất cả: địa chỉ"),
      list("items", "Các project", {
        itemLabel: "title",
        fields: [
          text("title", "Tên project"),
          textarea("description", "Mô tả ngắn", { hint: "Hiện trên card, tối đa 120 ký tự đầu." }),
          image("image", "Ảnh bìa"),
          tags("technologies", "Công nghệ", { hint: "Ngăn cách bằng dấu phẩy." }),
          text("github", "Liên kết GitHub", { hint: HIDE_HINT }),
          text("demo", "Liên kết demo", { hint: HIDE_HINT }),
          color("color", "Màu nhấn"),
          textarea("details", "Mô tả chi tiết", { hint: "Hiện khi mở xem chi tiết. Để trống sẽ dùng mô tả ngắn." }),
          list("facts", "Thông tin cụ thể", {
            itemLabel: "label",
            hint: "Ví dụ: Vai trò, Thời gian, Quy mô nhóm.",
            fields: [text("label", "Nhãn"), text("value", "Giá trị")],
          }),
          lines("features", "Tính năng chính", { hint: "Mỗi dòng là một tính năng." }),
          list("gallery", "Ảnh chi tiết", {
            itemLabel: "caption",
            fields: [image("image", "Ảnh"), text("caption", "Chú thích")],
          }),
        ],
      }),
    ],
  },
  {
    id: "contact",
    title: "Get In Touch",
    orderable: true,
    fields: [
      ...sectionBasics,
      textarea("description", "Mô tả"),
      text("ctaLabel", "Chữ trên nút chính"),
      text("email", "Email"),
      list("socials", "Liên kết mạng xã hội", {
        itemLabel: "label",
        hint: "Danh sách này cũng hiện ở footer.",
        fields: [
          text("label", "Tên"),
          text("href", "Liên kết"),
          select("icon", "Biểu tượng", { options: SOCIAL_ICONS }),
        ],
      }),
    ],
  },
  {
    id: "footer",
    title: "Footer",
    fields: [
      text("tagline", "Dòng mô tả"),
      text("copyright", "Bản quyền"),
      text("sourceLabel", "Liên kết nguồn: chữ"),
      text("sourceHref", "Liên kết nguồn: địa chỉ"),
    ],
  },
  {
    id: "site",
    title: "Website",
    fields: [
      text("title", "Tiêu đề trang"),
      textarea("description", "Mô tả cho Google"),
      text("author", "Tác giả"),
      textarea("ogDescription", "Mô tả khi chia sẻ link"),
      text("loadingText", "Chữ màn hình tải"),
    ],
  },
];

const DEFAULTS = { tags: [], lines: [], list: [], color: "#4f8ef7" };

export function emptyItem(fields) {
  return Object.fromEntries(
    fields.map((f) => [f.key, f.type === "select" ? f.options[0] : (DEFAULTS[f.type] ?? "")]),
  );
}

export function move(items, index, delta) {
  const target = index + delta;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
