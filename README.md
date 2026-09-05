# Subrosa — deine stimme, dein text

**[subrosa-voice.de](https://subrosa-voice.de)**

Subrosa nimmt auf, was du sagst, und macht daraus fertigen text. direkt in deine lieblings apps.

## so funktioniert's

1. drück 2 mal die leiser-taste — egal in welcher app
2. sprich los
3. drück noch 2 mal — dein text wird automatisch ins aktive textfeld eingefügt

## features

- **überall einsatzbereit** — whatsapp, notion, google docs, notiz-apps
- **multilingual** — erkennt die sprache automatisch, auch gemischt
- **barrierefrei** — einfachste bedienung ohne komplizierte menüs
- **zeit sparen** — sieh in deinen stats, wie viele stunden tippen du dir gespart hast

## early access

die app ist noch nicht im app store, aber bereits nutzbar. als early-access user bekommst du eine kostenlose testphase auf unbestimmte zeit mit bis zu 1.000 wörtern alle 3 stunden.

**[APK herunterladen (v0.8.0)](https://github.com/leonbubova/shush-app/releases/download/v0.8.0/shush-app-v0.8.0.apk)**

## desktop

Subrosa gibt's auch für mac und windows (early access, v0.1.0): rechte option-taste (windows: rechte alt-taste) halten, sprechen, loslassen. der text landet im aktiven textfeld. downloads im [release](https://github.com/leonbubova/shush-app-releases/releases/tag/desktop-v0.1.0).

## pricing

| plan | preis | |
|------|-------|-|
| reinschnuppern | 0 € | 3 tage volle funktion |
| Subrosa | 27 € / jahr | voller zugriff auf alle features |
| sonderwünsche | individuell | lass uns reden |

## tech

statische landingpage — HTML, CSS, JS. waitlist via Google Sheets + Apps Script (JSONP).

## Seiten und gemeinsame Komponenten

- `index.html`: Startseite, direkt hier bearbeiten.
- `fakten/index.html`: Faktenübersicht unter `/fakten/`, direkt hier bearbeiten.
- `fakten/loesungsfaelle/gespraeche-und-gedanken-festhalten/index.html`: erster Lösungsfall mit strukturiertem Problem, Zielgruppe, Lösung und Branchenbeispielen.
- `404.html`: Fehlerseite.
- `partials/header.html` und `partials/footer.html`: zentraler Header und Footer einschließlich rechtlicher Dialoge.
- `site.js`: lädt die Komponenten per JavaScript und initialisiert Navigation, rechtliche Dialoge und Jahreszahl. `script.js` enthält nur das Verhalten der Startseite.

Jede Seite existiert nur einmal. Es gibt keinen Build-Schritt. Änderungen an Header oder Footer werden direkt in den gemeinsamen HTML-Dateien vorgenommen.

Neue Seiten binden die Komponenten an der gewünschten Stelle ein:

```html
<div data-include="header"><a class="site-component-fallback" href="/">Subrosa</a></div>
<main><!-- Seiteninhalt --></main>
<div class="container">
  <div data-include="footer"><a class="site-component-fallback" href="/fakten/">fakten</a></div>
</div>
<script src="/site.js"></script>
```

Außerdem `/styles.css` und `/fonts.css` im Head einbinden. Interne Links und Ressourcen verwenden Pfade ab `/`. Ein Ordner mit `index.html` ergibt eine URL mit abschließendem Slash.

Für die Vorschau einen lokalen HTTP-Server am Projektroot verwenden (oder eine entsprechende IDE-Webvorschau). Direktes Öffnen über `file://` unterstützt das Nachladen per `fetch` nicht. Im Hosting müssen `partials/` und `site.js` mit ausgeliefert werden. Header und Footer benötigen JavaScript; die Seiteninhalte stehen direkt im HTML. Falls das Laden fehlschlägt, bleiben einfache Links zur Startseite und zur Faktenübersicht sichtbar.

Neue CSS-Regeln stehen in markierten Abschnitten am Ende von `styles.css`: `site-*` für gemeinsame Ergänzungen, `facts-*` für die Faktenübersicht und `case-*` für Lösungsfälle. Bei Produktänderungen Fakten, JSON-LD und Aktualisierungsdatum gemeinsam pflegen; neue öffentliche URLs außerdem in `sitemap.xml` aufnehmen.

Weitere Lösungsfälle unter `fakten/loesungsfaelle/<slug>/index.html` anlegen. Die erste Lösungsfallseite dient als Muster: Überblick mit Zielgruppe und Kontext, Problem und Ziel, Lösung und Ergebnis, Branchenbeispiele sowie Verweise auf die Funktionen. Beispiele einheitlich mit Zielgruppe, Situation, Informationslücke, Beispielinhalt, Einsatz von Subrosa und Zielzustand beschreiben. Titel, Canonical, Open Graph, JSON-LD und Breadcrumbs pro Seite anpassen und den Fall in der Faktenübersicht sowie der Sitemap ergänzen.
