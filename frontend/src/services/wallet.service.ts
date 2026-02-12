import { apiFetch } from "./api";

export const getWallet = async () => {
  return apiFetch("/wallets");
};

export const creditWallet = async (amount: number) => {
  return apiFetch("/wallets/credit", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });
};

export const debitWallet = async (amount: number) => {
  return apiFetch("/wallets/debit", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });
};
