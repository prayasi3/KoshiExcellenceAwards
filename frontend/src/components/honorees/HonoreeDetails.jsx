import { Medal } from "lucide-react";

export default function HonoreeDetails({ honoree }) {
  const edition = honoree.Edition || honoree.edition;
  const editionLabel =
    edition?.title ||
    (edition?.year ? `${edition.year} Edition` : "Koshi Excellence Award");

  return (
    <div className="p-6">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
        {editionLabel}
      </span>
      <h3 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
        {honoree.name}
      </h3>
      {honoree.subtitle && (
        <p className="mt-1 font-medium text-slate-600">{honoree.subtitle}</p>
      )}
      {honoree.recognition && (
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-[#9A7A25]">
          <Medal size={17} aria-hidden="true" />
          <span>{honoree.recognition}</span>
        </div>
      )}
      {honoree.description && (
        <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">
          {honoree.description}
        </p>
      )}
    </div>
  );
}
