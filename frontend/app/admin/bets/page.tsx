"use client";

import { useEffect, useState } from "react";
import AdminLayoutUI from "@/components/layout/AdminLayout";
import { apiFetch } from "@/services/api";

export default function AdminBetsPage() {
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const data = await apiFetch("/admin/bets");
        setBets(data.bets || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  return (
    <AdminLayoutUI>
      <h1 className="text-xl font-bold mb-4">All Bets</h1>

      {loading && <p>Loading...</p>}

      <div className="space-y-4">
        {bets.map((bet) => (
          <div key={bet.id} className="border p-4 bg-white shadow rounded">
            <div className="flex justify-between">
              <span>User: {bet.user?.email}</span>
              <span>Status: {bet.status}</span>
            </div>

            <div className="mt-2 text-sm">Stake: {bet.stake}</div>

            <div className="text-sm">Total Odds: {bet.totalOdds}</div>

            <div className="text-sm font-bold">
              Potential Win: {bet.potentialWin}
            </div>
          </div>
        ))}
      </div>
    </AdminLayoutUI>
  );
}
