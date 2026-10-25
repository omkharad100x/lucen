import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { money, sample } from "./sample-data";

export type CategoryTone = "blue" | "pink" | "lime";

export function LabelMarker() {
  return <span className="lh-marker" aria-hidden="true" />;
}

export function FigmaIcon({ name, active = false }: { name: "bell" | "recurring" | "account"; active?: boolean }) {
  const size = name === "bell" ? 20 : 22;
  const variant = name !== "bell" && active ? "-active" : "";
  return <Image className="lh-icon" src={`/lucen/${name}${variant}.svg`} width={size} height={size} alt="" aria-hidden="true" unoptimized />;
}

export function HomeHeader() {
  return <header className="lh-header"><p className="lh-brand">Lucen</p>
    <Link href="/app/recurring/" className="lh-bell" aria-label="Upcoming recurring payments"><FigmaIcon name="bell" /></Link>
  </header>;
}

export function SummaryCard({ tone, label, amount }: { tone: "expense" | "recurring" | "total"; label: string; amount: number }) {
  return <span className="lh-summary" data-tone={tone}><span className="lh-summary-label"><LabelMarker />{label}</span><span className="lh-summary-amount">{money(amount)}</span></span>;
}

export function ExpenseRow({ initial, title, detail, amount, tone, amountLabel = "Expense" }: { initial: string; title: string; detail: string; amount: number; tone: CategoryTone; amountLabel?: string }) {
  return <li className="lh-expense"><span className="lh-category" data-tone={tone} aria-hidden="true">{initial}</span><span className="lh-expense-description"><span className="lh-expense-title">{title}</span><span className="lh-note">{detail}</span></span><span className="lh-expense-amount"><span className="lh-sr-only">{amountLabel}: </span>{money(Math.abs(amount))}</span></li>;
}

export function SampleExpenseList() {
  return <ul className="lh-expenses">{sample.transactions.map((item, index) => <ExpenseRow key={item.name} initial={index === 0 ? "G" : "F"} title={index === 0 ? "Groceries" : "Food and drink"} detail={item.detail} amount={item.amount} tone={index === 0 ? "blue" : "pink"} />)}</ul>;
}

export function CategoryBreakdown({ categories, total }: {
  categories: readonly { label: string; amount: number; tone: CategoryTone }[];
  total: number;
}) {
  return <ul className="lh-category-list">{categories.map(category => {
    const percentage = total > 0 ? category.amount / total * 100 : 0;
    return <li className="lh-category-total" data-tone={category.tone} key={category.label}>
      <div className="lh-category-heading"><span className="lh-category-label"><LabelMarker />{category.label}</span><span className="lh-category-value">{Math.round(percentage)}%&nbsp; {money(category.amount)}</span></div>
      <div className="lh-category-track" aria-hidden="true"><span style={{ "--lh-share": `${percentage}%` } as CSSProperties} /></div>
    </li>;
  })}</ul>;
}

export function BottomNavigation({ homeIsCurrentPage = true, active = "home" }: { homeIsCurrentPage?: boolean; active?: "home" | "recurring" | "account" }) {
  return <footer className="lh-dock"><nav className="lh-navigation" aria-label="Main navigation">
    <Link className="lh-tab" href="/app/" aria-current={active === "home" ? homeIsCurrentPage ? "page" : "location" : undefined}><span className="lh-home-mark" aria-hidden="true">L</span><span>Home</span></Link>
    <Link className="lh-tab" href="/app/recurring/" aria-current={active === "recurring" ? "page" : undefined}><FigmaIcon name="recurring" active={active === "recurring"} /><span>Recurring</span></Link>
    <Link className="lh-tab" href="/app/account/" aria-current={active === "account" ? "page" : undefined}><FigmaIcon name="account" active={active === "account"} /><span>Account</span></Link>
  </nav><Link href="/app/add/" className="lh-add" aria-label="Add expense"><span aria-hidden="true">+</span></Link></footer>;
}
