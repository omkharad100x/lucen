// A fixed snapshot, not live account data. Keep dates and relative labels consistent.
export const sample = {
  asOf: "24 October 2026",
  balance: 82450,
  income: 95000,
  expenses: 42550,
  furtherSpending: 8000,
  obligations: [
    { name: "Home loan EMI", due: "28 Oct", amount: 12000 },
    { name: "Electricity", due: "29 Oct", amount: 1800 },
    { name: "Broadband", due: "30 Oct", amount: 700 },
  ],
  transactions: [
    { name: "Weekly groceries", detail: "24 Oct · Essentials", amount: -2450 },
    { name: "Lunch at work", detail: "23 Oct · Food", amount: -350 },
  ],
} as const;

export const upcoming = sample.obligations.reduce((sum, bill) => sum + bill.amount, 0);
export const projected = sample.balance - upcoming - sample.furtherSpending;

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
});
export const money = (amount: number) => currency.format(amount);
