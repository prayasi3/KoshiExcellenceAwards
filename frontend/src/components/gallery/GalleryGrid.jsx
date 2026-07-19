import { useCallback, useEffect, useMemo, useState } from "react";
import GalleryFilter from "./GalleryFilter";
import GalleryItem from "./GalleryItem";
import ImageModal from "./ImageModal";
import VideoCard from "./VideoCard";

const API_URL = "http://localhost:5000/api/gallery?limit=100";
const items = (payload) => Array.isArray(payload) ? payload : payload?.data?.items || payload?.data || [];
export default function GalleryGrid() {
  const [gallery, setGallery] = useState([]); const [filter, setFilter] = useState("all"); const [selected, setSelected] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(async () => { try { const response = await fetch(API_URL); if (!response.ok) throw new Error(); setGallery(items(await response.json())); setError(""); } catch { setError("We couldn't load the gallery. Please try again."); } finally { setLoading(false); } }, []);
  useEffect(() => { const timer = window.setTimeout(load, 0); return () => window.clearTimeout(timer); }, [load]);
  const visible = useMemo(() => filter === "all" ? gallery : gallery.filter((item) => item.media_type === filter), [filter, gallery]);
  if (loading) return <div className="flex min-h-60 items-center justify-center gap-4 text-slate-600"><span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C9A84C]" />Loading gallery...</div>;
  if (error) return <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center"><p>{error}</p><button type="button" onClick={() => { setLoading(true); load(); }} className="mt-5 rounded-full bg-[#0B1F3A] px-6 py-2.5 font-semibold text-white">Try again</button></div>;
  if (!gallery.length) return <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center"><h3 className="text-xl font-semibold text-[#0B1F3A]">The gallery is being prepared</h3><p className="mt-2 text-slate-600">Please return soon to explore moments from the awards.</p></div>;
  return <><GalleryFilter activeFilter={filter} onChange={setFilter} /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map((item) => item.media_type === "video" ? <VideoCard key={item.id} item={item} onSelect={setSelected} /> : <GalleryItem key={item.id} item={item} onSelect={setSelected} />)}</div>{!visible.length && <p className="py-12 text-center text-slate-500">No {filter}s are available yet.</p>}<ImageModal item={selected} onClose={() => setSelected(null)} /></>;
}
