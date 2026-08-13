import { useEffect, useState } from "react";
import axios from "axios";

const EMPTY_STATS = {
  editions: 0,
  categories: 0,
  recipients: 0,
  honorees: 0,
  speakers: 0,
  sponsors: 0,
  team: 0,
  gallery: 0,
};

export default function Dashboard() {
  const [stats, setStats] = useState(EMPTY_STATS);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.get(
        `${API_BASE}/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // The API success envelope is { success, message, data: { stats } }.
      // Keep the expected object shape even if a malformed response is returned.
      setStats({ ...EMPTY_STATS, ...(res.data?.data?.stats || {}) });
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    { title: "Editions", value: stats.editions },
    { title: "Categories", value: stats.categories },
    { title: "Recipients", value: stats.recipients },
    { title: "Honorees", value: stats.honorees },
    { title: "Speakers", value: stats.speakers },
    { title: "Sponsors", value: stats.sponsors },
    { title: "Team Members", value: stats.team },
    { title: "Gallery Items", value: stats.gallery },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-6"
          >
            <p className="text-gray-500">
              {card.title}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
