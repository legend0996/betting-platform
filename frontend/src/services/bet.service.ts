import { apiFetch } from "./api";

export const placeBet = async (data: { stake: number; selections: any[] }) => {
  return apiFetch("/bets/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
