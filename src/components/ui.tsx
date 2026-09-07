import Link from "next/link";

export function Section({
  children,
  soft = false,
  labelledBy,
}: {
  children: React.ReactNode;
  soft?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={`border-b border-line ${soft ? "bg-paper-soft" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6 py-section">{children}</div>
    </section>
  );
}

export function Cta({ children = "Kostenloses Erstgespräch anfragen" }: { children?: React.ReactNode }) {
  return (
    <Link
      href="/kontakt"
      className="inline-block rounded-full bg-brand px-7 py-3 font-semibold text-paper transition-colors hover:bg-brand-dark"
    >
      {children}
    </Link>
  );
}

/**
 * Sichtbare Kennzeichnung für Inhalte, die noch fehlen.
 *
 * Absichtlich auffällig: Die Analyse hat einen unbemerkt stehengebliebenen
 * Platzhalter im FAQ als kritischen Befund geführt - direkt über zwei
 * Bezahlknöpfen. Ein Platzhalter, den man übersieht, ist genau das Problem.
 */
export function Platzhalter({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-brand bg-brand-soft p-4 text-sm text-muted">
      <strong className="font-semibold text-ink">Platzhalter · </strong>
      {children}
    </p>
  );
}
