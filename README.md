# Orlowski Performance

Website und Datenbasis für **Orlowski Performance** – Performance Coaching,
Sebastian Orlowski, Düsseldorf.

Next.js (App Router) auf Vercel, Daten in Supabase.

## Stack

| Bereich    | Wahl                                   |
| ---------- | -------------------------------------- |
| Framework  | Next.js 15, App Router, TypeScript      |
| Styling    | Tailwind CSS 4                          |
| Daten      | Supabase (Postgres, RLS)                |
| Hosting    | Vercel                                  |

## Lokal starten

```bash
npm install
cp .env.example .env.local   # Werte aus dem Supabase-Projekt eintragen
npm run dev
```

`.env.local` wird nicht eingecheckt. Der `SUPABASE_SERVICE_ROLE_KEY` gehört
niemals in eine Variable mit `NEXT_PUBLIC_`-Präfix und niemals ins Repository.

## Datenbank

Migrationen liegen in `supabase/migrations/` und werden über die Supabase CLI
eingespielt:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

`public.leads` nimmt die Kontaktanfragen auf. Row Level Security ist aktiv:
Einfügen darf der anonyme Client, Lesen nur angemeldete Nutzer.

## Deployment

Jeder Push auf `main` deployt nach Produktion, jeder Branch bekommt eine
Preview-URL. In den Vercel-Projekteinstellungen müssen dieselben Variablen
gesetzt sein wie in `.env.example` – für Preview und Production getrennt.

## Offene Punkte vor dem Livegang

- [ ] Texte auf der Startseite ersetzen (alle `TODO(Sebastian)` in `src/`)
- [ ] Stammdaten in `src/lib/site.ts` vervollständigen (Anschrift, Telefon, E-Mail)
- [ ] Impressum vervollständigen – unvollständig ist es abmahnfähig
- [ ] Datenschutzerklärung anwaltlich prüfen lassen
- [ ] Porträt und Bildmaterial in Web-Formaten bereitstellen (kein HEIC)
- [ ] Benachrichtigung bei neuer Anfrage einrichten (E-Mail oder Supabase-Trigger)
- [ ] Domain `orlowski-performance.com` auf Vercel zeigen lassen
