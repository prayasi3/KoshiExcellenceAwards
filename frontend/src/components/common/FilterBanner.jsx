import { Link } from "react-router-dom";
import { Filter, X } from "lucide-react";

/**
 * Small pill banner shown above a grid/list when the visitor arrived via
 * a filtered link (e.g. a specific edition from the navbar dropdown, or a
 * category from the homepage/categories page).
 */
export default function FilterBanner({ label, clearTo }) {
  if (!label) return null;

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-3 rounded-full border border-[#C9A84C]/40 bg-[#F5ECD0]/60 px-5 py-3 text-sm">
      <span className="flex items-center gap-2 font-semibold text-[#0B1F3A]">
        <Filter size={15} aria-hidden="true" />
        {label}
      </span>
      {clearTo && (
        <Link
          to={clearTo}
          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium text-[#A37D23] shadow-sm transition hover:bg-[#0B1F3A] hover:text-white"
        >
          <X size={13} aria-hidden="true" />
          Clear filter
        </Link>
      )}
    </div>
  );
}
