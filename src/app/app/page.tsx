import Link from "next/link";
import { BottomNavigation, HomeHeader, SampleExpenseList, SummaryCard } from "./home-components";
import VoiceEntry from "./voice-entry";
import { sample, upcoming } from "./sample-data";

export default function MobileHome() {
  return <>
    <a className="la-skip" href="#lh-home">Skip to overview</a>
    <HomeHeader />
    <main id="lh-home" className="lh-content" tabIndex={-1}>
      <div className="lh-intro"><p className="lh-caption"><span aria-hidden="true">●</span> Overview · Sample data</p><h1>Hello Om!</h1><p>{sample.obligations.length} recurring payments this month</p></div>
      <div className="lh-period" aria-label="Sample period"><span>October</span><span>2026</span></div>
      <section className="lh-summaries" aria-label="Monthly financial summary">
        <SummaryCard tone="expense" label="Expenses" amount={sample.expenses} />
        <Link href="/app/recurring/" className="lh-summary-trigger" aria-label="View recurring payments"><SummaryCard tone="recurring" label="Recurring payments" amount={upcoming} /></Link>
        <SummaryCard tone="total" label="Total" amount={sample.expenses + upcoming} />
      </section>
      <section className="lh-recent" aria-labelledby="lh-recent-heading"><div className="lh-section-heading"><h2 id="lh-recent-heading"><span aria-hidden="true">●</span> Recent expenses</h2>
        <Link href="/app/expenses/" className="lh-text-action">See all</Link>
      </div><SampleExpenseList /></section>
      <p className="lh-note">Sample data. Total = expenses + upcoming recurring payments.</p>
      <section className="lh-foundation" aria-label="Existing foundation previews"><p className="lh-note">Voice entry and Add expense are front-end previews. No transactions are saved.</p><VoiceEntry /></section>
    </main>
    <BottomNavigation />
  </>;
}
