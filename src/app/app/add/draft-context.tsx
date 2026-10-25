"use client";

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";

type Draft = { amount: string; direction: "expense" | "income"; isExample: boolean };
type Action = { type: "key"; key: string } | { type: "direction"; direction: Draft["direction"] };
const initialDraft: Draft = { amount: "250", direction: "expense", isExample: true };

function editDraft(draft: Draft, action: Action): Draft {
  if (action.type === "direction") return { ...draft, direction: action.direction };
  const key = action.key;
  if (key === "Delete") return { ...draft, amount: "0", isExample: false };
  if (key === "Backspace") return { ...draft, amount: draft.amount.slice(0, -1) || "0", isExample: false };
  // The first numeric input replaces Figma's illustrative ₹250 amount.
  const current = draft.isExample ? "0" : draft.amount;
  if (key === ".") return current.includes(".") ? draft : { ...draft, amount: `${current}.`, isExample: false };
  if (!/^\d$/.test(key)) return draft;
  const [whole, fraction] = current.split(".");
  if (fraction !== undefined && fraction.length >= 2) return draft;
  if (fraction === undefined && whole !== "0" && whole.length >= 9) return draft;
  return { ...draft, amount: current === "0" ? key : current + key, isExample: false };
}

const DraftContext = createContext<{ draft: Draft; dispatch: Dispatch<Action> } | null>(null);

export default function AddDraftProvider({ children }: { children: ReactNode }) {
  const [draft, dispatch] = useReducer(editDraft, initialDraft);
  return <DraftContext.Provider value={{ draft, dispatch }}>{children}</DraftContext.Provider>;
}

export function useAddDraft() {
  const context = useContext(DraftContext);
  if (!context) throw new Error("Add draft must be used inside AddDraftProvider");
  return context;
}
