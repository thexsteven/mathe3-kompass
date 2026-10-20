# Mathe3 Kompass

Interaktiver Vorlesungsbegleiter für mehrdimensionale Differentialrechnung. Statisches HTML, CSS und JavaScript ohne externe Laufzeitabhängigkeiten.

## Lokal auf Windows

```powershell
git clone https://github.com/thexsteven/mathe3-kompass.git "C:\AIOS\Dev\studium\mathe3-kompass"
cd "C:\AIOS\Dev\studium\mathe3-kompass"
python -m http.server 4173
```

Danach http://localhost:4173 öffnen. Durch die serverrelativen Datei-Links die Anwendung über einen HTTP-Server ausliefern, nicht direkt mit file:// öffnen.

## Vercel

Projekt aus diesem Repo importieren, Branch `main`, Framework `Other`. Kein Build erforderlich. `vercel.json` liefert den Repository-Root aus. Produktionsseite soll ohne Vercel-Anmeldung erreichbar sein.

## Links und Unterlagen

- Themen, Notation und Rechenwege: interne Hash-Links.
- Skript: `/sources/skript.pdf`; `#page=N` springt in unterstützten PDF-Viewern zur passenden PDF-Seite. Zusätzlich gibt es einen Download-Link.
- Aufgaben: `/sources/uebung-1.pdf`, ebenfalls direkt lesbar und herunterladbar.
- Sechs Screenshots: `/sources/screenshot-0.png` bis `screenshot-5.png`.
- Es gibt keine Links auf ein privates ChatGPT-Konto, Moodle oder lokale Windows-Dateien.

Grundlagen: Heine, Angewandte Mathematik INF 3, 30-seitiges Skript, Übung 1 und die geteilten Lösungsansichten. Die Erklärungen sind didaktisch neu aufbereitet. Die Originalunterlagen bleiben ihren jeweiligen Rechteinhabern zugeordnet; es wird keine pauschale Open-Source-Lizenz für sie vergeben.

## Tests

`node --test verify.cjs`

Prüft numerische Rechenmodelle, Suchnotation, progressive Rechenschritte und Ziel-/Dateiintegrität. Merker und letzter Themenstand liegen nur im Browser des jeweiligen Besuchers.
