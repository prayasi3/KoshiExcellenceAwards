const filters = [
  { value: "all", label: "All moments" },
  { value: "image", label: "Photos" },
  { value: "video", label: "Videos" },
];

export default function GalleryFilter({ activeFilter, onChange }) {
  return <div className="mb-10 flex flex-wrap justify-center gap-3" role="group" aria-label="Filter gallery">{filters.map((filter) => <button type="button" key={filter.value} onClick={() => onChange(filter.value)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeFilter === filter.value ? "bg-[#0B1F3A] text-white shadow-md" : "border border-slate-200 bg-white text-slate-600 hover:border-[#C9A84C] hover:text-[#0B1F3A]"}`}>{filter.label}</button>)}</div>;
}
