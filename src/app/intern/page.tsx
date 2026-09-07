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

/**
 * Interner Bereich: eingegangene Kontaktanfragen.
 *
 * Die Middleware haelt Nicht-Angemeldete fern. Was hier tatsaechlich sichtbar
 * ist, entscheidet aber die Datenbank: Ohne die Rolle staff liefert die Abfrage
 * eine leere Liste, auch wenn jemand die Seite erreicht. Die Zugriffskontrolle
 * liegt damit nicht in der Oberflaeche, sondern in der Policy.
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

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, created_at, name, email, message, handled_at")
    .order("created_at", { ascending: false })
    .limit(100);

  const istStaff = profile?.role === "staff";

  return (
    <section className="mx-auto max-w-6xl px-6 py-section">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Kontaktanfragen</h1>
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
          keine Anfragen. Die Rolle wird in der Tabelle <code>profiles</code>
          gesetzt.
        </p>
      )}

      {error && (
        <p role="alert" className="mt-8 text-sm text-ink">
          Die Anfragen konnten nicht geladen werden: {error.message}
        </p>
      )}

      {istStaff && leads?.length === 0 && (
        <p className="mt-8 text-muted">Noch keine Anfragen eingegangen.</p>
      )}

      {leads && leads.length > 0 && (
        <ul className="mt-8 space-y-4">
          {leads.map((lead) => (
            <li key={lead.id} className="rounded-xl border border-line p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-semibold">{lead.name}</p>
                <time
                  dateTime={lead.created_at}
                  className="text-sm text-muted"
                >
                  {new Date(lead.created_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
              </div>
              <p className="mt-1 text-sm text-muted">
                <a href={`mailto:${lead.email}`} className="underline">
                  {lead.email}
                </a>
                {lead.handled_at && " · erledigt"}
              </p>
              <p className="mt-3 whitespace-pre-line">{lead.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
