import { betSlipStore } from "@/store/betSlip.store";

interface OddsButtonProps {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  label: string;
  odds: number;
}

export default function OddsButton({
  matchId,
  homeTeam,
  awayTeam,
  label,
  odds,
}: OddsButtonProps) {
  const handleClick = () => {
    betSlipStore.addSelection({
      matchId,
      homeTeam,
      awayTeam,
      market: label,
      odds,
    });

    console.log("Current selections:", betSlipStore.selections);
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 border rounded p-2 hover:bg-blue-100 transition"
    >
      <div className="text-sm">{label}</div>
      <div className="font-bold">{odds}</div>
    </button>
  );
}
