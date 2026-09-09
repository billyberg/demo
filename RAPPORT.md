# Konverteringsrapport

**Demo** · prototyp v3 · nivå: Aggressiv
Genererad 9 Sep 2026, 15:45 av Prototyp-feedback.

Det här är en **startpunkt**, inte färdig arkitektur. Läs igenom vad som gissades nedan.

## Kom igång

```bash
npm install
npm run dev
```

Kräver Node >=22.12.0. Kör `npm run build` innan du litar på resultatet – den fångar syntaxfel som dev-servern släpper förbi.

## Sidor

| Prototyp | Astro | Rutt |
|---|---|---|
| `index.html` | `src/pages/index.astro` | `/` |
| `tjanster.html` | `src/pages/tjanster.astro` | `/tjanster` |

## Komponenter

- **`Header.astro`** — från `index.html`
- **`HeaderTjanster.astro`** — från `tjanster.html`
- **`Hero.astro`** — från `index.html`
- **`Sektion.astro`** — från `index.html`
- **`SektionTjanster.astro`** — från `tjanster.html`
- **`Footer.astro`** — från flera sidor (`index.html`, `tjanster.html`), delad

## Upprepningar som blev loopar

Innehållet ligger som en array i frontmatter – ändra texten där i stället för i markupen.

- `rutor` i `Sektion` — 3 poster, fält: `rubrik`, `text`
- `rutor` i `SektionTjanster` — 4 poster, fält: `rubrik`, `text`

## Det här gick inte automatiskt

- Blocket `header.topp` skiljer sig strukturellt mellan sidorna, så det gick inte att göra till en enda komponent. En komponent per variant skapades (index.html | tjanster.html). Slå ihop dem för hand om de borde vara samma sak.
- Blocket `section.sektion` skiljer sig strukturellt mellan sidorna, så det gick inte att göra till en enda komponent. En komponent per variant skapades (index.html | tjanster.html). Slå ihop dem för hand om de borde vara samma sak.

## Val som gjordes

- Inbäddade `<style>` har fått `is:global` eftersom reglerna gällde hela sidan i prototypen. Utan det scopar Astro dem till komponenten.
- CSS behålls global – inga scoped styles per komponent. Kaskaden i en prototyp går sönder av scoping, så det är ett medvetet val.
- Med i exporten: en GitHub Actions-workflow som publicerar sajten på GitHub Pages vid varje push till main.

## Kända begränsningar

- Komponentgränser och fältnamn är **gissade**. Döp om det som blev fel.
- Ingen innehållsmodell: data ligger som arrayer i frontmatter, inte i Content Collections.
- Inline `<script>` har fått `is:inline` så beteendet blir exakt som i prototypen. Ta bort attributet om du hellre vill att Astro bundlar dem.
- Konverteringen är en engångsgrej. Ändrar du prototypen får du exportera på nytt – det skriver inte över det du byggt vidare på här.
