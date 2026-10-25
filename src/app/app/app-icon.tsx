// Reuse the reference dashboard's simple line-icon vocabulary.
export default function AppIcon({ name }: { name: "home" | "bills" | "activity" | "outlook" | "mic" }) {
  const paths = {
    home: "m3 10 9-7 9 7v11h-6v-7H9v7H3Z",
    bills: "M6 3h12v18l-3-2-3 2-3-2-3 2ZM9 8h6M9 12h6",
    activity: "M4 7h16M16 3l4 4-4 4M20 17H4M8 13l-4 4 4 4",
    outlook: "M4 3v17h17M8 15l4-5 4 2 5-7",
    mic: "M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3ZM5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
