import AddDraftProvider from "./draft-context";
import "./entry.css";

export default function AddLayout({ children }: { children: React.ReactNode }) {
  return <AddDraftProvider>{children}</AddDraftProvider>;
}
