import Link from "next/link";

export function Section({
  children,
  ton = "papier",
  labelledBy,
}: {
  children: React.ReactNode;
  ton?: "papier" | "sanft" | "karte";
  labelledBy?: string;
}) {
  const hintergrund = { papier: "bg-papier", sanft: "bg-sanft", karte: "bg-karte" }[ton];
  return (
    <section aria-labelledby={labelledBy} className={hintergrund}>
      <div className="mx-auto max-w-6xl px-6 py-section">{children}</div>
    </section>
  );
}

/** Augenbraue und Überschrift, wie im Entwurf immer als Paar. */
export function Titel({
  augenbraue,
  id,
  children,
  lead,
}: {
  augenbraue: string;
  id: string;
  children: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <header className="max-w-2xl">
      <p className="augenbraue">{augenbraue}</p>
      <h2 id={id} className="mt-3 text-3xl sm:text-4xl">
        {children}
      </h2>
      {lead && <p className="mt-4 text-muted">{lead}</p>}
    </header>
  );
}

export function Cta({
  children = "Unverbindlich bewerben",
  href = "/bewerbung",
}: {
  children?: React.ReactNode;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-block rounded-full bg-salbei px-6 py-3 text-sm font-semibold text-papier transition-colors hover:bg-ink"
    >
      {children}
    </Link>
  );
}

export function CtaLeise({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-full border border-line bg-karte px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-salbei"
    >
      {children}
    </Link>
  );
}

/**
 * Sichtbare Kennzeichnung für Inhalte, die noch fehlen oder erfunden sind.
 *
 * Auffällig mit Absicht: Der vierte kritische Befund der Analyse war ein
 * übersehener Platzhalter über zwei Bezahlknöpfen. Ein Platzhalter, den man
 * übersieht, ist genau das Problem.
 */
export function PlatzhalterMarke() {
  return (
    <span className="rounded bg-[#FBF1DF] px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.12em] text-[#8A6A24]">
      PLATZHALTER
    </span>
  );
}

export function Platzhalter({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-salbei-line bg-salbei-wash p-4 text-sm text-muted">
      <PlatzhalterMarke />{" "}
      <span className="align-middle">{children}</span>
    </p>
  );
}
