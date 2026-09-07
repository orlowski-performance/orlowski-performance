import type { Metadata } from "next";
import Link from "next/link";
import { site, servicePages } from "@/lib/site";
import { JsonLd, localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // Ort und Leistung im Titel - der alte Titel enthielt kein Wort, nach dem jemand sucht.
    default: `Personal Trainer ${site.city} – ${site.name}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: `Personal Trainer ${site.city} – ${site.name}`,
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
          className="sr-only focus:not-sr-only focus:absolute focus:m-3 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
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

function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>

        {/* Ab Tablet ausgeklappt, auf dem Handy zusammengefaltet.
            Reines HTML - kein Zustand, kein JavaScript, kein Sprung beim Laden. */}
        <nav aria-label="Hauptnavigation" className="flex items-center gap-4">
          <details className="relative sm:hidden">
            <summary className="cursor-pointer list-none rounded border border-line px-3 py-2 text-sm">
              Menü
            </summary>
            <ul className="absolute right-0 z-10 mt-2 w-64 rounded-lg border border-line bg-paper p-2 shadow-lg">
              {servicePages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="block rounded px-3 py-2 hover:bg-paper-soft">
                    {p.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <ul className="hidden gap-5 text-sm sm:flex">
            {servicePages.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="hover:text-brand-dark">
                  {p.nav}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/bewerbung"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-brand-dark"
          >
            Bewerben
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-soft">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-muted">
            {site.owner}
            <br />
            {site.role} · {site.city}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Leistungen</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {servicePages.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="hover:text-ink">
                  {p.nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Rechtliches</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            <li>
              <Link href="/kontakt" className="hover:text-ink">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/impressum" className="hover:text-ink">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-ink">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-ink">
                Anmelden
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-muted">
          Einzugsgebiet: {site.serviceArea.join(" · ")}
        </p>
      </div>
    </footer>
  );
}
