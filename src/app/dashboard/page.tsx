import Link from "next/link";
import VoicePreview from "./voice-preview";

const money = (value: number) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
}).format(value);

// Fixed, illustrative data. The chart is a sample October balance history,
// followed by the same month-end estimate shown in the forecast below.
const obligations = [
  { name: "Home loan EMI", date: "28 Oct", amount: 12000 },
  { name: "Electricity bill", date: "29 Oct", amount: 1800 },
  { name: "Broadband", date: "30 Oct", amount: 700 },
];
const transactions = [
  { name: "Weekly groceries", detail: "24 Oct · Essentials · UPI", amount: -2450, icon: "groceries" },
  { name: "Lunch at work", detail: "23 Oct · Food · UPI", amount: -350, icon: "food" },
  { name: "October salary", detail: "01 Oct · Income · Bank transfer", amount: 95000, icon: "income" },
];
const balance = 82450;
const upcoming = obligations.reduce((total, item) => total + item.amount, 0);
const projected = balance - upcoming - 8000;
const history = [
  { day: 1, date: "1 Oct", amount: 125000 },
  { day: 7, date: "7 Oct", amount: 112000 },
  { day: 14, date: "14 Oct", amount: 102000 },
  { day: 21, date: "21 Oct", amount: 89000 },
  { day: 24, date: "24 Oct", amount: balance },
  { day: 31, date: "31 Oct", amount: projected },
];

function BalanceChart() {
  const points = history.map(item => ({
    x: 10 + (item.day - 1) / 30 * 310,
    y: 14 + (125000 - item.amount) / 1000,
  }));
  const curve = (start: number, end: number) =>
    points.slice(start + 1, end + 1).map((point, index) => {
      const previous = points[start + index];
      const middle = (previous.x + point.x) / 2;
      return `C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`;
    }).join(" ");
  return (
    <figure className="lucen-chart">
      <svg viewBox="0 0 330 120" role="img" aria-labelledby="balance-chart-title balance-chart-description">
        <title id="balance-chart-title">Sample October balance and forecast</title>
        <desc id="balance-chart-description">
          {history.map(item => `${item.date}: ${money(item.amount)}`).join("; ")}.
          Solid line is sample history through 24 October. Dashed line is the 31 October estimate.
        </desc>
        <path className="lucen-chartHistory" d={`M ${points[0].x} ${points[0].y} ${curve(0, 4)}`} />
        <path className="lucen-chartProjection" d={`M ${points[4].x} ${points[4].y} ${curve(4, 5)}`} />
        <circle cx={points[4].x} cy={points[4].y} r="5" />
        {history.map((item, index) => (
          <text key={item.day} x={points[index].x} y="113" textAnchor="middle" className={item.day === 24 ? "lucen-chartToday" : undefined} aria-hidden="true">{item.day}</text>
        ))}
      </svg>
      <figcaption>Sample balance history · Dashed: forecast</figcaption>
    </figure>
  );
}

function TransactionIcon({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {kind === "groceries" ? <path d="M4 8h16l-2 12H6ZM8 9l4-6 4 6M9 12v5M15 12v5" />
        : kind === "food" ? <path d="M6 3v7M3 3v5a3 3 0 0 0 6 0V3M6 11v10M17 3c-3 4-3 8 1 8h1V3ZM19 11v10" />
          : <path d="M3 7h18v14H3ZM8 7V3h8v4M3 12h18M10 12v3h4v-3" />}
    </svg>
  );
}

