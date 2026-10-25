import Link from "next/link";
import { BottomNavigation, HomeHeader, SampleExpenseList, SummaryCard } from "./home-components";
import FoundationDialog from "./foundation-dialog";
import { UpcomingContent } from "./foundation-content";
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
        <FoundationDialog id="lh-summary-preview" title="Upcoming obligations" label="Recurring payments — existing sample preview" className="lh-summary-trigger" trigger={<SummaryCard tone="recurring" label="Recurring payments" amount={upcoming} />}><UpcomingContent /></FoundationDialog>
        <SummaryCard tone="total" label="Total" amount={sample.expenses + upcoming} />
      </section>
      <section className="lh-recent" aria-labelledby="lh-recent-heading"><div className="lh-section-heading"><h2 id="lh-recent-heading"><span aria-hidden="true">●</span> Recent expenses</h2>
        <Link href="/app/expenses/" className="lh-text-action">See all</Link>
      </div><SampleExpenseList /></section>
      <p className="lh-note">Sample data. Total = expenses + upcoming recurring payments.</p>
      <section className="lh-foundation" aria-label="Existing foundation previews"><p className="lh-note">Recurring and Account open existing sample previews. Add expense is not available yet.</p><VoiceEntry /></section>
    </main>
    <BottomNavigation />
  </>;
}
