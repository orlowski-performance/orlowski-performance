import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-section">
      <h1 className="text-3xl font-semibold tracking-tight">Impressum</h1>

      <h2 className="mt-10 text-lg font-semibold">Angaben gemäß § 5 DDG</h2>
      <p className="mt-3 text-muted">
        {site.owner}
        <br />
        {site.address.street}
        <br />
        {site.address.postalCode} {site.address.city}
      </p>

      <h2 className="mt-8 text-lg font-semibold">Kontakt</h2>
      <p className="mt-3 text-muted">
        Telefon: {site.contact.phone}
        <br />
        E-Mail: {site.contact.email}
      </p>

      <h2 className="mt-8 text-lg font-semibold">Umsatzsteuer-ID</h2>
      <p className="mt-3 text-muted">TODO – USt-IdNr. gemäß § 27 a UStG</p>

      <h2 className="mt-8 text-lg font-semibold">
        Verantwortlich für den Inhalt
      </h2>
      <p className="mt-3 text-muted">
        {site.owner}, Anschrift wie oben.
      </p>

      <h2 className="mt-8 text-lg font-semibold">Streitschlichtung</h2>
      <p className="mt-3 text-muted">
        Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <p className="mt-12 rounded-lg border border-line bg-paper-soft p-4 text-sm text-muted">
        Hinweis für die Redaktion: Diese Seite enthält Platzhalter. Anschrift,
        Telefonnummer, E-Mail und USt-IdNr. müssen vor dem Livegang durch die
        echten Angaben ersetzt werden (siehe <code>src/lib/site.ts</code>). Ein
        unvollständiges Impressum ist abmahnfähig.
      </p>
    </section>
  );
}
