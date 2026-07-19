import { Expand, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function GalleryItem({ item, onSelect }) {
  const [failed, setFailed] = useState(false);
  return <button type="button" onClick={() => onSelect(item)} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0B1F3A] text-left shadow-sm focus:outline-none focus:ring-4 focus:ring-[#C9A84C]/40">{!failed && item.media_url ? <img src={item.media_url} alt={item.caption || "Koshi Excellence Awards gallery moment"} onError={() => setFailed(true)} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /> : <div className="flex h-full items-center justify-center"><ImageIcon size={42} className="text-[#C9A84C]" /></div>}<span className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/5 to-transparent opacity-80 transition group-hover:opacity-100" /><span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white"><span className="line-clamp-2 font-medium">{item.caption || "Koshi Excellence Awards"}</span><Expand size={20} className="shrink-0 text-[#C9A84C]" /></span></button>;
}
