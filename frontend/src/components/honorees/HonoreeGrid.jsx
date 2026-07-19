import { useCallback, useEffect, useState } from "react";

import HonoreeCard from "./HonoreeCard";

const API_URL = "http://localhost:5000/api/honorees?limit=100";

function extractItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

export default function HonoreeGrid() {
  const [honorees, setHonorees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHonorees = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Request failed");
      setHonorees(extractItems(await response.json()));
      setError("");
    } catch {
      setError("We couldn't load the honorees. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadHonorees, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadHonorees]);

  const retry = () => {
    setLoading(true);
    setError("");
    loadHonorees();
  };

  if (loading) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-4 text-slate-600" role="status">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C9A84C]" />
        <span className="font-medium">Loading honorees...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
        <p className="text-slate-700">{error}</p>
        <button
          type="button"
          onClick={retry}
          className="mt-5 rounded-full bg-[#0B1F3A] px-6 py-2.5 font-semibold text-white transition hover:bg-[#162D50]"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!honorees.length) {
    return <p className="py-20 text-center text-slate-500">No honorees available.</p>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {honorees.map((honoree) => (
        <HonoreeCard key={honoree.id} honoree={honoree} />
      ))}
    </div>
  );
}
