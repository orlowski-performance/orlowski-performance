# Gestaltungsvorgaben

Verbindliche Werte für dieses Projekt. Quelle ist der Entwurf aus Teil 3 der
Website-Analyse (August 2026), in zwei Fassungen:

- **Artefakt** – `claude.ai/code/artifact/76f5027e-be2d-4222-a004-eea0dfd1772f`
  Enthält die Anzeigeschrift als eingebettete woff2 und das vollständige CSS.
- **Speicher-Fassung** – Contaxx-Portal, Bucket `portal-assets`, Pfad
  `praesentationen-live/orlowski/index.html` (Stand 2. September 2026).

Beide Fassungen unterscheiden sich in Kleinigkeiten. Bei Abweichungen gilt das
Artefakt, weil dort die Schrift mitgeliefert wird.

## Farben

| Rolle | Wert | Verwendung |
| --- | --- | --- |
| Salbei | `#57624B` | Hausfarbe: Knöpfe, Zeichen, Akzente |
| Salbei hell | `#7A8A66` | zweite Ebene |
| Salbei licht | `#A8B79A` | Flächen, Diagramme |
| Salbei wash | `#E7EBE1` | eingefärbte Flächen, Marken |
| Salbei Linie | `#DDE3D3` | Linien auf eingefärbtem Grund |
| Papier | `#FAF8F4` | Seitenhintergrund – **nicht** Reinweiß |
| Karte | `#FFFFFF` | Karten und erhabene Flächen |
| Sanft | `#F1EEE7` | abgesetzte Abschnitte |
| Linie | `#E4E0D6` | Trennlinien |
| Ink | `#1E1E1C` | Fließtext, Fußbereich |
| Muted | `#55534C` | Nebentext |
| Leise | `#8A8778` | Augenbrauen, Bildunterschriften |
| Alarm | `#A5442F` | Fehler, kritische Befunde |
| Warnung | `#8A6A24` | Platzhalter-Kennzeichnung |

Schatten: `0 1px 2px rgba(30,30,28,.05), 0 10px 30px rgba(30,30,28,.07)`

## Schrift

| Rolle | Schrift |
| --- | --- |
| Überschriften | **Fraunces**, Schnitt 600. Ausweich: `Georgia, "Iowan Old Style", "Times New Roman", serif` |
| Fließtext | System-Sans: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` |
| Technisches, Augenbrauen | `ui-monospace, "SF Mono", Consolas, monospace` |

Überschriften: Zeilenhöhe `1.14`, Laufweite `-0.018em`, `text-wrap: balance`.
Augenbraue über Überschriften: 0,7 rem, Laufweite `0.16em`, Versalien, Farbe Leise.

Fraunces kommt über `next/font/google` und wird zur Bauzeit neben die Seite
gelegt. Zur Laufzeit geht keine Anfrage an Google, und der Text springt nicht
nach. Keine weiteren Schriftdateien laden – die Vorgängerseite scheiterte an
35 MB Ladegewicht.

## Logo

Anordnung nach **Richtung A** (Zeichen und Wortmarke nebeneinander, getrennt
durch eine senkrechte Linie), Zeichen nach **Richtung B** (SO-Monogramm ohne
Ring, S und O in einer durchgehenden Bewegung).

Das Zeichen liegt nirgends als Vektor vor – weder in der Präsentation noch im
Artefakt, dort sind alle Bilder Rastergrafiken. `src/components/logo.tsx`
enthält eine **Nachzeichnung, keine Reinzeichnung**. Vor Druck und Briefbogen
gehört ein Grafiker darüber; das steht als Punkt 8 im Fahrplan der Analyse.

Nötige Favicon-Größen laut Analyse: 16, 32, 180 und 512 px.

## Bildwelt

Vorgabe aus Teil 5 der Analyse: ruhig, hell, alltagsnah, **ohne
Hochglanz-Fitnessstudio**. Serie statt Einzelbilder – gleiches Licht, gleiche
Farben, gleiche Ruhe. Teilen-Bild in 1200 × 630 px.

Alle Bilder in `public/bilder/` sind **KI-erzeugt** und nach Art. 50 EU-KI-VO
als solche zu behandeln:

| Datei | Herkunft | Status |
| --- | --- | --- |
| `kopfbild.webp` | Gemini, 2026-09-07, nach diesen Vorgaben erzeugt | Kopfbereich |
| `kopfbild-alternative.webp` | dieselbe Sitzung, Läuferin weiter links | Alternative |
| `kopfbild-ohne-person.webp` | dieselbe Sitzung, ohne Personen | Alternative |
| `training/ernaehrung/betreuung/alltag.webp` | aus der Präsentation | Vorlage fürs Shooting |
| `portraet-platzhalter.webp` | aus der Präsentation | **zeigt nicht Sebastian Orlowski** |

Die abgebildeten Menschen existieren nicht. Sie dürfen nie als Sebastian oder
als seine Kundinnen erscheinen. Das Porträt ist auf der Seite sichtbar als
Platzhalter gekennzeichnet; diese Kennzeichnung bleibt, solange das Bild dort
steht.

## Aufbau der Startseite

Reihenfolge aus dem Entwurf, nicht verhandelbar ohne Grund:

1. Kopfbereich – Ort und Leistung in der Überschrift, ein Hauptknopf
2. Vertrauensleiste – vier Punkte
3. Vier Bereiche – Training, Ernährung, Betreuung, Alltag
4. Ergebnisse – vor dem Angebot, nicht danach
5. Über mich
6. Einzugsgebiet
7. Abschluss mit Handlungsaufruf

Die drei Korrekturen gegenüber der alten Seite: Ort und Leistung stehen in der
Überschrift, die Zielgruppe steht oben statt in FAQ-Frage 2 von 17, und es gibt
einen Handlungsaufruf statt drei nebeneinander.
