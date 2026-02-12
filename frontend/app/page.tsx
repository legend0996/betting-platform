"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import MatchRow from "@/components/betting/MatchRow";
import { apiFetch } from "@/services/api";

export default function HomePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await apiFetch("/matches");
        setMatches(data.matches || []);
      } catch (error) {
        console.error("Error fetching matches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <MainLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Today’s Matches</h2>

        {loading && <p>Loading matches...</p>}

        {!loading && matches.length === 0 && <p>No matches available</p>}

        {matches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
    </MainLayout>
  );
}
