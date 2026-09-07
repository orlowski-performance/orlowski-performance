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
    email: "kontakt@orlowski-performance.com", // TODO(Sebastian): bestätigen
    phone: "0152 33509383",
    instagram: "sebastian_orl",
    // Von der bisherigen Seite übernommen.
    whatsapp:
      "https://wa.me/4915233509383?text=Hallo%20Sebastian%2C%20ich%20interessiere%20mich%20f%C3%BCr%20dein%20Coaching.",
  },
  address: {
    street: "TODO",
    postalCode: "TODO",
    city: "Düsseldorf",
    country: "DE",
  },
  /**
   * Aussagen aus dem Entwurf, die überprüfbar sein müssen, bevor die Seite live
   * geht. Eine Zahl freier Plätze, die nicht stimmt, ist eine Falschangabe.
   */
  versprechen: {
    antwortzeit: "Antwort innerhalb von 24 Stunden", // TODO(Sebastian): einhaltbar?
    freiePlaetze: 3, // TODO(Sebastian): aktuellen Stand eintragen oder Zeile entfernen
  },
  /** Qualifikationen. TODO(Sebastian): Lizenznamen, Verband und Jahr bestätigen. */
  qualifikationen: [
    "Fitnesstrainer B-Lizenz",
    "Ernährungsberater",
    "seit 2019 in der Betreuung",
    "Düsseldorf",
  ],

  /** Einzugsgebiet. Eigene Seiten dafür lohnen laut Analyse nicht - ein Absatz genügt. */
  serviceArea: ["Düsseldorf", "Neuss", "Meerbusch", "Ratingen"],
} as const;

/** Die vier Punkte der Vertrauensleiste unter dem Kopfbereich. */
export const trustPoints = [
  { label: "1:1", detail: "Persönlich betreut – keine Plattform, kein Chatbot." },
  { label: "Wöchentlich", detail: "Check-in, Auswertung und Anpassung." },
  { label: "Düsseldorf", detail: "Ansässig in Düsseldorf, betreut wird online." },
  { label: "Lizenziert", detail: "Fitnesstrainer und Ernährungsberater." },
] as const;

/** Die vier Bereiche aus dem Entwurf, mit den Bildern der Präsentation. */
export const bereiche = [
  {
    titel: "Training",
    bild: "/bilder/training.webp",
    text: "Individueller Plan für Studio, Zuhause oder beides. Regelmäßig angepasst an Zeit, Stand und Ziel.",
  },
  {
    titel: "Ernährung",
    bild: "/bilder/ernaehrung.webp",
    text: "Kalorien, Makros und ein Leitfaden mit Rezepten – flexibel statt starrer Essenspläne.",
  },
  {
    titel: "Betreuung",
    bild: "/bilder/betreuung.webp",
    text: "Wöchentliche Check-ins, Telefon- und Videogespräche, direkte Erreichbarkeit.",
  },
  {
    titel: "Alltag & Routinen",
    bild: "/bilder/alltag.webp",
    text: "Schlaf, Stress, Morgen- und Abendroutinen. Der Teil, an dem die meisten scheitern.",
  },
] as const;

/**
 * Kundenstimmen aus dem Entwurf der Präsentation.
 *
 * ACHTUNG: Erfundene Beispiele. Sie stehen hier, weil der Entwurf zeigt, wie
 * der Abschnitt aussehen soll - und sie werden auf der Seite sichtbar als
 * Platzhalter gekennzeichnet. Vor dem Livegang durch echte Stimmen ersetzen
 * oder den ganzen Abschnitt entfernen. Ungekennzeichnet stehen lassen ist
 * keine Option.
 */
export const stimmenPlatzhalter = [
  {
    zitat: "Zum ersten Mal habe ich einen Plan, der zu meinen Schichten passt statt gegen sie zu arbeiten.",
    initialen: "JK",
    person: "Julia, 34 · Pflegedienstleitung",
    ort: "Düsseldorf-Bilk",
    ergebnis: "~9 kg in 22 Wochen, Kraft gehalten",
  },
  {
    zitat: "Die wöchentlichen Check-ins sind der Grund, warum ich diesmal drangeblieben bin.",
    initialen: "MS",
    person: "Marie, 41 · Projektleiterin",
    ort: "Meerbusch",
    ergebnis: "3 Trainings pro Woche seit 8 Monaten",
  },
  {
    zitat: "Kein Verbotskatalog. Ich esse weiter mit meiner Familie – und es funktioniert trotzdem.",
    initialen: "TB",
    person: "Thomas, 38 · Außendienst",
    ort: "Neuss",
    ergebnis: "~12 kg, Blutdruckwerte im Normbereich",
  },
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
