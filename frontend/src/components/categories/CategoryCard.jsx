// src/components/categories/CategoryCard.jsx

import { createElement } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getCategoryIcon } from "../../lib/categoryIcons";
import { getCategorySlug } from "../../lib/api";

export default function CategoryCard({ category, hideDescription = false }) {
  const icon = getCategoryIcon(category.category_name);
  const slug = getCategorySlug(category);

  return (
    <Link
      to={`/categories/${slug}`}
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-[#C9A84C]
        hover:shadow-xl
      "
    >
      <div
        className="
          mb-6
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#0B1F3A]
          text-[#C9A84C]
        "
      >
        {createElement(icon, { size: 28 })}
      </div>

      <h3
        className={`
          text-2xl
          font-bold
          text-[#0B1F3A]
          transition-colors
          group-hover:text-[#C9A84C]
          ${hideDescription ? "mb-2" : "mb-3"}
        `}
      >
        {category.category_name}
      </h3>

      {!hideDescription && (
        <p className="mb-6 text-gray-600 leading-7">
          {category.description}
        </p>
      )}

      <div
        className="
          inline-flex
          items-center
          gap-2
          font-semibold
          text-[#C9A84C]
        "
      >
        View Awarded

        <ArrowRight
          size={18}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-2
          "
        />
      </div>
    </Link>
  );
}
