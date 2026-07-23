// src/components/teams/TeamCard.jsx

import { User } from "lucide-react";

const roleLabels = {
  chief_advisor: "Chief Advisor",
  chief_judge: "Chief Judge",
  chairman: "Chairman",
  chief_director: "Chief Director",
  executive_director: "Executive Director",
  director: "Director",
  member: "Member",
};

export default function TeamCard({ member }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Photo */}

      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.full_name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-100">
            <User className="h-20 w-20 text-slate-300" />
          </div>
        )}
      </div>

      {/* Content */}

      <div className="p-6">
        {/* Role Badge */}

        <span className="inline-block rounded-full bg-[#C9A84C]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
          {roleLabels[member.role] || member.role}
        </span>

        {/* Name */}

        <h3 className="mt-4 text-2xl font-bold text-[#0B1F3A]">
          {member.full_name}
        </h3>

        {/* Designation */}

        {member.designation && (
          <p className="mt-2 font-medium text-slate-600">
            {member.designation}
          </p>
        )}

        {/* Bio */}

        {member.bio && (
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-500">
            {member.bio}
          </p>
        )}
      </div>
    </article>
  );
}