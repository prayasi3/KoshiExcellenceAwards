import { useCallback, useEffect, useState } from "react";
import FeaturedNews from "./FeaturedNews";
import NewsCard from "./NewsCard";

const API_URL = "http://localhost:5000/api/news";
const items = (payload) => Array.isArray(payload) ? payload : payload?.data?.items || payload?.data || [];
export default function NewsList() {
  const [news, setNews] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(async () => { try { const response = await fetch(API_URL); if (!response.ok) throw new Error(); setNews(items(await response.json())); setError(""); } catch { setError("We couldn't load the latest news. Please try again."); } finally { setLoading(false); } }, []);
  useEffect(() => { const timer = window.setTimeout(load, 0); return () => window.clearTimeout(timer); }, [load]);
  if (loading) return <div className="flex min-h-60 items-center justify-center gap-4 text-slate-600"><span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C9A84C]" />Loading news...</div>;
  if (error) return <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center"><p>{error}</p><button type="button" onClick={() => { setLoading(true); load(); }} className="mt-5 rounded-full bg-[#0B1F3A] px-6 py-2.5 font-semibold text-white">Try again</button></div>;
  if (!news.length) return <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center"><h3 className="text-xl font-semibold text-[#0B1F3A]">News is on its way</h3><p className="mt-2 text-slate-600">Check back soon for announcements and stories from the awards.</p></div>;
  const [lead, ...remaining] = news;
  return <div className="space-y-10"><FeaturedNews article={lead} />{remaining.length > 0 && <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{remaining.map((article) => <NewsCard key={article.id} article={article} />)}</div>}</div>;
}
