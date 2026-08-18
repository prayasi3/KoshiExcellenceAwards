// src/lib/api.js
// Shared helpers for talking to the public REST API.

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Creates the URL-safe category identifier used by the public category pages.
 * Older category rows may not have a stored slug, so the category name is a
 * reliable fallback until those records are updated in the admin panel.
 */
export function toSlug(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategorySlug(category) {
  return toSlug(category?.slug) || toSlug(category?.category_name);
}

export function getRecipientSlug(recipient) {
  return toSlug(recipient?.slug) || toSlug(recipient?.full_name);
}

export function getHonoreeSlug(honoree) {
  return toSlug(honoree?.slug) || toSlug(honoree?.name);
}

/** Normalises the various shapes the backend returns list data in. */
export function extractItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

/** Fetches JSON and throws on a non-2xx response. */
export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${url}`);
  return response.json();
}

/** Posts JSON to an endpoint and returns the parsed response, throwing a
 *  readable error (using the API's own message when available) on failure. */
export async function postJson(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "Something went wrong. Please try again.");
  }

  return payload;
}

/** Fetches a list endpoint and returns a plain array of items. */
export async function fetchItems(path) {
  const payload = await fetchJson(`${API_BASE_URL}${path}`);
  return extractItems(payload);
}

/** Builds a query string from an object, skipping empty values. */
export function toQueryString(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, value);
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}
