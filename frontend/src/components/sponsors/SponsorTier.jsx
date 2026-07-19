const tierStyles = {
  title: "border-[#C9A84C] bg-[#FFF9E8] text-[#8A6919]",
  platinum: "border-slate-300 bg-slate-100 text-slate-700",
  gold: "border-[#E5C76A] bg-[#FFF9E8] text-[#8A6919]",
  silver: "border-slate-300 bg-slate-50 text-slate-600",
  partner: "border-[#BFD4C4] bg-[#F2F8F3] text-[#28603A]",
};

export default function SponsorTier({ level = "partner" }) {
  const label = level === "title" ? "Title sponsor" : `${level} sponsor`;
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${tierStyles[level] || tierStyles.partner}`}>{label}</span>;
}
