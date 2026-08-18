import { useState } from "react";
import { Link } from "react-router-dom";

import HonoreeDetails from "./HonoreeDetails";
import FacebookMedia from "../common/FacebookMedia";
import { getHonoreeSlug } from "../../lib/api";

function getInitials(name = "") {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "KEA";
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join("");
}

export default function HonoreeCard({ honoree, disableLink = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(honoree.image_url) && !imageFailed;

  const cardBody = (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/5] overflow-hidden bg-[#0B1F3A]">
        {showImage ? (
          <FacebookMedia
            src={honoree.image_url}
            alt={honoree.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
            placeholder={
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#0B1F3A] to-[#162D50]">
                <span className="font-heading text-5xl font-bold text-[#C9A84C]">
                  {getInitials(honoree.name)}
                </span>
              </div>
            }
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

  if (disableLink) return cardBody;

  return (
    <Link to={`/honorees/${getHonoreeSlug(honoree)}`} className="block">
      {cardBody}
    </Link>
  );
}