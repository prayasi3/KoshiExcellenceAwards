import { Award } from "lucide-react";

export default function RecipientDetails({ recipient, categoryName }) {
  const edition = recipient.Edition || recipient.edition;
  const editionLabel =
    edition?.title ||
    (edition?.year ? `${edition.year} Edition` : "Koshi Excellence Awards");

  return (
    <div className="p-6">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
        {editionLabel}
      </span>

      <h3 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
        {recipient.full_name}
      </h3>

      {recipient.title && (
        <p className="mt-1 font-medium text-slate-600">{recipient.title}</p>
      )}

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-[#9A7A25]">
        <Award size={17} aria-hidden="true" />
        <span>{categoryName || "Award recipient"}</span>
      </div>

      {recipient.bio && (
        <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">
          {recipient.bio}
        </p>
      )}
    </div>
  );
}
