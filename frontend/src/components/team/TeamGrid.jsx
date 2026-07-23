import { useEffect, useState } from "react";
import JuryCard from "./JuryCard";
import LeadershipCard from "./LeadershipCard";
import TeamCard from "./TeamCard";
import { API_BASE_URL, extractItems } from "../../lib/api";

// Colors cycle across the Executive Leadership cards' top border/role label,
// echoing the reference design's varied accent per card.
const LEADERSHIP_ACCENTS = ["#C9A84C", "#0B1F3A", "#B33A3A"];

export default function TeamGrid() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchTeamMembers() {
      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/teams`);
        const result = await response.json();
        const data = extractItems(result);

        const activeMembers = data.filter(
          (member) => member.is_active === 1 || member.is_active === true
        );

        activeMembers.sort((a, b) => {
          if (a.role_priority !== b.role_priority) {
            return a.role_priority - b.role_priority;
          }
          return a.display_order - b.display_order;
        });

        if (isMounted) {
          setMembers(activeMembers);
          setError("");
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Unable to load team members.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timeoutId = window.setTimeout(fetchTeamMembers, 0);
    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500">
        Loading team members...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 py-20 text-center">
        <h3 className="text-2xl font-bold text-[#0B1F3A]">
          No Team Members Found
        </h3>
        <p className="mt-3 text-slate-500">
          Team members will appear here after they are added.
        </p>
      </div>
    );
  }

  const jury = members.filter((member) => ["chief_judge", "chief_advisor"].includes(member.role));
  const leadership = members.filter((member) =>
    ["chairman", "executive_director", "chief_director"].includes(member.role)
  );
  const others = members.filter(
    (member) => !jury.includes(member) && !leadership.includes(member)
  );

  return (
    <div className="space-y-20">
      {/* ── Jury & Chief Advisory ── */}
      {jury.length > 0 && (
        <section>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              The Verdict Makers
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-[#0B1F3A]">
              Jury &amp; Chief Advisory
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap items-stretch justify-center gap-8">
            {jury.map((member) => (
              <JuryCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}

      {/* ── Executive Leadership ── */}
      {leadership.length > 0 && (
        <section className="rounded-3xl bg-[#F7F8FA] px-6 py-14 sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              The Visionaries
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-[#0B1F3A]">
              Executive Leadership
            </h2>
          </div>

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member, index) => (
              <LeadershipCard
                key={member.id}
                member={member}
                accentColor={LEADERSHIP_ACCENTS[index % LEADERSHIP_ACCENTS.length]}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Remaining committee members, if any ── */}
      {others.length > 0 && (
        <section>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              The Team
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-[#0B1F3A]">
              Committee Members
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {others.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}