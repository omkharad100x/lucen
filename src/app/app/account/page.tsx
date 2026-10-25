import type { Metadata } from "next";
import { BottomNavigation, HomeHeader } from "../home-components";
import { ForecastDetails } from "../foundation-content";
import { money, projected, sample, upcoming } from "../sample-data";

export const metadata: Metadata = { title: "Lucen — Your account" };

export default function AccountPage() {
  return <>
    <a className="la-skip" href="#lh-account-main">Skip to account</a>
    <HomeHeader />
    <main id="lh-account-main" className="lh-content" tabIndex={-1}>
      <h1 className="lh-page-title">Your account</h1>
      <p>Your money, understood.</p>
      <section className="lh-profile" aria-label="Sample profile">
        <span className="lh-profile-avatar" aria-hidden="true">O</span>
        <div className="lh-profile-details"><p className="lh-profile-name">Om</p><p className="lh-note">Sample profile · INR</p></div>
      </section>
      <section className="lh-recent lh-balance-panel" aria-labelledby="lh-balance-heading">
        <h2 id="lh-balance-heading">Available balance</h2>
        <p className="lh-summary-amount">{money(sample.balance)}</p>
        <p className="lh-note">As of {sample.asOf} · Illustrative data</p>
      </section>
      <dl className="lh-account-totals">
        <div><dt>Monthly income</dt><dd>{money(sample.income)}</dd></div>
        <div><dt>Monthly expenses</dt><dd>{money(sample.expenses)}</dd></div>
        <div><dt>Upcoming obligations</dt><dd>{money(upcoming)}</dd></div>
      </dl>
      <section className="lh-account-outlook" aria-labelledby="lh-outlook-heading">
        <h2 id="lh-outlook-heading">Month-end outlook</h2>
        <p className="lh-summary-amount">{money(projected)}</p>
        <p className="lh-note">{money(sample.balance)} − {money(upcoming)} bills − {money(sample.furtherSpending)} spending. Assumes no further income.</p>
      </section>
      <p className="lh-note">Estimate only. No real accounts connected.</p>
      <div className="lh-account-calculation"><ForecastDetails /></div>
    </main>
    <BottomNavigation active="account" />
  </>;
}
