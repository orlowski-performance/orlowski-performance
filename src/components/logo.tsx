import Link from "next/link";

/**
 * Wortmarke: Anordnung nach Richtung A der Präsentation, Zeichen aus Richtung B.
 *
 * Das Zeichen ist als SVG nachgezogen und nicht als Bild eingebunden - damit ist
 * es bei jeder Größe scharf, wiegt nichts und lässt sich einfärben. Die alte
 * Seite lud dafür ein 2 MB großes Foto und zeigte es mit 44 Pixeln an.
 *
 * Es ist eine Nachzeichnung, keine Reinzeichnung: Die Vorlage existiert nur als
 * Pixelbild. Für Briefbogen und Druck sollte ein Grafiker noch einmal darüber
 * gehen - so steht es auch im Fahrplan der Analyse.
 */
export function Logo({ invertiert = false }: { invertiert?: boolean }) {
  const strich = invertiert ? "#faf8f4" : "#57624b";

  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="Orlowski Performance, zur Startseite"
    >
      <svg viewBox="0 0 132 91" className="h-8 w-auto shrink-0" aria-hidden="true">
        <g fill="none" stroke={strich} strokeWidth="13" strokeLinecap="butt">
          <circle cx="92" cy="48" r="34" />
          <path d="M47 27c-2-7-12-11-20-8-9 3-10 13-1 17 7 3 16 6 22 11 8 6 7 19-3 23-9 4-20 2-26-5" />
        </g>
      </svg>
      <span className={`hidden h-9 w-px sm:block ${invertiert ? "bg-white/20" : "bg-line"}`} />
      <span className="leading-tight">
        <span
          className={`block text-[0.95rem] font-semibold tracking-[0.16em] ${invertiert ? "text-papier" : "text-ink"}`}
        >
          ORLOWSKI
        </span>
        <span className="block text-[0.58rem] tracking-[0.22em] text-leise">
          PERFORMANCE COACHING
        </span>
      </span>
    </Link>
  );
}
