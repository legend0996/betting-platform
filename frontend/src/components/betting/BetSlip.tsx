"use client";

import { useEffect, useState } from "react";
import { betSlipStore } from "@/store/betSlip.store";
import { placeBet } from "@/services/bet.service";

export default function BetSlip() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const listener = () => forceUpdate({});
    betSlipStore.subscribe(listener);

    return () => {
      betSlipStore.unsubscribe(listener);
    };
  }, []);

  const selections = betSlipStore.selections;
  const totalOdds = betSlipStore.getTotalOdds();
  const potentialWin = betSlipStore.getPotentialWin();

  return (
    <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Bet Slip</h2>

      {selections.length === 0 && (
        <p className="text-gray-500">No selections</p>
      )}

      {selections.map((s) => (
        <div key={s.matchId} className="border-b pb-2 mb-2">
          <div className="text-sm font-medium">
            {s.homeTeam} vs {s.awayTeam}
          </div>
          <div className="flex justify-between text-sm">
            <span>{s.market}</span>
            <span>{s.odds}</span>
          </div>

          <button
            className="text-red-500 text-xs mt-1"
            onClick={() => betSlipStore.removeSelection(s.matchId)}
          >
            Remove
          </button>
        </div>
      ))}

      {selections.length > 0 && (
        <>
          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter stake"
              className="border p-2 w-full"
              value={betSlipStore.stake || ""}
              onChange={(e) => betSlipStore.setStake(Number(e.target.value))}
            />
          </div>

          <div className="mt-4 text-sm">
            <div>Total Odds: {totalOdds.toFixed(2)}</div>
            <div className="font-bold">
              Potential Win: {potentialWin.toFixed(2)}
            </div>
          </div>

          <button
            className="mt-4 bg-green-600 text-white w-full p-2 rounded"
            onClick={async () => {
              try {
                const result = await placeBet({
                  stake: betSlipStore.stake,
                  selections: betSlipStore.selections,
                });

                alert("Bet placed successfully!");
                console.log(result);

                betSlipStore.clear();
              } catch (error: any) {
                alert(error.message);
              }
            }}
          >
            Place Bet
          </button>
        </>
      )}
    </div>
  );
}
