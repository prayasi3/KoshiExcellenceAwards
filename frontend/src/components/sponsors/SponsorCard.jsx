import { ExternalLink } from "lucide-react";
import { useState } from "react";
import SponsorTier from "./SponsorTier";

function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "KEA";
}

export default function SponsorCard({ sponsor }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasLogo = sponsor.logo_url && !imageFailed;
  const content = <><div className="flex min-h-40 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-6">{hasLogo ? <img src={sponsor.logo_url} alt={`${sponsor.sponsor_name} logo`} onError={() => setImageFailed(true)} className="max-h-24 max-w-full object-contain" /> : <span className="font-heading text-3xl font-bold text-[#0B1F3A]">{initials(sponsor.sponsor_name)}</span>}</div><div className="mt-5 flex items-start justify-between gap-3"><div><h3 className="text-xl font-bold text-[#0B1F3A]">{sponsor.sponsor_name}</h3><div className="mt-3"><SponsorTier level={sponsor.sponsor_level} /></div></div>{sponsor.website && <ExternalLink className="mt-1 shrink-0 text-[#C9A84C]" size={19} aria-hidden="true" />}</div></>;
  const className = "group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C9A84C] hover:shadow-xl";
  return sponsor.website ? <a href={sponsor.website} target="_blank" rel="noreferrer" className={className}>{content}</a> : <article className={className}>{content}</article>;
}
