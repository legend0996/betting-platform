type Listener = () => void;

class AuthStore {
  token: string | null = null;
  user: any = null;

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

  setAuth(token: string, user: any) {
    this.token = token;
    this.user = user;
    localStorage.setItem("token", token);
    this.notify();
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem("token");
    this.notify();
  }
}

export const authStore = new AuthStore();
