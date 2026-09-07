import Image from "next/image";
import { site } from "@/lib/site";
import { Cta, CtaLeise } from "@/components/ui";

/** Nur zur Abstimmung. Wird nach der Entscheidung wieder entfernt. */
export const metadata = { robots: { index: false, follow: false } };

const varianten = [
  {
    id: "a",
    titel: "A · bis 62 %, weich",
    verlauf:
      "bg-gradient-to-b from-papier from-0% via-papier/65 via-32% to-transparent to-60% sm:bg-gradient-to-r sm:from-papier sm:from-0% sm:via-papier/70 sm:via-34% sm:to-transparent sm:to-62%",
    schleier: false,
  },
  {
    id: "b",
    titel: "B · bis 50 % plus leichter Schleier über der Textspalte",
    verlauf:
      "bg-gradient-to-b from-papier from-0% via-papier/60 via-26% to-transparent to-50% sm:bg-gradient-to-r sm:from-papier sm:from-0% sm:via-papier/60 sm:via-28% sm:to-transparent sm:to-50%",
    schleier: true,
  },
  {
    id: "c",
    titel: "C · bis 78 %, sehr weich",
    verlauf:
      "bg-gradient-to-b from-papier from-0% via-papier/70 via-38% to-transparent to-74% sm:bg-gradient-to-r sm:from-papier sm:from-0% sm:via-papier/75 sm:via-40% sm:to-transparent sm:to-78%",
    schleier: false,
  },
  {
    id: "d",
    titel: "D · bis 58 %, dazu ein zweiter Verlauf von unten",
    verlauf:
      "bg-gradient-to-b from-papier from-0% via-papier/65 via-30% to-transparent to-56% sm:bg-gradient-to-r sm:from-papier sm:from-0% sm:via-papier/68 sm:via-32% sm:to-transparent sm:to-58%",
    schleier: false,
    unten: true,
  },
] as const;

function Hero({ v }: { v: (typeof varianten)[number] }) {
  return (
    <section id={v.id} className="relative isolate overflow-hidden border-b border-line">
      <Image
        src="/bilder/kopfbild.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-center"
      />
      <div aria-hidden="true" className={`absolute inset-0 -z-20 ${v.verlauf}`} />
      {v.schleier && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-papier/55 from-0% via-papier/35 via-30% to-transparent to-52%"
        />
      )}
      {"unten" in v && v.unten && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-papier/70 to-transparent"
        />
      )}

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[34rem]">
          <p className="augenbraue">Personal Training &amp; Ernährung · {site.city}</p>
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
            Kostenlos und unverbindlich · {site.versprechen.antwortzeit} · aktuell{" "}
            {site.versprechen.freiePlaetze} freie Plätze
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HeroVarianten() {
  return (
    <>
      {varianten.map((v) => (
        <div key={v.id}>
          <p className="mx-auto max-w-6xl px-6 pt-8 pb-2 augenbraue">{v.titel}</p>
          <Hero v={v} />
        </div>
      ))}
    </>
  );
}
