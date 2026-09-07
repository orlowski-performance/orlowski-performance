# Orlowski Performance

Website und Datenbasis für Sebastian Orlowski, Performance Coach in Düsseldorf.
Eigenständiges Projekt — ausdrücklich **nicht** Teil des Contaxx-Portals, weder
technisch noch in der Außenwirkung.

## Konten und Zuständigkeiten

Drei getrennte Konten, die nichts miteinander zu tun haben. Das ist Absicht.

| Dienst   | Konto                                        | Zugriff aus Sessions                    |
| -------- | -------------------------------------------- | --------------------------------------- |
| GitHub   | Org `orlowski-performance`                   | über die Claude-App der Org             |
| Supabase | Org `Orlowski129's Org`, Ref `xfrcubunbachooolccbi`, `eu-west-1` | nur über Access Token, **nicht** über den MCP-Connector — der hängt an Contaxx |
| Vercel   | eigenes Konto, Hobby-Tarif                   | gar nicht — Vercel macht der Betreiber selbst |

Vercel-Mitglieder gibt es erst ab Pro. Deployments laufen ohnehin automatisch
bei jedem Push; Environment-Variablen setzt der Betreiber von Hand, Logs
kopiert er bei Bedarf ins Gespräch. Nicht anbieten, das zu übernehmen.

Hinweis für später: Vercels Hobby-Tarif ist auf nicht-kommerzielle Nutzung
beschränkt. Spätestens zum Livegang mit eigener Domain wird Pro fällig.

## Namenskonvention für Umgebungsvariablen

**Kontoweite Geheimnisse bekommen das Projektkürzel `_OP` als Suffix**, damit in
einer Umgebung mehrere Projekte nebeneinander liegen können, ohne sich zu
überschreiben:

```
SUPABASE_ACCESS_TOKEN_OP=sbp_v0_...
```

Die Supabase-CLI liest ausschließlich `SUPABASE_ACCESS_TOKEN`. Beim Aufruf also
voranstellen:

```bash
SUPABASE_ACCESS_TOKEN=$SUPABASE_ACCESS_TOKEN_OP supabase db push
```

**Anwendungsvariablen behalten ihre exakten Namen** — die stehen so im Code, ein
Suffix bricht den Build:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
```

## Geheimnisse

- Nichts davon ins Repo. `.env.local` ist ignoriert, `.env.example` enthält nur Namen.
- Der anon key ist öffentlich und gehört ins Browser-Bundle. Er ist ohne die
  RLS-Regeln wertlos — deshalb wird an den Regeln nichts gelockert.
- Der Service-Role-Key umgeht RLS. Niemals mit `NEXT_PUBLIC_` präfixen, niemals
  an Vercel-Client-Variablen, niemals in ein Log.
- Access Token nur in die Umgebung, nie zu Vercel. Er kann Projekte löschen.

## Datenbank

`public.leads` nimmt die Kontaktanfragen auf. RLS ist aktiv: `anon` darf
einfügen, lesen dürfen nur angemeldete Nutzer. Nach jeder Schemaänderung an
dieser Tabelle gegenprüfen, dass anonymes Lesen weiterhin eine leere Liste
liefert — nicht nur, dass die Policy existiert.

Migrationen liegen in `supabase/migrations/` und sind die Wahrheit. Änderungen
direkt im Supabase-Editor gehen bei der nächsten Migration verloren.

## Inhalte

Alle Texte auf der Startseite sind mit `TODO(Sebastian)` markierte Platzhalter
und warten auf seine eigenen Formulierungen.

**Keine erfundenen Belege.** Keine Referenzen, keine Zahlen, keine Fallbeispiele,
keine Aussagen über seine Qualifikation, die nicht von ihm kommen. Ein leerer
Beweis-Abschnitt ist besser als ein ausgedachter. Das gilt auch für scheinbar
harmlose Platzhalter wie „über 100 zufriedene Kunden".

Impressum und Datenschutzerklärung sind Entwürfe mit Platzhaltern. Beide sind
vor dem Livegang zu vervollständigen und rechtlich prüfen zu lassen. Ein
unvollständiges Impressum ist abmahnfähig.

Sebastian arbeitet parallel an seiner bestehenden Seite. Befunde zum Ist-Zustand
stammen aus einer Analyse vom August 2026 und sind vor jeder Wiederverwendung
neu zu messen.

## Arbeitsweise

- **Es wird immer direkt nach `main` gepusht.** So hat der Betreiber es festgelegt;
  Vercel deployt daraus die Produktion. Keine Feature-Branches, keine Pull Requests,
  solange niemand anderes mitarbeitet.
- Vor jedem Push: `npm run build` muss durchlaufen. Der Build prüft Typen und Lint mit.
- Stammdaten stehen zentral in `src/lib/site.ts`, nicht verstreut in den Seiten.
