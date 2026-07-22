import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FeaturedNews from "./FeaturedNews";
import NewsCard from "./NewsCard";
import FilterBanner from "../common/FilterBanner";
import { API_BASE_URL, extractItems } from "../../lib/api";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  // News isn't tied to an edition in the data model, so we filter by the
  // publication year instead (still lets the navbar's "by edition" links work).
  const year = searchParams.get("year");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/news`);
      if (!response.ok) throw new Error();
      setNews(extractItems(await response.json()));
      setError("");
    } catch {
      setError("We couldn't load the latest news. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(load, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const visibleNews = useMemo(() => {
    if (!year) return news;
    return news.filter((article) => {
      if (!article.published_at) return false;
      return new Date(article.published_at).getFullYear() === Number(year);
    });
  }, [news, year]);

  if (loading) return <div className="flex min-h-60 items-center justify-center gap-4 text-slate-600"><span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C9A84C]" />Loading news...</div>;
  if (error) return <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center"><p>{error}</p><button type="button" onClick={() => { setLoading(true); load(); }} className="mt-5 rounded-full bg-[#0B1F3A] px-6 py-2.5 font-semibold text-white">Try again</button></div>;

  return (
    <div>
      {year && (
        <FilterBanner
          label={`Showing news published in ${year}`}
          clearTo="/news"
        />
      )}

      {!visibleNews.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <h3 className="text-xl font-semibold text-[#0B1F3A]">
            {year ? `No news found for ${year}` : "News is on its way"}
          </h3>
          <p className="mt-2 text-slate-600">Check back soon for announcements and stories from the awards.</p>
        </div>
      ) : (
        (() => {
          const [lead, ...remaining] = visibleNews;
          return (
            <div className="space-y-10">
              <FeaturedNews article={lead} />
              {remaining.length > 0 && (
                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                  {remaining.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          );
        })()
      )}
    </div>
  );
}
