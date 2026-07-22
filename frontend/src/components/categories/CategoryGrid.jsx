// src/components/categories/CategoryGrid.jsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import FilterBanner from "../common/FilterBanner";
import { API_BASE_URL, fetchItems, fetchJson } from "../../lib/api";
import { useEditions } from "../../context/useEditions";

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const editionId = searchParams.get("edition");
  const { editions } = useEditions();

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        const allCategories = await fetchItems("/categories?limit=100");

        if (editionId) {
          // Only show categories that were actually assigned to this edition.
          const { data } = await fetchJson(`${API_BASE_URL}/editions/${editionId}/categories`);
          const allowedIds = new Set((data?.categories || []).map(Number));
          if (isMounted) {
            setCategories(allCategories.filter((category) => allowedIds.has(Number(category.id))));
          }
        } else if (isMounted) {
          setCategories(allCategories);
        }

        if (isMounted) setError("");
      } catch {
        if (isMounted) setError("Failed to load categories.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timeoutId = window.setTimeout(load, 0);
    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
    };
  }, [editionId]);

  const activeEdition = editions.find((edition) => String(edition.id) === String(editionId));

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div>
      {editionId && (
        <FilterBanner
          label={`Showing categories from the ${activeEdition ? (activeEdition.title || `${activeEdition.year} Edition`) : "selected"} edition`}
          clearTo="/categories"
        />
      )}

      {categories.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          No categories available.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
