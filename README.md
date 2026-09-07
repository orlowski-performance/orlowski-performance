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

Projekt: **`orlowski-performance`**, Ref `xfrcubunbachooolccbi`, Region
`eu-west-1` (Irland).

Migrationen liegen in `supabase/migrations/` und werden über die Supabase CLI
eingespielt:

```bash
supabase link --project-ref xfrcubunbachooolccbi
supabase db push
```

`public.leads` nimmt die Kontaktanfragen auf, `public.profiles` hält je Konto
eine Rolle (`staff` oder `client`). Row Level Security ist aktiv: Einfügen darf
der anonyme Client, Lesen nur Konten mit der Rolle `staff`. Ein Trigger legt zu
jedem neuen Konto automatisch ein Profil an.

Zugänge werden in der Supabase-Oberfläche vergeben – es gibt bewusst keine
öffentliche Registrierung. Die Rolle `staff` wird danach von Hand gesetzt:

```sql
update public.profiles set role = 'staff' where id = '<user-uuid>';
```

## Deployment

Jeder Push auf `main` deployt nach Produktion, jeder Branch bekommt eine
Preview-URL. In den Vercel-Projekteinstellungen müssen dieselben Variablen
gesetzt sein wie in `.env.example` – für Preview und Production getrennt.

## Seitenplan

Aus der Analyse: aus einer Seite werden sieben. Alle Unterseiten liegen in
`src/app/[slug]/page.tsx` und werden aus `servicePages` in `src/lib/site.ts`
erzeugt – Adresse, Titel und Zielbegriff stehen dort, der Text fehlt noch.

| Adresse | Zielbegriff |
| ------- | ----------- |
| `/` | online coaching düsseldorf |
| `/personal-training-duesseldorf` | personal trainer düsseldorf |
| `/ernaehrungsberatung-duesseldorf` | ernährungsberatung düsseldorf |
| `/coaching-fuer-frauen` | personal trainer für frauen düsseldorf |
| `/coaching-fuer-berufstaetige` | online coaching für berufstätige |
| `/abnehmen-duesseldorf` | abnehmen düsseldorf |
| `/preise` | personal trainer düsseldorf preise |
| `/ergebnisse` | – |

## Offene Punkte vor dem Livegang

- [ ] Texte auf der Startseite ersetzen (alle `TODO(Sebastian)` in `src/`)
- [ ] Stammdaten in `src/lib/site.ts` vervollständigen (Anschrift, Telefon, E-Mail)
- [ ] Impressum vervollständigen – unvollständig ist es abmahnfähig
- [ ] Datenschutzerklärung anwaltlich prüfen lassen
- [ ] Porträt und Bildmaterial in Web-Formaten bereitstellen (kein HEIC)
- [ ] Benachrichtigung bei neuer Anfrage einrichten (E-Mail oder Supabase-Trigger)
- [ ] Texte der sieben Unterseiten schreiben
- [ ] Favicon in 16, 32, 180 und 512 px sowie Teilen-Bild 1200 × 630 px
- [ ] Logo-Richtung wählen und als SVG nachzeichnen lassen
- [ ] Domain `orlowski-performance.com` auf Vercel zeigen lassen
- [ ] `NEXT_PUBLIC_SITE_URL` auf die echte Domain umstellen
