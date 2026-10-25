import type { Metadata } from "next";
import { BottomNavigation, CategoryBreakdown, HomeHeader, SampleExpenseList } from "../home-components";
import { sample } from "../sample-data";
import { figmaCategoryTotals } from "./figma-category-totals";

export const metadata: Metadata = { title: "Lucen — Recent expenses" };

export default function ExpensesPage() {
  return <>
    <a className="la-skip" href="#lh-expenses-main">Skip to expenses</a>
    <HomeHeader previewCloseLabel="Back to Expenses" />
    <main id="lh-expenses-main" className="lh-content" tabIndex={-1}>
      <h1 className="lh-page-title">Recent expenses</h1>
      <p className="lh-note">October 2026 · Sample data</p>
      <section className="lh-recent" aria-labelledby="lh-expenses-heading">
        <div className="lh-section-heading"><h2 id="lh-expenses-heading"><span aria-hidden="true">●</span> Recent expenses</h2></div>
        <SampleExpenseList />
      </section>
      <section className="lh-recent lh-category-panel" aria-labelledby="lh-category-heading" aria-describedby="lh-category-source">
        <div className="lh-section-heading"><h2 id="lh-category-heading"><span aria-hidden="true">●</span> By category</h2></div>
        <CategoryBreakdown categories={figmaCategoryTotals} total={sample.expenses} />
      </section>
      <p id="lh-category-source" className="lh-note">Illustrative monthly category totals from the approved design. These are separate from the two listed sample entries.</p>
    </main>
    <BottomNavigation homeIsCurrentPage={false} />
  </>;
}
