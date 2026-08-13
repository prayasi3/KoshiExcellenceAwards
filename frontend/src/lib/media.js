export function isFacebookPageUrl(url) {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    const normalized = hostname.toLowerCase();
    return (
      normalized === "facebook.com" ||
      normalized.endsWith(".facebook.com") ||
      normalized === "m.facebook.com" ||
      normalized === "fb.watch" ||
      normalized === "fb.me"
    );
  } catch {
    return false;
  }
}

export function isFacebookDirectImageUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    const normalized = parsed.hostname.toLowerCase();
    if (normalized.includes("fbcdn.net")) return true;
    return /\.(jpe?g|png|gif|webp|avif|svg)(\?.*)?$/i.test(parsed.pathname);
  } catch {
    return false;
  }
}

export function isFacebookEmbedUrl(url) {
  return isFacebookPageUrl(url) && !isFacebookDirectImageUrl(url);
}

export function getFacebookEmbedUrl(url, width = 500) {
  return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=false&width=${width}`;
}
