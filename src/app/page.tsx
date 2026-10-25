import type { Metadata } from "next";
import { Sora } from "next/font/google";
import type { CSSProperties } from "react";
import "./landing.css";

const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-landing" });

export const metadata: Metadata = {
  title: "Lucen for Android — Your money, understood.",
  description: "Meet Lucen, a native Android personal finance app in development. A simpler way to understand spending, upcoming bills, and cash flow. Direct APK download coming soon.",
};

// Set this to the published, versioned APK URL when an Android release is ready.
const androidApkUrl: string | undefined = undefined;

function Icon({ name }: { name: "arrow" | "download" | "mic" | "home" | "chart" | "wallet" | "check" | "plus" }) {
  const paths = {
    arrow: "M7 17 17 7M7 7h10v10",
    download: "M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5",
    mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8",
    home: "m3 10 9-7 9 7v11h-6v-7H9v7H3Z",
    chart: "M4 20V10m8 10V4m8 16v-7",
    wallet: "M3 6h16v4H3V6Zm0 4v11h18V10H3Zm13 4h5v3h-5Z",
    check: "m5 12 4 4L19 6",
    plus: "M12 5v14M5 12h14",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

function Brand() {
  return <span className="ln-brand"><span className="ln-brandMark" aria-hidden="true" />lucen</span>;
}

function AppPreview() {
  return (
    <figure className="ln-productPreview" aria-labelledby="preview-caption">
      <div className="ln-phone" role="img" aria-label="Lucen Android concept showing an available balance of 82,450 rupees, monthly expenses of 42,550 rupees, and upcoming bills of 14,500 rupees. All figures are illustrative.">
        <div className="ln-phoneScreen" aria-hidden="true">
          <div className="ln-phoneStatus"><span>9:41</span><span className="ln-camera" /><span>5G <span className="ln-battery" /></span></div>
          <div className="ln-appHeader"><Brand /><span className="ln-profile">A</span></div>
          <div className="ln-appGreeting"><span>YOUR OVERVIEW</span><strong>Hello, Ananya.</strong><p>A little clarity for your day.</p></div>
          <div className="ln-appMonth"><span>October</span><span>2026</span></div>
          <div className="ln-balanceCard"><span>Available balance</span><strong>₹82,450<span>.00</span></strong><small>Before upcoming payments</small></div>
          <div className="ln-appMetrics"><div><span>↗ Expenses</span><strong>₹42,550</strong><small>This month</small></div><div><span>↘ Income</span><strong>₹95,000</strong><small>This month</small></div></div>
          <div className="ln-appUpcoming"><div><span>Upcoming bills</span><strong>₹14,500</strong></div><p><span className="ln-dueDot" /> Home loan EMI <span>28 Oct</span></p></div>
          <div className="ln-appRecent"><span>Recent activity</span><div><span className="ln-category">↗</span><span>Groceries<small>Today · Essentials</small></span><strong>−₹2,450</strong></div></div>
          <div className="ln-appNav"><span><Icon name="home" />Home</span><span><Icon name="chart" />Insights</span><span className="ln-appVoice"><Icon name="mic" /><small>Voice</small></span><span><Icon name="wallet" />Bills</span></div>
          <div className="ln-gestureBar" />
        </div>
      </div>
      <figcaption id="preview-caption">App concept · Illustrative financial data</figcaption>
    </figure>
  );
}

function VoiceWave() {
  const heights = [10, 18, 30, 16, 38, 52, 30, 60, 42, 24, 50, 68, 44, 28, 56, 38, 18, 32, 14, 8];
  return <div className="ln-wave" aria-hidden="true">{heights.map((height, index) => <i key={index} style={{ "--bar-height": `${height}%` } as CSSProperties} />)}</div>;
}

const faqs = [
  { question: "Is Lucen available to download?", answer: "Not yet. The native Android app is in development. Once the first release is ready, this page will offer a direct APK download. There is no release date to announce yet." },
  { question: "Will there be an iPhone or web app?", answer: "Lucen is being built exclusively for native Android. This website introduces the app; it is not a browser version of Lucen." },
  { question: "What is an APK?", answer: "An APK is an Android app installation file. When Lucen is released, you’ll be able to download it directly from this page. Installation instructions and supported Android versions will be provided with the release." },
  { question: "Are the balances and transactions real?", answer: "No. Every balance, transaction, and forecast shown here is illustrative. The screens are product previews, not connected accounts or a live finance service." },
];

export default function Home() {
  return (
    <div className={`ln-site ${sora.variable}`}>
      <a className="ln-skipLink" href="#main">Skip to content</a>
      <header className="ln-header ln-grid">
        <div className="ln-headerInner">
          <a href="#top" className="ln-brandLink" aria-label="Lucen home"><Brand /></a>
          <nav className="ln-nav" aria-label="Main navigation"><a href="#features">The app</a><a href="#how-it-works">How it works</a><a href="#questions">FAQs</a></nav>
          <a className="ln-button ln-buttonSmall" href="#download">Get Lucen <Icon name="download" /></a>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="ln-hero ln-grid" id="top" aria-labelledby="hero-heading">
          <div className="ln-heroInner">
            <div className="ln-heroCopy">
              <p className="ln-eyebrow"><span className="ln-blueDot" /> A FRESH TAKE ON PERSONAL FINANCE</p>
              <h1 id="hero-heading">Your money,<br /><span>understood.</span></h1>
              <p className="ln-lead">Less figuring it out.<br />More getting on with life.</p>
              <p className="ln-bodyCopy">Meet Lucen. A personal finance app for Android, being built to bring your spending, bills, and what’s next into one clear picture.</p>
              <div className="ln-heroActions"><a href="#download" className="ln-button">Get Lucen for Android <Icon name="download" /></a><a href="#features" className="ln-textLink">Meet the app <Icon name="arrow" /></a></div>
              <p className="ln-releaseNote"><span className="ln-statusDot" /> In development · Direct APK coming soon</p>
            </div>
            <div className="ln-heroVisual">
              <span className="ln-visualLabel">A LITTLE LESS NOISE.<br />A LOT MORE CLARITY.</span>
              <AppPreview />
              <div className="ln-voiceFloat" aria-hidden="true"><span className="ln-voiceFloatIcon"><Icon name="mic" /></span><div><small>JUST SAY IT.</small><p>“Spent ₹240 on lunch.”</p></div><span className="ln-floatCheck"><Icon name="check" /></span></div>
            </div>
          </div>
          <div className="ln-principles"><span>Built for Android.</span><span>Made for everyday money.</span><span>Designed to feel simple.</span></div>
        </section>
        <section className="ln-features ln-grid" id="features" aria-labelledby="features-heading">
          <div className="ln-sectionHeading"><p className="ln-eyebrow">THE LITTLE THINGS, UNDERSTOOD.</p><h2 id="features-heading">A clearer picture.<br /><span>A lighter routine.</span></h2><p>From your morning coffee to your monthly EMI.<br />A place for the money moments that add up.</p></div>
          <div className="ln-featureGrid">
            <article className="ln-feature ln-featureVoice">
              <div className="ln-featureTop"><span className="ln-index">01 / LESS TYPING</span><span className="ln-roundIcon"><Icon name="mic" /></span></div>
              <div className="ln-voiceDemo"><span className="ln-demoLabel">VOICE ENTRY CONCEPT</span><p>“Spent ₹240<br />on lunch.”</p><VoiceWave /><div className="ln-entryReceipt"><span>Lunch <small>Food & drinks</small></span><strong>₹240</strong></div></div>
              <div className="ln-featureCopy"><h3>Life happens.<br />Just say it.</h3><p>Voice entry is at the heart of Lucen. An easier way to capture the little expenses before they slip your mind.</p></div>
            </article>
            <article className="ln-feature ln-featureBills">
              <div className="ln-featureTop"><span className="ln-index">02 / FEWER SURPRISES</span><span className="ln-roundIcon"><Icon name="wallet" /></span></div>
              <div className="ln-billsDemo"><div className="ln-demoHeading"><span>This week</span><span>OCTOBER</span></div><div className="ln-week" aria-hidden="true">{[["M", "26"], ["T", "27"], ["W", "28"], ["T", "29"], ["F", "30"]].map(([day, date]) => <span className={date === "28" ? "ln-selectedDay" : undefined} key={date}><small>{day}</small><strong>{date}</strong></span>)}</div><div className="ln-billRow"><span className="ln-billIcon"><Icon name="home" /></span><div>Home loan EMI<small>Due 28 October</small></div><strong>₹12,000</strong></div><div className="ln-billRow"><span className="ln-billIcon ln-billIconBlue"><Icon name="wallet" /></span><div>Electricity bill<small>Due 29 October</small></div><strong>₹1,800</strong></div><p className="ln-billsNotice">Illustrative bills · Payments not scheduled</p></div>
              <div className="ln-featureCopy"><h3>Know what’s due.<br />Before it is.</h3><p>Your upcoming EMIs and bills, together. See the commitments ahead and leave room for the rest of life.</p></div>
            </article>
          </div>
          <article className="ln-forecastFeature">
            <div className="ln-featureCopy"><span className="ln-index">03 / A LITTLE FORESIGHT</span><h3>Today’s balance.<br />Tomorrow’s perspective.</h3><p>A cash-flow preview connects what you have with what’s coming up. So the month ahead feels a little easier to understand.</p></div>
            <div className="ln-forecastDemo"><div className="ln-demoHeading"><span>Your month ahead</span><span>ILLUSTRATIVE</span></div><dl><div><dt>Available now</dt><dd>₹82,450</dd></div><div><dt>Upcoming bills</dt><dd>−₹14,500</dd></div><div><dt>Planned spending</dt><dd>−₹8,000</dd></div><div><dt>Projected balance <small>31 October</small></dt><dd>₹59,950</dd></div></dl><p>An estimate, not a guarantee.</p></div>
          </article>
        </section>
        <section className="ln-how ln-grid" id="how-it-works" aria-labelledby="how-heading"><div className="ln-howInner"><div><p className="ln-eyebrow">A SMALLER MONEY ROUTINE.</p><h2 id="how-heading">A moment a day.<br /><span>A clearer month.</span></h2><p className="ln-bodyCopy">The everyday experience we’re building.</p></div><ol className="ln-steps"><li><span>01</span><div><h3>Capture the moment.</h3><p>Speak an expense or add it yourself. Keep the details while they’re still fresh.</p></div></li><li><span>02</span><div><h3>See the whole picture.</h3><p>Bring income, spending, and upcoming bills into one simple overview.</p></div></li><li><span>03</span><div><h3>Look a little ahead.</h3><p>Use the cash-flow preview to understand what could be left at month-end.</p></div></li></ol></div></section>
        <section className="ln-faq ln-grid" id="questions" aria-labelledby="faq-heading"><div className="ln-faqInner"><div><p className="ln-eyebrow">GOOD QUESTIONS.</p><h2 id="faq-heading">A little more<br /><span>clarity.</span></h2></div><div className="ln-questions">{faqs.map(({ question, answer }) => <details key={question}><summary>{question}<Icon name="plus" /></summary><p>{answer}</p></details>)}</div></div></section>
        <section className="ln-download ln-grid" id="download" aria-labelledby="download-heading"><div className="ln-downloadPanel"><span className="ln-downloadMark" aria-hidden="true"><span className="ln-brandMark" /></span><p className="ln-eyebrow">YOUR NEXT MONEY HABIT.</p><h2 id="download-heading">A little more Lucen.<br />A little less guesswork.</h2><p>Being built for your Android.<br />Made for your everyday.</p>{androidApkUrl ? <a className="ln-button" href={androidApkUrl} download>Download Android APK <Icon name="download" /></a> : <button className="ln-button" disabled aria-describedby="download-status">Android APK coming soon <Icon name="download" /></button>}<p id="download-status" className="ln-downloadStatus">The first release isn’t available yet.<br />The direct APK download will appear here when it’s ready.</p></div></section>
      </main>
      <footer className="ln-footer ln-grid"><div className="ln-footerInner"><a className="ln-brandLink" href="#top" aria-label="Lucen, back to top"><Brand /></a><p>Your money, understood.</p><a className="ln-textLink" href="#questions">Questions? Start here <Icon name="arrow" /></a></div><div className="ln-footerNote"><span>© 2026 Lucen</span><span>Native Android · In development</span></div></footer>
    </div>
  );
}
