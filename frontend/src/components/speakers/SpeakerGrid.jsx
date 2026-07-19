import { useEffect, useState } from "react";
import SpeakerCard from "./SpeakerCard";

export default function SpeakerGrid() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSpeakers();
  }, []);

  async function fetchSpeakers() {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/speakers");

      const result = await response.json();

      const data = result.data?.items || [];

      const activeSpeakers = data.filter(
        (speaker) =>
          speaker.is_active === 1 ||
          speaker.is_active === true ||
          speaker.is_active === undefined
      );

      activeSpeakers.sort((a, b) => {
        return (a.display_order || 0) - (b.display_order || 0);
      });

      setSpeakers(activeSpeakers);
    } catch (err) {
      console.error(err);
      setError("Unable to load speakers.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500">
        Loading speakers...
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

  if (speakers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 py-20 text-center">
        <h3 className="text-2xl font-bold text-[#0B1F3A]">
          No Speakers Found
        </h3>

        <p className="mt-3 text-slate-500">
          Speakers will appear here after they are added.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {speakers.map((speaker) => (
        <SpeakerCard
          key={speaker.id}
          speaker={speaker}
        />
      ))}
    </div>
  );
}