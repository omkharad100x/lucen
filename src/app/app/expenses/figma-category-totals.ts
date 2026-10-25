import type { CategoryTone } from "../home-components";

// Explicit illustrative aggregates from approved Figma screen 35:105.
// These are not inferred from, or additions to, sample.transactions.
export const figmaCategoryTotals = [
  { label: "Essentials", amount: 25530, tone: "blue" },
  { label: "Food and drink", amount: 10638, tone: "pink" },
  { label: "Other", amount: 6382, tone: "lime" },
] as const satisfies readonly { label: string; amount: number; tone: CategoryTone }[];
