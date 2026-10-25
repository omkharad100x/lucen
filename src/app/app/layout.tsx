import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./mobile.css";
import "./home.css";

const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-lucen-app" });

export const metadata: Metadata = {
  title: "Lucen — Your overview",
  description: "Your money, understood. Lucen’s mobile app foundation with clearly labelled sample financial data.",
  manifest: "/app/manifest.webmanifest",
  icons: { icon: "/lucen-app-icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#FFFFFF",
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${sora.variable} la-stage lh-stage`}><div className="lh-shell">{children}</div></div>;
}
