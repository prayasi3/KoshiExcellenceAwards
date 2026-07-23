// src/components/team/LeadershipCard.jsx

import { User } from "lucide-react";

const roleLabels = {
  chairman: "Chairman",
  executive_director: "Executive Manager",
  chief_director: "Chief Director",
};

export default function LeadershipCard({ member, accentColor }) {
  return (
    <article
      className="flex flex-col items-center rounded-2xl border border-t-4 border-slate-200 bg-white px-7 py-9 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ borderTopColor: accentColor }}
    >
      <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-100">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.full_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <User className="h-9 w-9 text-slate-300" />
          </div>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold text-[#0B1F3A]">{member.full_name}</h3>

      <span
        className="mt-1 text-xs font-bold uppercase tracking-wider"
        style={{ color: accentColor }}
      >
        {roleLabels[member.role] || member.designation || member.role}
      </span>

      {member.bio && (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {member.bio}
        </p>
      )}
    </article>
  );
}