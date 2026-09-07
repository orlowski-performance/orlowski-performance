import { site } from "./site";

/**
 * Strukturierte Daten.
 *
 * Die Analyse hatte zwei Lücken benannt: kein Eintrag als lokales Unternehmen
 * und 17 FAQ-Antworten ohne Auszeichnung. Beides wird hier bedient.
 */

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceArea.map((name) => ({ "@type": "City", name })),
    // TODO(Sebastian): telephone und email ergaenzen, sobald die Stammdaten stehen.
  };
}

export function faqJsonLd(entries: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/** Rendert JSON-LD. Der Inhalt stammt ausschliesslich aus eigenem Code, nie aus Nutzereingaben. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
