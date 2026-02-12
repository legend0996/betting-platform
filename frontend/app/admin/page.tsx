"use client";

import { useEffect, useState } from "react";
import AdminLayoutUI from "@/components/layout/AdminLayout";
import { apiFetch } from "@/services/api";

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await apiFetch("/matches");
      setMatches(data.matches || []);
    };

    fetchMatches();
  }, []);

  const updateOdds = async (matchId: number, odds: any) => {
    try {
      await apiFetch("/admin/matches/update-odds", {
        method: "POST",
        body: JSON.stringify({
          matchId,
          odds,
        }),
      });

      alert("Odds updated");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <AdminLayoutUI>
      <h1 className="text-xl font-bold mb-4">Manage Matches</h1>

      {matches.map((match) => (
        <div key={match.id} className="border p-4 bg-white mb-4 rounded shadow">
          <div className="font-medium mb-2">
            {match.homeTeam} vs {match.awayTeam}
          </div>

          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() =>
              updateOdds(match.id, {
                home: 1.9,
                draw: 3.4,
                away: 4.2,
              })
            }
          >
            Update Odds
          </button>
        </div>
      ))}
    </AdminLayoutUI>
  );
}
