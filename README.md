# BLACKWOOD - Die Ewige Schleife (Statische Version)

Dies ist die statische HTML/CSS/JavaScript Version des BLACKWOOD Text-Adventure Spiels.

## Dateien

- **index.html** - Haupteinstiegspunkt des Spiels
- **data/story.json** - Alle Szenen und Spieldaten als JSON
- **data/items.json** - Namen, Beschreibungen und Icons der Items als JSON
- **js/game.js** - Spiellogik Engine und UI Renderer (vanilla JavaScript)
- **css/site.css** - Hauptstil und Horror-Theme
- **css/ending.css** - Spezielle Stile für die Ending-Szenen
- **lib/** - Bootstrap und andere Bibliotheken (aus wwwroot kopiert)
- **img/** - Grafiken und Bilder

## Funktionsweise

Das Spiel funktioniert vollständig im Browser ohne Backend oder Datenbank:

1. **GameEngine** - Verwaltet den Spielzustand, Szenen und Statistiken
2. **UIRenderer** - Rendert die aktuelle Szene und Optionen dynamisch
3. **localStorage** - Speichert den Spielfortschritt lokal
4. **Service Worker** - Speichert die statischen Dateien nach dem ersten Laden für die Offline-Nutzung

## Spielstart

Starten Sie im Projektordner einen lokalen Webserver, zum Beispiel:

```powershell
python -m http.server 8000
```

Öffnen Sie anschließend `http://localhost:8000` im Browser. Ein Webserver ist nötig,
damit der Browser die Story aus `data/story.json` laden kann.

## Unterschied zur ASP.NET Version

- **Keine Backend-Abhängigkeit** - Läuft komplett im Browser und benötigt nur einen statischen Webserver
- **Keine Datenbank** - Alle Story-Daten liegen in einer einfachen JSON-Datei
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

