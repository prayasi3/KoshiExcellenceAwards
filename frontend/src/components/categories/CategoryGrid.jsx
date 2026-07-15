// src/components/categories/CategoryGrid.jsx

import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to load categories.");
        }

        const result = await response.json();

        // Adjust this depending on your backend response
        setCategories(result.data?.items || result.data || result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
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

  if (categories.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500">
        No categories available.
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}