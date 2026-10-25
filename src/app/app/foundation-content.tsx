import { money, projected, sample, upcoming } from "./sample-data";

export function UpcomingContent() {
  return <section className="la-section">
    <p>{money(upcoming)} total · {sample.obligations.length} upcoming obligations</p>
    <ul className="la-bills">{sample.obligations.map((bill, index) => <li key={bill.name}>
      <div><p>{bill.name}</p><p className={index === 0 ? "la-due" : "la-note"}>Due {bill.due}{index === 0 ? " · Next payment" : ""}</p></div><span className="la-amount">{money(bill.amount)}</span>
    </li>)}</ul><p className="la-warning">Keep funds available. Payments aren’t scheduled.</p>
  </section>;
}

export function ForecastDetails() {
  return <details className="la-details"><summary>How this is calculated <span aria-hidden="true">+</span></summary>
    <dl className="la-calculation"><div><dt>Available now</dt><dd>{money(sample.balance)}</dd></div><div><dt>Upcoming bills</dt><dd>−{money(upcoming)}</dd></div><div><dt>Further spending</dt><dd>−{money(sample.furtherSpending)}</dd></div><div><dt>Projected balance</dt><dd>{money(projected)}</dd></div></dl>
    <p className="la-note">Assumes no further income. Actual cash flow will vary.</p>
  </details>;
}

export function AccountContent() {
  return <>
    <section className="la-section"><p>Available balance</p><p className="la-projected">{money(sample.balance)}</p><p className="la-note">As of {sample.asOf} · Before upcoming bills</p>
      <dl className="la-totals"><div><dt>Monthly income</dt><dd>+{money(sample.income)}</dd></div><div><dt>Monthly expenses</dt><dd>−{money(sample.expenses)}</dd></div></dl>
    </section>
    <section className="la-section"><h3>Month-end outlook · 31 Oct</h3><p className="la-projected">{money(projected)}</p><p className="la-note">Projected balance · Sample estimate</p>
      <ForecastDetails />
    </section>
  </>;
}

export function ExpensesContent() {
  return <section className="la-section"><ul className="la-transactions">{sample.transactions.map(item => <li key={item.name}><div><p>{item.name}</p><p className="la-note">{item.detail}</p></div><span className="la-amount">−{money(Math.abs(item.amount))}</span></li>)}</ul><p className="la-note">Illustrative data only. No accounts connected.</p></section>;
}
