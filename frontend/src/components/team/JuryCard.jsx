// src/components/team/JuryCard.jsx

import { User } from "lucide-react";

const roleLabels = {
  chief_advisor: "Chief Adviser",
  chief_judge: "Chief Judge",
};

export default function JuryCard({ member }) {
  return (
    <article className="flex w-full max-w-xs flex-col items-center rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[#F5ECD0] bg-slate-100">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.full_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <User className="h-10 w-10 text-slate-300" />
          </div>
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold text-[#0B1F3A]">{member.full_name}</h3>

      <span className="mt-3 inline-block rounded-full bg-[#F5ECD0] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#9A7A25]">
        {roleLabels[member.role] || member.designation || member.role}
      </span>
    </article>
  );
}