import type { MetadataRoute } from "next";

// An explicit scoped metadata route avoids adding a manifest link to the landing page.
const manifest: MetadataRoute.Manifest = {
  id: "/app/",
  name: "Lucen — Your money, understood.",
  short_name: "Lucen",
  description: "A calmer view of your money.",
  lang: "en-IN",
  start_url: "/app/",
  scope: "/app/",
  display: "standalone",
  background_color: "#FFFFFF",
  theme_color: "#FFFFFF",
  icons: [{ src: "/lucen-app-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
};

export function GET() {
  return Response.json(manifest, { headers: { "Content-Type": "application/manifest+json" } });
}
