/**
 * Strips HTML tags from rich-text editor output for use in table previews,
 * card summaries, etc. — anywhere the raw markup shouldn't be shown as text.
 * Also truncates to `maxLength` characters (default 120) with an ellipsis.
 */
export function stripHtml(html, maxLength = 120) {
  if (!html) return "";

  const text = html
    .replace(/<\/(p|div|li|h[1-6])>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!maxLength || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}