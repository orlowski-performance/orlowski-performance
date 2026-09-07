import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false, follow: true },
};

/**
 * Die Analyse hatte die fehlende Datenschutzerklaerung als kritischen Befund
 * gefuehrt. Dieser Entwurf deckt ab, was die Seite technisch tatsaechlich tut:
 * Hosting bei Vercel und ein Kontaktformular, dessen Eingaben in Supabase
 * gespeichert werden. Kein Tracking, keine Cookies ausser den technisch
 * notwendigen.
 *
 * Rechtlich pruefen lassen, bevor die Seite oeffentlich geht - und erneut,
 * sobald Analytics, Newsletter oder Zahlungsanbieter dazukommen.
 */
export default function DatenschutzPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-section">
      <h1 className="text-3xl font-semibold tracking-tight">
        Datenschutzerklärung
      </h1>

      <h2 className="mt-10 text-lg font-semibold">1. Verantwortlicher</h2>
      <p className="mt-3 text-muted">
        {site.owner}, {site.address.street}, {site.address.postalCode}{" "}
        {site.address.city}, E-Mail: {site.contact.email}
      </p>

      <h2 className="mt-8 text-lg font-semibold">
        2. Hosting und Server-Logfiles
      </h2>
      <p className="mt-3 text-muted">
        Diese Website wird bei der Vercel Inc. gehostet. Beim Aufruf werden
        automatisch Zugriffsdaten verarbeitet (IP-Adresse, Zeitpunkt, abgerufene
        Seite, übertragene Datenmenge, Browsertyp). Rechtsgrundlage ist Art. 6
        Abs. 1 lit. f DSGVO; das berechtigte Interesse liegt im sicheren und
        stabilen Betrieb der Website.
      </p>

      <h2 className="mt-8 text-lg font-semibold">3. Kontaktformular</h2>
      <p className="mt-3 text-muted">
        Wenn du das Kontaktformular nutzt, werden Name, E-Mail-Adresse, dein
        Nachrichtentext und der Zeitpunkt der Absendung gespeichert, um deine
        Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO
        (deine Einwilligung) sowie Art. 6 Abs. 1 lit. b DSGVO, soweit die
        Anfrage auf einen Vertrag abzielt. Die Daten werden gelöscht, sobald die
        Anfrage abschließend bearbeitet ist und keine gesetzlichen
        Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2 className="mt-8 text-lg font-semibold">4. Auftragsverarbeiter</h2>
      <p className="mt-3 text-muted">
        Die Daten aus dem Kontaktformular werden in einer Datenbank der Supabase
        Inc. gespeichert (Serverstandort EU). Mit beiden Dienstleistern – Vercel
        und Supabase – besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28
        DSGVO.
      </p>

      <h2 className="mt-8 text-lg font-semibold">5. Cookies und Tracking</h2>
      <p className="mt-3 text-muted">
        Diese Website setzt keine Analyse- oder Marketing-Cookies und bindet
        keine Dienste Dritter zu Trackingzwecken ein.
      </p>

      <h2 className="mt-8 text-lg font-semibold">6. Deine Rechte</h2>
      <p className="mt-3 text-muted">
        Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16),
        Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
        Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Eine erteilte
        Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen.
        Außerdem steht dir ein Beschwerderecht bei einer Aufsichtsbehörde zu.
      </p>

      <p className="mt-12 rounded-lg border border-line bg-paper-soft p-4 text-sm text-muted">
        Hinweis für die Redaktion: Entwurf, keine Rechtsberatung. Vor dem
        Livegang anwaltlich prüfen lassen und bei jedem neuen Drittdienst
        (Analytics, Newsletter, Zahlungsanbieter, eingebettete Videos)
        aktualisieren.
      </p>
    </section>
  );
}
