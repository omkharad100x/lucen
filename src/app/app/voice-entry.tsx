"use client";

import { useRef } from "react";
import AppIcon from "./app-icon";

export default function VoiceEntry() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button className="la-primary" type="button" aria-haspopup="dialog" aria-controls="la-voice-dialog" onClick={() => dialog.current?.showModal()}>
        <AppIcon name="mic" /><span>Add by voice</span>
      </button>
      <dialog id="la-voice-dialog" ref={dialog} className="la-dialog" aria-labelledby="la-voice-title" aria-describedby="la-voice-description">
        <div className="la-dialogContent">
          <p className="la-eyebrow">Voice entry · Preview</p>
          <h2 id="la-voice-title">A word is all it takes.</h2>
          <p id="la-voice-description">Voice entry isn’t available yet. This preview does not access your microphone or record audio.</p>
          <blockquote>“Spent ₹250 on lunch.”</blockquote>
          <p className="la-note">An illustrative example. No transaction will be added.</p>
          <form method="dialog"><button className="la-primary" autoFocus>Back to overview</button></form>
        </div>
      </dialog>
    </>
  );
}
