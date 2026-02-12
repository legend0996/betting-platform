export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(amount);
};

export const formatOdds = (odds: number) => {
  return odds.toFixed(2);
};

export const formatTime = (date: Date | string) => {
  return new Date(date).toLocaleString();
};
