import { useCallback, useEffect, useState } from "react";

import RecipientCard from "./RecipientCard";

const API_BASE_URL = "http://localhost:5000/api";

function extractItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}

export default function RecipientGrid() {
  const [recipients, setRecipients] = useState([]);
  const [categories, setCategories] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecipients = useCallback(async () => {
    const [recipientResult, categoryResult] = await Promise.allSettled([
      fetchJson(`${API_BASE_URL}/recipients?limit=100`),
      fetchJson(`${API_BASE_URL}/categories?limit=100`),
    ]);

    if (recipientResult.status === "rejected") {
      setError("We couldn't load the recipients. Please try again.");
      setLoading(false);
      return;
    }

    setRecipients(extractItems(recipientResult.value));

    if (categoryResult.status === "fulfilled") {
      setCategories(
        new Map(
          extractItems(categoryResult.value).map((category) => [
            Number(category.id),
            category.category_name,
          ]),
        ),
      );
    }

    setError("");
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchRecipients, 0);
    return () => window.clearTimeout(timeoutId);
  }, [fetchRecipients]);

  const retry = () => {
    setLoading(true);
    setError("");
    fetchRecipients();
  };

  if (loading) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-4 text-slate-600" role="status">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C9A84C]" />
        <span className="font-medium">Loading recipients...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
        <p className="text-slate-700">{error}</p>
        <button
          type="button"
          onClick={retry}
          className="mt-5 rounded-full bg-[#0B1F3A] px-6 py-2.5 font-semibold text-white transition hover:bg-[#162D50]"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!recipients.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
        <h3 className="text-xl font-semibold text-[#0B1F3A]">
          Recipients will be announced soon
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-slate-600">
          Please check back for the inspiring individuals being recognised by
          the Koshi Excellence Awards.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {recipients.map((recipient) => (
        <RecipientCard
          key={recipient.id}
          recipient={recipient}
          categoryName={categories.get(Number(recipient.category_id))}
        />
      ))}
    </div>
  );
}
