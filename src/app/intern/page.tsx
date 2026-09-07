import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/login/actions";

export const metadata: Metadata = {
  title: "Interner Bereich",
  robots: { index: false, follow: false },
};

/** Immer frisch laden - Anfragen von gestern sind hier wertlos. */
export const dynamic = "force-dynamic";

const PAKET: Record<string, string> = {
  "3-monate": "3 Monate",
  "6-monate": "6 Monate",
  unentschieden: "unentschieden",
};
const START: Record<string, string> = {
  sofort: "so bald wie möglich",
  "innerhalb-1-monat": "innerhalb eines Monats",
  spaeter: "später",
};

/**
 * Interner Bereich: Bewerbungen und Kontaktanfragen.
 *
 * Die Middleware haelt Nicht-Angemeldete fern. Was hier tatsaechlich sichtbar
 * ist, entscheidet aber die Datenbank: Ohne die Rolle staff liefern beide
 * Abfragen eine leere Liste. Die Zugriffskontrolle liegt in der Policy, nicht
 * in dieser Datei.
 */
export default async function InternPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?weiter=/intern");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  const istStaff = profile?.role === "staff";

  const [{ data: applications }, { data: leads }] = await Promise.all([
    supabase
      .from("applications")
      .select("id, created_at, name, email, phone, goal, situation, constraints, availability, package, start_window, message, handled_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("leads")
      .select("id, created_at, name, email, message, handled_at")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-section">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Interner Bereich</h1>
          <p className="mt-2 text-sm text-muted">
            Angemeldet als {profile?.full_name ?? user.email} · Rolle{" "}
            {profile?.role ?? "unbekannt"}
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-line px-5 py-2 text-sm font-medium hover:bg-paper-soft"
          >
            Abmelden
          </button>
        </form>
      </div>

      {!istStaff && (
        <p className="mt-8 rounded-lg border border-line bg-paper-soft p-4 text-sm">
          Dieses Konto hat nicht die Rolle <code>staff</code> und sieht deshalb
          keine Vorgänge. Die Rolle wird in der Tabelle <code>profiles</code> gesetzt.
        </p>
      )}

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Bewerbungen{" "}
        <span className="text-base font-normal text-muted">
          ({applications?.length ?? 0})
        </span>
      </h2>
      {istStaff && applications?.length === 0 && (
        <p className="mt-4 text-muted">Noch keine Bewerbungen eingegangen.</p>
      )}
      <ul className="mt-6 space-y-4">
        {applications?.map((a) => (
          <li key={a.id} className="rounded-xl border border-line p-5">
            <Kopf name={a.name} email={a.email} datum={a.created_at} erledigt={a.handled_at} />
            <dl className="mt-4 space-y-3 text-sm">
              <Feld label="Ziel">{a.goal}</Feld>
              <Feld label="Heute">{a.situation}</Feld>
              <Feld label="Einschränkungen">{a.constraints}</Feld>
              <Feld label="Zeit pro Woche">{a.availability}</Feld>
              <Feld label="Paket">{a.package ? PAKET[a.package] : null}</Feld>
              <Feld label="Start">{a.start_window ? START[a.start_window] : null}</Feld>
              <Feld label="Telefon">{a.phone}</Feld>
              <Feld label="Anmerkung">{a.message}</Feld>
            </dl>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-2xl font-semibold tracking-tight">
        Kontaktanfragen{" "}
        <span className="text-base font-normal text-muted">({leads?.length ?? 0})</span>
      </h2>
      {istStaff && leads?.length === 0 && (
        <p className="mt-4 text-muted">Noch keine Anfragen eingegangen.</p>
      )}
      <ul className="mt-6 space-y-4">
        {leads?.map((l) => (
          <li key={l.id} className="rounded-xl border border-line p-5">
            <Kopf name={l.name} email={l.email} datum={l.created_at} erledigt={l.handled_at} />
            <p className="mt-3 whitespace-pre-line">{l.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Kopf({
  name,
  email,
  datum,
  erledigt,
}: {
  name: string;
  email: string;
  datum: string;
  erledigt: string | null;
}) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-semibold">{name}</p>
        <time dateTime={datum} className="text-sm text-muted">
          {new Date(datum).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" })}
        </time>
      </div>
      <p className="mt-1 text-sm text-muted">
        <a href={`mailto:${email}`} className="underline">
          {email}
        </a>
        {erledigt && " · erledigt"}
      </p>
    </>
  );
}

/** Leere Felder werden weggelassen statt als „—" angezeigt. */
function Feld({ label, children }: { label: string; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <div className="grid gap-1 sm:grid-cols-[10rem_1fr]">
      <dt className="font-medium text-muted">{label}</dt>
      <dd className="whitespace-pre-line">{children}</dd>
    </div>
  );
}
