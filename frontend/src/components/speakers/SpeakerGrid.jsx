import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpeakerCard from "./SpeakerCard";
import FilterBanner from "../common/FilterBanner";
import { API_BASE_URL, extractItems } from "../../lib/api";

export default function SpeakerGrid() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const editionYear = searchParams.get("edition");

  const fetchSpeakers = useCallback(async () => {
    try {
      setLoading(true);

      const url = editionYear
        ? `${API_BASE_URL}/speakers?limit=100&edition=${editionYear}`
        : `${API_BASE_URL}/speakers?limit=100`;

      const response = await fetch(url);
      const result = await response.json();
      const data = extractItems(result);

      const activeSpeakers = data.filter(
        (speaker) =>
          speaker.is_active === 1 ||
          speaker.is_active === true ||
          speaker.is_active === undefined
      );

      activeSpeakers.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

      setSpeakers(activeSpeakers);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load speakers.");
    } finally {
      setLoading(false);
    }
  }, [editionYear]);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchSpeakers, 0);
    return () => window.clearTimeout(timeoutId);
  }, [fetchSpeakers]);

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

  return (
    <div>
      {editionYear && (
        <FilterBanner
          label={`Showing speakers from the ${editionYear} edition`}
          clearTo="/speakers"
        />
      )}

      {speakers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-20 text-center">
          <h3 className="text-2xl font-bold text-[#0B1F3A]">
            No Speakers Found
          </h3>
          <p className="mt-3 text-slate-500">
            Speakers will appear here after they are added.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      )}
    </div>
  );
}
