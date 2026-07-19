import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { useState } from "react";

function formatDate(date) { return date ? new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date)) : "Latest update"; }
function excerpt(content = "") { return content.length > 160 ? `${content.slice(0, 157).trim()}...` : content; }

export default function NewsCard({ article, featured = false }) {
  const [failed, setFailed] = useState(false);
  const image = article.featured_image && !failed;
  return <article className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${featured ? "lg:grid lg:grid-cols-2" : ""}`}><div className={`${featured ? "min-h-72 lg:min-h-full" : "aspect-[16/10]"} overflow-hidden bg-[#0B1F3A]`}>{image ? <img src={article.featured_image} alt="" onError={() => setFailed(true)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full min-h-48 items-center justify-center"><Newspaper size={42} className="text-[#C9A84C]" /></div>}</div><div className="p-6 sm:p-7"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A37D23]"><CalendarDays size={15} />{formatDate(article.published_at)}</div><h2 className={`mt-4 font-heading font-bold text-[#0B1F3A] ${featured ? "text-3xl" : "text-2xl"}`}>{article.title}</h2><p className="mt-3 leading-7 text-slate-600">{excerpt(article.content)}</p><a href={`#${article.slug || article.id}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-[#A37D23] transition group-hover:gap-3">Read story <ArrowRight size={17} /></a></div></article>;
}
