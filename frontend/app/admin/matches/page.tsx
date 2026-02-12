"use client";

import { useState } from "react";
import AdminLayoutUI from "@/components/layout/AdminLayout";
import { apiFetch } from "@/services/api";

export default function AdminMatchesPage() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleCreate = async () => {
    try {
      await apiFetch("/matches/create", {
        method: "POST",
        body: JSON.stringify({
          homeTeam,
          awayTeam,
          startTime,
        }),
      });

      alert("Match created");
      setHomeTeam("");
      setAwayTeam("");
      setStartTime("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <AdminLayoutUI>
      <h1 className="text-xl font-bold mb-4">Create Match</h1>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          placeholder="Home Team"
          className="border p-2"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />

        <input
          placeholder="Away Team"
          className="border p-2"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />

        <input
          type="datetime-local"
          className="border p-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={handleCreate}
        >
          Create Match
        </button>
      </div>
    </AdminLayoutUI>
  );
}
