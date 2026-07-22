// src/components/categories/CategoryGrid.jsx

import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { fetchItems } from "../../lib/api";

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const items = await fetchItems("/categories?limit=100");
        if (isMounted) {
          setCategories(items);
          setError("");
        }
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
  }, []);

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