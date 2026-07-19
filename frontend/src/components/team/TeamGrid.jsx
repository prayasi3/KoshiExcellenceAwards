import { useEffect, useState } from "react";
import TeamCard from "./TeamCard";

export default function TeamGrid() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  async function fetchTeamMembers() {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/teams");

      const result = await response.json();

      const data = result.data?.items || [];

      const activeMembers = data.filter(
        (member) => member.is_active === 1 || member.is_active === true
      );

      activeMembers.sort((a, b) => {
        if (a.role_priority !== b.role_priority) {
          return a.role_priority - b.role_priority;
        }

        return a.display_order - b.display_order;
      });

      setMembers(activeMembers);
    } catch (err) {
      console.error(err);
      setError("Unable to load team members.");
    } finally {
      setLoading(false);
    }
  }

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

  return (
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {members.map((member) => (
      <TeamCard
        key={member.id}
        member={member}
      />
    ))}
  </div>
);
}