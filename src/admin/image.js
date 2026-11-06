// Screenshots from a phone or design tool are often several MB; visitors only need a ~1600px WebP.
const MAX_SIDE = 1600;

export async function toWebp(file) {
  // SVG, GIF (may be animated), WebP and AVIF are uploaded untouched.
  if (!/^image\/(png|jpeg)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = new OffscreenCanvas(Math.round(bitmap.width * scale), Math.round(bitmap.height * scale));
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await canvas.convertToBlob({ type: "image/webp", quality: 0.8 });
    // Browsers that can't encode WebP return PNG; keep the original then, or if nothing was saved.
    if (blob.type !== "image/webp" || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), { type: "image/webp" });
  } catch {
    return file; // A file the browser can't decode is still uploaded as-is.
  }
}
