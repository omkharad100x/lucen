"use client";

import { useRef } from "react";

export default function VoicePreview() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="lucen-voiceAction" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">
        <span className="lucen-voiceIcon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8" /></svg></span>
        <span>Add by voice</span>
      </button>
      <dialog ref={dialog} className="lucen-dialog" aria-labelledby="voice-title" aria-describedby="voice-description">
        <div className="lucen-dialogContent">
          <p className="lucen-eyebrow">Voice entry / Preview</p>
          <h2 id="voice-title">Say it. Understand it.</h2>
          <p id="voice-description">Voice entry is coming soon. This preview does not use your microphone or record audio.</p>
          <blockquote>“Spent ₹250 on lunch.”</blockquote>
          <p className="lucen-note">An example of what you’ll be able to say. No transaction has been added.</p>
          <form method="dialog"><button className="lucen-primary">Back to dashboard</button></form>
        </div>
      </dialog>
    </>
  );
}
