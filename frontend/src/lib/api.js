// src/lib/api.js
// Shared helpers for talking to the public REST API.

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
