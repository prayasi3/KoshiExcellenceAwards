import { X } from "lucide-react";
import { useEffect } from "react";

export default function ImageModal({ item, onClose }) {
  useEffect(() => { const close = (event) => event.key === "Escape" && onClose(); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [onClose]);
  if (!item) return null;
  return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4" role="dialog" aria-modal="true" aria-label={item.caption || "Gallery preview"} onMouseDown={onClose}><div className="relative max-h-full max-w-6xl" onMouseDown={(event) => event.stopPropagation()}>{item.media_type === "video" ? <video src={item.media_url} controls autoPlay className="max-h-[80vh] max-w-full rounded-xl" /> : <img src={item.media_url} alt={item.caption || "Gallery moment"} className="max-h-[80vh] max-w-full rounded-xl object-contain" />}<button type="button" onClick={onClose} className="absolute -right-2 -top-2 rounded-full bg-white p-2 text-[#0B1F3A] shadow-lg" aria-label="Close preview"><X size={20} /></button>{item.caption && <p className="mt-3 text-center text-sm text-white">{item.caption}</p>}</div></div>;
}
