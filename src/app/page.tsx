import Image from "next/image";
import Link from "next/link";
import { site, bereiche, trustPoints, stimmenPlatzhalter } from "@/lib/site";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { Section, Titel, Cta, CtaLeise, PlatzhalterMarke } from "@/components/ui";

/**
 * Startseite nach dem Entwurf aus Teil 3 der Präsentation.
 *
 * Reihenfolge, Texte, Farben und Bilder stammen aus dieser Vorlage, nicht aus
 * eigener Erfindung. Wo der Entwurf Platzhalter zeigt, bleiben sie Platzhalter.
 */

const faq = [
  {
    question: "Für wen ist das Coaching gedacht?",
    answer:
      "Für Menschen mit voller Woche, die ihren Körper verändern wollen – besonders berufstätige Frauen, die Beruf, Familie und Training zusammenbringen müssen.",
  },
  {
    question: "Findet das Coaching in Düsseldorf statt oder online?",
    answer:
      "Die Betreuung läuft über Telefon, Video und App und ist damit ortsunabhängig. Für ein persönliches Kennenlernen bin ich in Düsseldorf vor Ort.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Vertrauensleiste />
      <VierBereiche />
      <Ergebnisse />
      <UeberMich />
      <Einzugsgebiet />
      <Abschluss />
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}

function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <p className="augenbraue">
            Personal Training &amp; Ernährung · {site.city}
          </p>
          <h1 className="mt-4 max-w-[13ch] text-[2.4rem] sm:text-[2.9rem] lg:text-[3.1rem]">
            Persönliches 1:1-Coaching aus Düsseldorf – für Menschen, deren Woche
            schon voll ist.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">
            Training, Ernährung und Routinen, die sich deinem Alltag anpassen
            statt umgekehrt. Online betreut, mit wöchentlichen Check-ins und
            meiner persönlichen Telefonnummer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta />
            <CtaLeise href="/kontakt">Kennenlerngespräch anfragen</CtaLeise>
          </div>
          <p className="mt-5 text-sm text-leise">
            Kostenlos und unverbindlich · {site.versprechen.antwortzeit} ·
            aktuell {site.versprechen.freiePlaetze} freie Plätze
          </p>
        </div>

        {/* Kopfbild: Rheinturm im Morgenlicht. Damit ist die Ortsangabe
            erledigt, bevor der erste Satz gelesen ist - so steht es in der
            Analyse. Eigene Fläche statt Hintergrund: über einem Verlauf
            verliert das Bild seine Farben und die Skyline verschwindet. */}
        <Image
          src="/bilder/kopfbild.webp"
          alt="Läuferin auf der Rheinuferpromenade in Düsseldorf, im Hintergrund Rheinturm und Rheinkniebrücke im Morgenlicht"
          width={900}
          height={502}
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="w-full rounded-xl object-cover shadow-karte"
        />
      </div>
    </section>
  );
}

