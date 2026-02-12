export interface BetSelection {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  market: string;
  odds: number;
}

type Listener = () => void;

class BetSlipStore {
  selections: BetSelection[] = [];
  stake: number = 0;

  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  addSelection(selection: BetSelection) {
    const exists = this.selections.find((s) => s.matchId === selection.matchId);

    if (exists) {
      this.selections = this.selections.map((s) =>
        s.matchId === selection.matchId ? selection : s,
      );
    } else {
      this.selections.push(selection);
    }

    this.notify();
  }

  removeSelection(matchId: number) {
    this.selections = this.selections.filter((s) => s.matchId !== matchId);
    this.notify();
  }

  clear() {
    this.selections = [];
    this.stake = 0;
    this.notify();
  }

  setStake(amount: number) {
    this.stake = amount;
    this.notify();
  }

  getTotalOdds() {
    if (this.selections.length === 0) return 0;

    return this.selections.reduce((total, s) => total * s.odds, 1);
  }

  getPotentialWin() {
    return this.getTotalOdds() * this.stake;
  }
}

export const betSlipStore = new BetSlipStore();
