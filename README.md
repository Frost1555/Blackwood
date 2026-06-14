# BLACKWOOD - Die Ewige Schleife (Statische Version)

Dies ist die statische HTML/CSS/JavaScript Version des BLACKWOOD Text-Adventure Spiels.

## Dateien

- **index.html** - Haupteinstiegspunkt des Spiels
- **js/game-data.js** - Alle Szenen und Spieldaten als JavaScript Objekte
- **js/game.js** - Spiellogik Engine und UI Renderer (vanilla JavaScript)
- **css/site.css** - Hauptstil und Horror-Theme
- **css/ending.css** - Spezielle Stile für die Ending-Szenen
- **lib/** - Bootstrap und andere Bibliotheken (aus wwwroot kopiert)
- **img/** - Grafiken und Bilder

## Funktionsweise

Das Spiel funktioniert vollständig im Browser ohne Server:

1. **GameEngine** - Verwaltet den Spielzustand, Szenen und Statistiken
2. **UIRenderer** - Rendert die aktuelle Szene und Optionen dynamisch
3. **localStorage** - Speichert den Spielfortschritt lokal

## Spielstart

Öffnen Sie einfach `index.html` in Ihrem Browser. Das Spiel lädt automatisch.

## Unterschied zur ASP.NET Version

- **Keine Server-Abhängigkeit** - Läuft komplett im Browser
- **Keine Datenbank** - Alle Daten sind im JavaScript eingebettet
- **Statische Dateien** - Kann überall gehostet werden (GitHub Pages, etc.)
- **Lokaler Speicher** - Spielfortschritt wird im Browser-localStorage gespeichert (wird bei Browserbereinigung gelöscht)

## Zusätzliche Features

- ✅ Vollständige Horror-Atmosphäre mit CSS Animationen
- ✅ Glitch-Effekte auf dem Titel
- ✅ Dynamische Statistik-Anzeige
- ✅ Unterschiedliche Ending-Szenen (Victory/Defeat/Neutral)
- ✅ Optionen mit Stat-Anforderungen (gesperrt, wenn nicht erfüllt)
- ✅ Responsive Design für Mobile Geräte

---