export default function Dashboard() {
  return (
    <div className="lucen-shell">
      <a href="#overview" className="lucen-skipLink">Skip to your overview</a>
      <header className="lucen-header">
        <Link href="/" className="lucen-brand" aria-label="Lucen welcome">lucen</Link>
        <span className="lucen-sampleBadge">Sample data</span>
      </header>
      <main className="lucen-content">
        <section className="lucen-balancePanel" id="overview" tabIndex={-1} aria-labelledby="overview-title">
          <h1 id="overview-title" className="lucen-srOnly">Your money, understood.</h1>
          <p className="lucen-period">October 2026</p>
          <h2 className="lucen-balanceLabel">Available balance</h2>
          <p className="lucen-balance">{money(balance)}</p>
          <p className="lucen-note">As of 24 Oct · Before upcoming payments</p>
          <BalanceChart />
          <dl className="lucen-totals">
            <div><dt>Income</dt><dd className="lucen-income">+{money(95000)}</dd></div>
            <div><dt>Expenses</dt><dd>−{money(42550)}</dd></div>
          </dl>
        </section>

        <section className="lucen-panel" id="upcoming" tabIndex={-1} aria-labelledby="upcoming-title">
          <div className="lucen-sectionHeading">
            <h2 id="upcoming-title">Coming up</h2>
            <span className="lucen-note">3 payments</span>
          </div>
          <div className="lucen-paymentWarning">
            <div className="lucen-sectionHeading"><strong>Home loan EMI</strong><span className="lucen-amount">{money(12000)}</span></div>
            <p><span className="lucen-dueBadge">Due in 4 days</span> <span className="lucen-note">28 October</span></p>
            <p className="lucen-note">Keep funds available. Payment isn’t scheduled.</p>
          </div>
          <details className="lucen-details">
            <summary>All bills & EMIs <span className="lucen-amount">{money(upcoming)}</span></summary>
            <ul className="lucen-list">{obligations.map(item => (
              <li key={item.name}>
                <div><p>{item.name}</p><p className="lucen-note">Due {item.date}</p></div>
                <span className="lucen-amount">{money(item.amount)}</span>
              </li>
            ))}</ul>
            <p className="lucen-note">Sample schedule through 31 Oct. No payments will be made.</p>
          </details>
        </section>

        <section className="lucen-panel lucen-forecast" id="forecast" tabIndex={-1} aria-labelledby="forecast-title">
          <div className="lucen-sectionHeading">
            <h2 id="forecast-title">Month-end outlook</h2>
            <span className="lucen-period">31 Oct</span>
          </div>
          <p className="lucen-sectionAmount">{money(projected)}</p>
          <p className="lucen-note">Projected balance · Sample estimate</p>
          <details className="lucen-details">
            <summary>How this is calculated</summary>
            <dl className="lucen-forecastRows">
              <div><dt>Available now</dt><dd>{money(balance)}</dd></div>
              <div><dt>Upcoming EMIs & bills</dt><dd>−{money(upcoming)}</dd></div>
              <div><dt>Assumed further spending</dt><dd>−{money(8000)}</dd></div>
              <div><dt>Projected month-end balance</dt><dd>{money(projected)}</dd></div>
            </dl>
            <p className="lucen-note">Sample calculation assumes no further income and ₹8,000 of additional spending. Actual cash flow will vary.</p>
          </details>
        </section>

        <section className="lucen-transactions" id="activity" tabIndex={-1} aria-labelledby="transactions-title">
          <div className="lucen-sectionHeading">
            <h2 id="transactions-title">Recent activity</h2>
            <span className="lucen-note">Sample entries</span>
          </div>
          <ul className="lucen-list">{transactions.map(item => (
            <li key={item.name} className="lucen-transaction">
              <span className="lucen-transactionIcon"><TransactionIcon kind={item.icon} /></span>
              <div><p>{item.name}</p><p className="lucen-note">{item.detail}</p></div>
              <span className={`lucen-amount ${item.amount > 0 ? "lucen-income" : ""}`}>
                {item.amount > 0 ? "+" : "−"}{money(Math.abs(item.amount))}
              </span>
            </li>
          ))}</ul>
        </section>
        <p className="lucen-sampleNotice">Your money, understood.<br />Illustrative data only. No accounts connected.</p>
      </main>
      <footer className="lucen-dock">
        <nav className="lucen-bottomNav" aria-label="Dashboard sections">
          <a href="#overview"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z" /></svg><span>Overview</span></a>
          <a href="#upcoming"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2ZM9 8h6M9 12h6" /></svg><span>Bills</span></a>
          <VoicePreview />
          <a href="#activity"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M16 3l4 4-4 4M20 17H4M8 13l-4 4 4 4" /></svg><span>Activity</span></a>
          <a href="#forecast"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3v17h17M8 15l4-5 4 2 5-7" /></svg><span>Outlook</span></a>
        </nav>
      </footer>
    </div>
  );
}
