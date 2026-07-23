import TeamCard from "./TeamCard";

const roleTitles = {
  chief_advisor: "Chief Advisor",
  chief_judge: "Chief Judge",
  chairman: "Chairman",
  chief_director: "Chief Director",
  executive_director: "Executive Director",
  director: "Directors",
  member: "Members",
};

const roleDescriptions = {
  chief_advisor:
    "Providing strategic guidance and overall vision for the Koshi Excellence Award.",

  chief_judge:
    "Leading the evaluation process and ensuring fairness throughout the selection process.",

  chairman:
    "Overseeing the successful planning and execution of the Koshi Excellence Award.",

  chief_director:
    "Supporting the executive committee in planning, organization, and implementation.",

  executive_director:
    "Managing the day-to-day operations and coordination of the award program.",

  director:
    "Supporting the executive committee in planning, organization, and implementation.",

  member:
    "Dedicated committee members contributing to the success of the Koshi Excellence Award.",
};

export default function TeamRoleSection({ role, members }) {
  if (!members || members.length === 0) return null;

  return (
    <section className="space-y-10">
      {/* Section Heading */}

      <div className="text-center">
        <span className="inline-block rounded-full bg-[#C9A84C]/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">
          Leadership
        </span>

        <h2 className="mt-4 text-4xl font-bold text-[#0B1F3A]">
          {roleTitles[role]}
        </h2>

        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#C9A84C]" />

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {roleDescriptions[role]}
        </p>
      </div>

      {/* Cards */}

      <div
        className={`grid gap-8 ${
          members.length === 1
            ? "max-w-md mx-auto"
            : members.length === 2
            ? "md:grid-cols-2 max-w-4xl mx-auto"
            : "md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {members.map((member) => (
          <TeamCard
            key={member.id}
            member={member}
          />
        ))}
      </div>
    </section>
  );
}