function Vertrauensleiste() {
  return (
    <section className="border-b border-line bg-karte">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {trustPoints.map((p) => (
          <li key={p.label} className="px-0 py-6 sm:px-6">
            <p className="font-serif text-xl">{p.label}</p>
            <p className="mt-1 text-sm text-muted">{p.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function VierBereiche() {
  return (
    <Section ton="sanft" labelledBy="bereiche">
      <Titel
        augenbraue="Was im Coaching enthalten ist"
        id="bereiche"
        lead="Kein Standardplan und keine Crash-Diät, sondern eine Betreuung, die alle vier Hebel zusammen denkt – und die jede Woche nachjustiert wird."
      >
        Vier Bereiche, ein System
      </Titel>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bereiche.map((b) => (
          <li key={b.titel} className="overflow-hidden rounded-xl bg-karte shadow-karte">
            <Image
              src={b.bild}
              alt=""
              aria-hidden="true"
              width={480}
              height={300}
              className="h-40 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg">{b.titel}</h3>
              <p className="mt-2 text-sm text-muted">{b.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Ergebnisse() {
  return (
    <Section labelledBy="ergebnisse">
      <Titel
        augenbraue="Ergebnisse"
        id="ergebnisse"
        lead="Der Abschnitt, der heute komplett fehlt – und der über den Abschluss entscheidet. Hier gehören echte Namen, echte Zahlen und echte Zeiträume hin."
      >
        Was Kundinnen und Kunden erreicht haben
      </Titel>

      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {stimmenPlatzhalter.map((s) => (
          <li key={s.initialen} className="rounded-xl border border-line bg-karte p-6">
            <div className="flex justify-end">
              <PlatzhalterMarke />
            </div>
            <blockquote className="mt-2 text-muted">{"\u201e"}{s.zitat}{"\u201c"}</blockquote>
            <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-salbei-wash text-xs font-semibold text-salbei">
                {s.initialen}
              </span>
              <span className="text-sm">
                <span className="block">{s.person}</span>
                <span className="block text-leise">{s.ort}</span>
              </span>
            </div>
            <p className="mt-4 text-sm font-medium">{s.ergebnis}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-2xl text-sm text-leise">
        Diese drei Stimmen sind erfundene Beispiele aus dem Entwurf. Sie zeigen
        den Aufbau des Abschnitts und werden vor dem Livegang durch echte
        Rückmeldungen ersetzt.
      </p>
    </Section>
  );
}

function UeberMich() {
  return (
    <Section ton="sanft" labelledBy="ueber-mich">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <figure className="relative">
          <Image
            src="/bilder/portraet-platzhalter.webp"
            alt="Platzhalterbild einer Person in einem hellen Raum"
            width={560}
            height={750}
            className="w-full rounded-xl object-cover"
          />
          <figcaption className="absolute left-4 top-4">
            <PlatzhalterMarke />
          </figcaption>
          <figcaption className="mt-3 text-sm text-leise">
            Vorlage für das Fotoshooting – die abgebildete Person ist nicht
            Sebastian Orlowski.
          </figcaption>
        </figure>

        <div>
          <p className="augenbraue">Über mich</p>
          <h2 id="ueber-mich" className="mt-3 text-3xl sm:text-4xl">
            {site.owner}
          </h2>
          <p className="mt-4 text-muted">
            Lizenzierter Fitnesstrainer und Ernährungsberater aus Düsseldorf. Ich
            begleite Menschen, die schon wissen, was sie verändern wollen – denen
            aber ein System fehlt, das zu einer vollen Woche passt.
          </p>
          <p className="mt-4 text-muted">
            Kein Standardplan, keine Extreme, kein anonymer Chat. Jede Planung,
            jede Auswertung und jede Rückmeldung kommt von mir persönlich.
            Deshalb ist die Zahl der Plätze begrenzt.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {site.qualifikationen.map((q) => (
              <li
                key={q}
                className="rounded-full bg-salbei-wash px-3 py-1.5 text-xs font-medium text-salbei"
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Einzugsgebiet() {
  return (
    <Section labelledBy="einzugsgebiet">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <Image
          src="/bilder/einzugsgebiet.webp"
          alt=""
          aria-hidden="true"
          width={900}
          height={502}
          className="w-full rounded-xl object-cover"
        />
        <div>
          <p className="augenbraue">Einzugsgebiet</p>
          <h2 id="einzugsgebiet" className="mt-3 text-3xl sm:text-4xl">
            Zuhause in Düsseldorf, betreut wird online
          </h2>
          <p className="mt-4 text-muted">
            Die Betreuung läuft über Telefon, Video und App – der Ort spielt für
            die Zusammenarbeit keine Rolle. Für ein persönliches Kennenlernen bin
            ich in Düsseldorf vor Ort.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>– Düsseldorf: Oberkassel, Pempelfort, Flingern, Bilk, Kaiserswerth</li>
            <li>– Umland: Neuss, Meerbusch, Ratingen, Erkrath</li>
            <li>– Bundesweit online, ortsunabhängig betreut</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Abschluss() {
  return (
    <Section ton="sanft">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl">Bereit, deinen Weg zu starten?</h2>
        <p className="mt-4 text-muted">
          Eine kurze Bewerbung, dann melde ich mich persönlich. Wir klären in
          einem Gespräch, ob das Coaching zu deinen Zielen passt – ohne
          Verpflichtung.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Cta />
          <Link
            href={site.contact.whatsapp}
            className="inline-block rounded-full border border-line bg-karte px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-salbei"
          >
            Direkt über WhatsApp schreiben
          </Link>
        </div>
      </div>
    </Section>
  );
}
