/**
 * Stammdaten und Inhaltsverzeichnis der Seite.
 *
 * Grundlage ist die Website-Analyse vom August 2026: Positionierung nach vorn,
 * Ort in Titel und Überschrift, aus einer Seite werden sieben.
 *
 * TODO(Sebastian): Alles mit TODO ist Platzhalter und muss vor dem Livegang
 * durch echte Angaben ersetzt werden.
 */
export const site = {
  name: "Orlowski Performance",
  owner: "Sebastian Orlowski",
  role: "Personal Trainer & Coach",
  city: "Düsseldorf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Die eigentliche Zielgruppe. Stand heute versteckt in FAQ-Frage 2 von 17. */
  audience: "berufstätige Frauen",
  description:
    "Personal Training und Ernährungsberatung in Düsseldorf – 1:1-Coaching für berufstätige Frauen, das sich in eine volle Woche einfügt.",
  contact: {
    email: "TODO@orlowski-performance.com",
    phone: "TODO",
  },
  address: {
    street: "TODO",
    postalCode: "TODO",
    city: "Düsseldorf",
    country: "DE",
  },
  /** Einzugsgebiet. Eigene Seiten dafür lohnen laut Analyse nicht - ein Absatz genügt. */
  serviceArea: ["Düsseldorf", "Neuss", "Meerbusch", "Ratingen"],
} as const;

/** Die vier Punkte der Vertrauensleiste unter dem Kopfbereich. */
export const trustPoints = [
  { label: "1:1, nicht Gruppe", detail: "Jeder Plan entsteht für eine Person." },
  { label: "Training & Ernährung", detail: "Beides zusammen, nicht getrennt." },
  { label: "Für volle Wochen", detail: "Vier Einheiten sind kein Maßstab." },
  { label: "Düsseldorf & Umgebung", detail: "Vor Ort oder betreut online." },
] as const;

/**
 * Die Unterseiten aus dem Bauplan. Reihenfolge = Navigation.
 * `keyword` ist der Suchbegriff, auf den die Seite laut Analyse zielt.
 */
export const servicePages = [
  {
    slug: "personal-training-duesseldorf",
    nav: "Personal Training",
    title: "Personal Training Düsseldorf",
    keyword: "personal trainer düsseldorf",
    lead: "Training als Leistung: für wen, wie oft, im Studio oder zuhause, und was der Plan enthält.",
  },
  {
    slug: "ernaehrungsberatung-duesseldorf",
    nav: "Ernährungsberatung",
    title: "Ernährungsberatung Düsseldorf",
    keyword: "ernährungsberatung düsseldorf",
    lead: "Kalorien, Makros, Leitfaden, Vorkochen – ohne starren Plan, der nach zwei Wochen scheitert.",
  },
  {
    slug: "coaching-fuer-frauen",
    nav: "Coaching für Frauen",
    title: "Coaching für Frauen in Düsseldorf",
    keyword: "personal trainer für frauen düsseldorf",
    lead: "Die eigentliche Zielgruppe, endlich sichtbar: Alltagsbeispiele, Kundenstimmen, Bilder.",
  },
  {
    slug: "coaching-fuer-berufstaetige",
    nav: "Für Berufstätige",
    title: "Online Coaching für Berufstätige",
    keyword: "online coaching für berufstätige",
    lead: "Betreuung, die sich um Schichten, Reisen und Termine herum organisiert statt dagegen.",
  },
  {
    slug: "abnehmen-duesseldorf",
    nav: "Abnehmen",
    title: "Abnehmen in Düsseldorf",
    keyword: "abnehmen düsseldorf",
    lead: "Das häufigste Ziel, ohne Wunderversprechen: was realistisch ist und in welchem Zeitraum.",
  },
  {
    slug: "preise",
    nav: "Preise",
    title: "Preise",
    keyword: "personal trainer düsseldorf preise",
    lead: "Beide Pakete mit Gesamtpreis, Laufzeit und Kündigung – und was nicht enthalten ist.",
  },
  {
    slug: "ergebnisse",
    nav: "Ergebnisse",
    title: "Ergebnisse",
    keyword: "",
    lead: "Kundenstimmen und Verläufe mit echten Zahlen. Die Seite, die heute komplett fehlt.",
  },
] as const;

export type ServicePage = (typeof servicePages)[number];

export function findServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug);
}
