type Listener = () => void;

class WalletStore {
  balance: number = 0;

  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  setBalance(amount: number) {
    this.balance = amount;
    this.notify();
  }

  increase(amount: number) {
    this.balance += amount;
    this.notify();
  }

  decrease(amount: number) {
    this.balance -= amount;
    this.notify();
  }
}

export const walletStore = new WalletStore();
