import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { portfolio, siteUrl, assetPath, basePath } from "@/data/portfolio";
import { ExperienceProvider } from "@/components/experience";
import "./globals.css";

const display = localFont({ src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2", variable: "--font-display", display: "swap", weight: "300 700" });
const body = localFont({ src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", variable: "--font-body", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Prem — Software Engineer & Product Thinker",
  description: portfolio.description,
  applicationName: "Prem Portfolio",
  authors: [{ name: portfolio.name, url: portfolio.github }],
  keywords: ["Prem", "software engineer", "Melbourne", "Deakin University", "graduate developer", "React", "Node.js", "portfolio"],
  alternates: { canonical: `${siteUrl}${basePath}/` },
  openGraph: { type: "website", locale: "en_AU", url: `${siteUrl}${basePath}/`, siteName: "Prem — Engineered with intent", title: "Thoughtful code. Real-world impact. — Prem", description: portfolio.description, images: [{ url: assetPath("/og.png"), width: 1200, height: 630, alt: "Prem — Thoughtful code. Real-world impact. Software Engineering, Melbourne." }] },
  twitter: { card: "summary_large_image", title: "Prem — Thoughtful code. Real-world impact.", description: portfolio.description, images: [assetPath("/og.png")] },
  icons: { icon: [{ url: assetPath("/favicon.svg"), type: "image/svg+xml" }, { url: assetPath("/favicon-32.png"), sizes: "32x32", type: "image/png" }, { url: assetPath("/favicon.ico") }], apple: [{ url: assetPath("/apple-touch-icon.png"), sizes: "180x180" }] },
  manifest: assetPath("/site.webmanifest"),
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "dark light", themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0a0a0e" }, { media: "(prefers-color-scheme: light)", color: "#f5f4f0" }] };

// Run before paint to prevent a flash of the wrong saved theme. No external scripts.
const themeScript = `try{var t=localStorage.getItem('prem-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className={`${display.variable} ${body.variable}`}><a className="skip-link" href="#main">Skip to content</a><ExperienceProvider>{children}</ExperienceProvider></body></html>;
}
