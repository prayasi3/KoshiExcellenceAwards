import { Link } from "react-router-dom";

export default function SpeakerCard({ speaker }) {
  return (
    <Link
      to={`/speakers/${speaker.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={
            speaker.image_url ||
            "https://placehold.co/500x600?text=Speaker"
          }
          alt={speaker.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-[#0B1F3A]">
          {speaker.name}
        </h3>

        <p className="mt-1 text-sm font-medium text-[#C9A84C]">
          {speaker.designation}
        </p>

        {speaker.organization && (
          <p className="mt-1 text-sm text-gray-600">
            {speaker.organization}
          </p>
        )}
      </div>
    </Link>
  );
}