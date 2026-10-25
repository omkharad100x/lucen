"use client";

import { useRef, type ReactNode } from "react";

// Preserve foundation previews until the dedicated screens are implemented.
export default function FoundationDialog({ id, title, label, trigger, children, className = "", closeLabel = "Back to Home" }: {
  id: string; title: string; label: string; trigger: ReactNode; children: ReactNode; className?: string; closeLabel?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button type="button" className={className} aria-label={label} aria-haspopup="dialog" aria-controls={id} onClick={() => dialog.current?.showModal()}>{trigger}</button>
    <dialog ref={dialog} id={id} className="la-dialog lh-preview" aria-labelledby={`${id}-title`} aria-describedby={`${id}-notice`}>
      <div className="la-dialogContent">
        <div><h2 id={`${id}-title`}>{title}</h2><p id={`${id}-notice`} className="lh-note">Existing sample preview · Full screen coming in a later phase.</p></div>
        {children}
        <form method="dialog"><button className="lh-button" autoFocus>{closeLabel}</button></form>
      </div>
    </dialog>
  </>;
}
