/**
 * Zentrale Stammdaten der Seite.
 *
 * Alles, was in Impressum, Metadaten, Kontaktblock und strukturierten Daten
 * auftaucht, steht hier genau einmal. Aendert sich eine Telefonnummer, aendert
 * sie sich an einer Stelle.
 *
 * TODO(Sebastian): Die mit "TODO" markierten Werte sind Platzhalter und
 * muessen vor dem ersten oeffentlichen Deployment ersetzt werden.
 */
export const site = {
  name: "Orlowski Performance",
  owner: "Sebastian Orlowski",
  role: "Performance Coach",
  city: "Düsseldorf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Performance Coaching in Düsseldorf – Training, Ernährung und Belastungssteuerung für Menschen, die messbar besser werden wollen.",
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
} as const;

export type Site = typeof site;
