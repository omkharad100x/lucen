import type { Metadata } from "next";
import AmountEntry from "./amount-entry";

export const metadata: Metadata = { title: "Lucen — Add expense" };

export default function AddExpensePage() {
  return <AmountEntry />;
}
