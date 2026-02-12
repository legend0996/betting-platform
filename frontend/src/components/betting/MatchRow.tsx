import OddsButton from "./OddsButton";

interface MatchRowProps {
  match: any;
}

export default function MatchRow({ match }: MatchRowProps) {
  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between mb-2">
        <span className="font-medium">
          {match.homeTeam} vs {match.awayTeam}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(match.startTime).toLocaleTimeString()}
        </span>
      </div>

      <div className="flex gap-2">
        <OddsButton
          matchId={match.id}
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          label="1"
          odds={1.8}
        />

        <OddsButton
          matchId={match.id}
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          label="X"
          odds={3.2}
        />

        <OddsButton
          matchId={match.id}
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          label="2"
          odds={4.0}
        />
      </div>
    </div>
  );
}
