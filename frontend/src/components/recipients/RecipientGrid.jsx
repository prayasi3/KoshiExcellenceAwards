import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RecipientCard from "./RecipientCard";
import FilterBanner from "../common/FilterBanner";
import { API_BASE_URL, extractItems, fetchJson } from "../../lib/api";

/**
 * Shows recipients. Pass `categorySlug` to show every recipient ever
 * honoured in that category, across all editions (used from the
 * Categories page and homepage category cards). The `edition` query
 * param (added by the navbar's year dropdown) narrows results to a
 * single edition's recipients instead.
 */
export default function RecipientGrid({ categorySlug }) {
  const [recipients, setRecipients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const editionYear = searchParams.get("edition");

  const fetchRecipients = useCallback(async () => {
    setLoading(true);

    const recipientsUrl = editionYear
      ? `${API_BASE_URL}/recipients?limit=100&edition=${editionYear}`
      : `${API_BASE_URL}/recipients?limit=100`;

    const [recipientResult, categoryResult] = await Promise.allSettled([
      fetchJson(recipientsUrl),
      fetchJson(`${API_BASE_URL}/categories?limit=100`),
    ]);

    if (recipientResult.status === "rejected") {
      setError("We couldn't load the recipients. Please try again.");
      setLoading(false);
      return;
    }

    setRecipients(extractItems(recipientResult.value));

    if (categoryResult.status === "fulfilled") {
      setCategories(extractItems(categoryResult.value));
    }

    setError("");
    setLoading(false);
  }, [editionYear]);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchRecipients, 0);
    return () => window.clearTimeout(timeoutId);
  }, [fetchRecipients]);

  const retry = () => {
    setError("");
    fetchRecipients();
  };

  const categoryMap = new Map(
    categories.map((category) => [Number(category.id), category.category_name])
  );

  console.log("URL slug:", categorySlug);
  console.log("Categories:", categories);
  console.log(
  "Matched category:",
  categories.find((category) => category.slug === categorySlug)
);

  const activeCategory = categorySlug
  ? categories.find((category) => category.slug === categorySlug)
  : null;

const visibleRecipients = (
  activeCategory
    ? recipients.filter((recipient) => Number(recipient.category_id) === Number(activeCategory.id))
    : recipients
)
  .slice()
  .sort((a, b) => {
    const categoryA = categoryMap.get(Number(a.category_id)) || "";
    const categoryB = categoryMap.get(Number(b.category_id)) || "";
    const categoryComparison = categoryA.localeCompare(categoryB);
    if (categoryComparison !== 0) return categoryComparison;

    const nameA = a.full_name || "";
    const nameB = b.full_name || "";
    return nameA.localeCompare(nameB);
  });

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

  return (
    <div>
      {editionYear && (
        <FilterBanner
          label={`Showing recipients from the ${editionYear} edition`}
          clearTo={categorySlug ? undefined : "/recipients"}
        />
      )}

      {!visibleRecipients.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <h3 className="text-xl font-semibold text-[#0B1F3A]">
            Recipients will be announced soon
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Please check back for the inspiring individuals being recognised by
            the Koshi Excellence Awards.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRecipients.map((recipient) => (
            <RecipientCard
              key={recipient.id}
              recipient={recipient}
              categoryName={categoryMap.get(Number(recipient.category_id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
