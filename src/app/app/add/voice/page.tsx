import type { Metadata } from "next";
import Link from "next/link";
import { money } from "../../sample-data";

export const metadata: Metadata = { title: "Lucen — Voice preview" };

export default function VoicePreviewPage() {
  return <main className="lh-voice-preview" aria-labelledby="lh-voice-page-title">
    <h1 id="lh-voice-page-title" className="lh-page-title">Voice entry</h1>
    <blockquote className="lh-voice-phrase">“Spent {money(250)} on lunch.”</blockquote>
    <section className="lh-voice-example" aria-label="Illustrative voice draft">
      <h2>EXAMPLE DRAFT</h2><p className="lh-summary-amount">{money(250)}</p><p>Lunch · Food and drink</p>
    </section>
    <p className="lh-voice-notice">This is a design preview. No microphone access, recording, or AI processing is active.</p>
    <Link href="/app/add/" className="lh-button">Back to amount</Link>
  </main>;
}
