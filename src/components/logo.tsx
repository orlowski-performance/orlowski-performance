import Link from "next/link";

/**
 * Wortmarke nach Richtung A der Präsentation: Zeichen und Name zusammen,
 * getrennt durch eine senkrechte Linie.
 *
 * Das Zeichen ist als SVG gezeichnet und nicht als Bild eingebunden - damit ist
 * es bei jeder Größe scharf, wiegt nichts und lässt sich einfärben. Die alte
 * Seite lud dafür ein 2 MB großes Foto und zeigte es mit 44 Pixeln an.
 */
export function Logo({ invertiert = false }: { invertiert?: boolean }) {
  const strich = invertiert ? "#faf8f4" : "#57624b";
  const name = invertiert ? "text-papier" : "text-ink";
  const zusatz = invertiert ? "text-leise" : "text-leise";

  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Orlowski Performance, zur Startseite">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
        <g fill="none" stroke={strich} strokeWidth="5.5" strokeLinecap="round">
          <circle cx="32" cy="32" r="23.5" />
          <path d="M41 22.5c0-5.2-5.2-7.6-9.5-6.2-3.6 1.2-5.4 5-4.2 8.4 1 2.9 3.9 4.3 6.8 5.4 3.7 1.4 7.4 3 8.6 6.6 1.4 4.1-.8 8.6-5 10-4.6 1.5-10.1-1-10.1-6.4" />
        </g>
      </svg>
      <span className="hidden h-8 w-px bg-line sm:block" />
      <span className="leading-tight">
        <span className={`block text-[0.95rem] font-semibold tracking-[0.14em] ${name}`}>
          ORLOWSKI
        </span>
        <span className={`block text-[0.6rem] tracking-[0.2em] ${zusatz}`}>
          PERFORMANCE COACHING
        </span>
      </span>
    </Link>
  );
}
