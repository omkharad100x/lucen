import type { Metadata } from "next";
import { BottomNavigation, ExpenseRow, HomeHeader, SummaryCard } from "../home-components";
import { sample, upcoming } from "../sample-data";

export const metadata: Metadata = { title: "Lucen — Recurring payments" };

// Presentation categories are explicitly defined by approved Figma screen 35:106.
// All obligation names, dates and amounts remain sourced from sample-data.ts.
const categories: Record<typeof sample.obligations[number]["name"], string> = {
  "Home loan EMI": "Housing",
  Electricity: "Utilities",
  Broadband: "Utilities",
};
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const [snapshotDay, snapshotMonth, snapshotYear] = sample.asOf.split(" ");
const snapshotDate = Date.UTC(Number(snapshotYear), months.indexOf(snapshotMonth), Number(snapshotDay));
const dateLabel = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "UTC" });

export default function RecurringPage() {
  return <>
    <a className="la-skip" href="#lh-recurring-main">Skip to recurring payments</a>
    <HomeHeader />
    <main id="lh-recurring-main" className="lh-content" tabIndex={-1}>
      <h1 className="lh-page-title">Recurring payments</h1>
      <p>{sample.obligations.length} upcoming · {snapshotMonth} {snapshotYear}</p>
      <section aria-label="Total upcoming recurring payments"><SummaryCard tone="recurring" label="Recurring payments" amount={upcoming} /></section>
      <ul className="lh-obligations" aria-label="Upcoming obligations">
        {sample.obligations.map(bill => {
          const [day, month] = bill.due.split(" ");
          const dueDate = Date.UTC(Number(snapshotYear), months.findIndex(name => name.startsWith(month)), Number(day));
          const daysUntilDue = Math.round((dueDate - snapshotDate) / 86_400_000);
          return <li key={bill.name} className="lh-obligation">
            <h2 className="lh-obligation-date"><span aria-hidden="true">●</span> <time dateTime={new Date(dueDate).toISOString().slice(0, 10)}>{dateLabel.format(dueDate)}</time></h2>
            <ul className="lh-obligation-card"><ExpenseRow initial={bill.name[0]} title={bill.name} detail={`${categories[bill.name]} · Due in ${daysUntilDue} days`} amount={bill.amount} tone="blue" amountLabel="Upcoming obligation" /></ul>
          </li>;
        })}
      </ul>
      <p className="lh-note">Sample data · Keep funds available. No payments are scheduled.</p>
      <p className="lh-note">Relative dates use the sample snapshot: {sample.asOf}.</p>
    </main>
    <BottomNavigation active="recurring" />
  </>;
}
