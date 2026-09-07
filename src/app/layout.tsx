import type { Metadata } from "next";
import Link from "next/link";
import { site, servicePages } from "@/lib/site";
import { JsonLd, localBusinessJsonLd } from "@/lib/seo";
import { Logo } from "@/components/logo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Personal Training ${site.city} – ${site.name}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: `Personal Training ${site.city} – ${site.name}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:m-3 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-papier"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}

const hauptnavigation = servicePages.filter((p) =>
  ["personal-training-duesseldorf", "ernaehrungsberatung-duesseldorf", "coaching-fuer-frauen", "preise", "ergebnisse"].includes(p.slug),
);

function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-papier/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Logo />

        <nav aria-label="Hauptnavigation" className="flex items-center gap-5">
          <ul className="hidden gap-6 text-sm lg:flex">
            {hauptnavigation.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="text-muted hover:text-ink">
                  {p.nav}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auf schmalen Geräten zusammengefaltet - reines HTML, kein Zustand. */}
          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-line px-4 py-2 text-sm">
              Menü
            </summary>
            <ul className="absolute right-0 z-30 mt-2 w-64 rounded-xl border border-line bg-karte p-2 shadow-karte">
              {servicePages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="block rounded-lg px-3 py-2 text-sm hover:bg-sanft">
                    {p.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <Link
            href="/bewerbung"
            className="rounded-full bg-salbei px-5 py-2.5 text-sm font-semibold text-papier transition-colors hover:bg-ink"
          >
            Unverbindlich bewerben
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-ink text-papier">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <Logo invertiert />
          <p className="mt-4 max-w-xs text-sm text-leise">
            Persönliches 1:1-Coaching für Training, Ernährung und nachhaltige
            Routinen. {site.city}.
          </p>
        </div>

        <div>
          <p className="augenbraue">Kontakt</p>
          <ul className="mt-3 space-y-2 text-sm text-leise">
            <li>{site.contact.email}</li>
            <li>{site.contact.phone}</li>
            <li>Instagram: {site.contact.instagram}</li>
          </ul>
        </div>

        <div>
          <p className="augenbraue">Rechtliches</p>
          <ul className="mt-3 space-y-2 text-sm text-leise">
            <li>
              <Link href="/impressum" className="hover:text-papier">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-papier">Datenschutzerklärung</Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-papier">Kontakt</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-papier">Anmelden</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-leise">
          © {new Date().getFullYear()} {site.name} · {site.serviceArea.join(" · ")}
        </p>
      </div>
    </footer>
  );
}
