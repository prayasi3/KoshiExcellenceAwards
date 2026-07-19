import { Play } from "lucide-react";

export default function VideoCard({ item, onSelect }) {
  return <button type="button" onClick={() => onSelect(item)} className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-[#0B1F3A] text-left shadow-sm focus:outline-none focus:ring-4 focus:ring-[#C9A84C]/40"><video src={item.media_url} muted preload="metadata" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-0 bg-[#0B1F3A]/35" /><span className="absolute left-1/2 top-1/2 flex h-15 w-15 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#C9A84C] text-[#0B1F3A] shadow-lg"><Play size={25} fill="currentColor" /></span><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1F3A]/85 to-transparent px-5 pb-4 pt-10 text-sm font-medium text-white">{item.caption || "Watch highlight"}</span></button>;
}
