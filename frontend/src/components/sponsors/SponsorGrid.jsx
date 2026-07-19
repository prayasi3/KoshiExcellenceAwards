import { useCallback, useEffect, useState } from "react";
import SponsorCard from "./SponsorCard";

const API_URL = "http://localhost:5000/api/sponsors?limit=100";
const levels = ["title", "platinum", "gold", "silver", "partner"];
const labels = { title: "Title Sponsor", platinum: "Platinum Sponsors", gold: "Gold Sponsors", silver: "Silver Sponsors", partner: "Partners" };
const items = (payload) => Array.isArray(payload) ? payload : payload?.data?.items || payload?.data || [];

export default function SponsorGrid() {
  const [sponsors, setSponsors] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(async () => { try { const response = await fetch(API_URL); if (!response.ok) throw new Error(); setSponsors(items(await response.json()).sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))); setError(""); } catch { setError("We couldn't load our sponsors. Please try again."); } finally { setLoading(false); } }, []);
  useEffect(() => { const timer = window.setTimeout(load, 0); return () => window.clearTimeout(timer); }, [load]);
  if (loading) return <div className="flex min-h-60 items-center justify-center gap-4 text-slate-600"><span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C9A84C]" />Loading sponsors...</div>;
  if (error) return <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center text-slate-700"><p>{error}</p><button type="button" onClick={() => { setLoading(true); load(); }} className="mt-5 rounded-full bg-[#0B1F3A] px-6 py-2.5 font-semibold text-white">Try again</button></div>;
  if (!sponsors.length) return <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center"><h3 className="text-xl font-semibold text-[#0B1F3A]">Sponsors will be announced soon</h3><p className="mt-2 text-slate-600">Partnership opportunities are currently available for the Koshi Excellence Awards.</p></div>;
  return <div className="space-y-14">{levels.map((level) => { const group = sponsors.filter((sponsor) => sponsor.sponsor_level === level); return group.length ? <section key={level}><h2 className="mb-6 text-center font-heading text-2xl font-bold text-[#0B1F3A]">{labels[level]}</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{group.map((sponsor) => <SponsorCard key={sponsor.id} sponsor={sponsor} />)}</div></section> : null; })}</div>;
}
