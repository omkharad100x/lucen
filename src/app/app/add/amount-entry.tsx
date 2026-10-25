"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import { money } from "../sample-data";
import { useAddDraft } from "./draft-context";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "Backspace"];

export default function AmountEntry() {
  const { draft, dispatch } = useAddDraft();
  const [error, setError] = useState("");
  const router = useRouter();
  const [whole, fraction] = draft.amount.split(".");
  // Reuse INR grouping while retaining the decimal point and paise during editing.
  const displayAmount = money(Number(whole)) + (fraction === undefined ? "" : `.${fraction}`);
  const entryType = draft.direction === "expense" ? "Expense" : "Income";

  function input(key: string) {
    dispatch({ type: "key", key });
    setError("");
  }

  function continuePreview() {
    if (Number(draft.amount) <= 0) {
      setError("Enter an amount above ₹0. No transaction will be saved.");
      return;
    }
    // Matches Figma's Continue → Expenses connection. No data is written.
    router.push("/app/expenses/");
  }

  function handleKeyboard(event: KeyboardEvent<HTMLElement>) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (/^[0-9.]$/.test(event.key) || event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      input(event.key);
    } else if (event.key === "Enter" && (event.target as HTMLElement).tagName === "OUTPUT") {
      event.preventDefault();
      continuePreview();
    }
  }

  return <main className="lh-entry" onKeyDown={handleKeyboard}>
    <h1 className="lh-sr-only">Add expense</h1>
    <header className="lh-entry-header"><Link href="/app/" className="lh-entry-back" aria-label="Back to Home"><span aria-hidden="true">‹</span></Link><p className="lh-caption">{entryType} · Sample</p></header>
    <section className="lh-entry-body" aria-label="Amount entry">
      <output className="lh-entry-amount" data-compact={draft.amount.length > 6} tabIndex={0} aria-label={`${entryType} amount`} aria-describedby="lh-amount-help" aria-live="polite" aria-atomic="true">{displayAmount}</output>
      <p id="lh-amount-help" className="lh-sr-only">Use the keypad or type digits. The first digit replaces the example. Up to nine whole-number digits and two decimal places. Backspace deletes a digit; Delete clears the amount.</p>
      <Link href="/app/add/voice/" className="lh-entry-pill lh-entry-voice">Add by voice</Link>
      <div className="lh-keypad" role="group" aria-label="Numeric keypad">{keys.map(key => <button type="button" className="lh-entry-key" key={key} aria-label={key === "Backspace" ? "Delete last digit" : key === "." ? "Decimal point" : `Digit ${key}`} onClick={() => input(key)}>{key === "Backspace" ? "‹" : key}</button>)}</div>
    </section>
    <footer className="lh-entry-actions">
      <div className="lh-entry-modes" role="group" aria-label="Expense or income">
        <button type="button" className="lh-entry-pill" aria-pressed={draft.direction === "expense"} onClick={() => dispatch({ type: "direction", direction: "expense" })}>Minus</button>
        <button type="button" className="lh-entry-pill" aria-pressed={draft.direction === "income"} onClick={() => dispatch({ type: "direction", direction: "income" })}>Plus</button>
      </div>
      <button type="button" className="lh-entry-pill" onClick={continuePreview}>Continue</button>
      <p className="lh-caption" role={error ? "alert" : undefined}>{error || "Design preview · No transaction will be saved"}</p>
    </footer>
  </main>;
}
