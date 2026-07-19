import { useState } from "react";

import HonoreeDetails from "./HonoreeDetails";

function getInitials(name = "") {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "KEA";
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join("");
}

export default function HonoreeCard({ honoree }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(honoree.image_url) && !imageFailed;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/5] overflow-hidden bg-[#0B1F3A]">
        {showImage ? (
          <img
            src={honoree.image_url}
            alt={honoree.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#0B1F3A] to-[#162D50]">
            <span className="font-heading text-5xl font-bold text-[#C9A84C]">
              {getInitials(honoree.name)}
            </span>
          </div>
        )}
      </div>

      <HonoreeDetails honoree={honoree} />
    </article>
  );
}
