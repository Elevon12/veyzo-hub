# Veyzo Hub

Clean, fast tools built for gamers — Sensitivity Lab (eDPI), Storage Planner, Game Picker and FPS Estimator.
Static site (HTML, CSS, JavaScript), English and Persian, no build step, no backend.

**Live site:** https://elevon12.github.io/veyzo-hub/

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, SEO and social meta tags |
| `style.css` | All styling (supports RTL for Persian) |
| `script.js` | Language switch, search, and the four tools |
| `games.js` | Game library data (16 games) + generated cover art. Add a game by adding one line to `LIB`. |
| `extras.js` | Dashboard, Game Library, saved settings, animations |
| `extras2.js` | Live background, game pages (`#/game/<id>`), Sensitivity Converter, Download Time, profile + backup |
| `404.html` | Custom "page not found" page (GitHub Pages uses it automatically) |
| `favicon.svg`, `apple-touch-icon.png` | Site icons |
| `og-image.png` | Preview image when the link is shared |
| `manifest.webmanifest` | Lets the site be installed to a phone's home screen |
| `robots.txt`, `sitemap.xml` | Search-engine helpers |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Deploy

GitHub → Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Notes

- Language choice is saved in the browser (`localStorage`). You can force it with `?lang=fa` or `?lang=en`.
- The FPS Estimator is a simple heuristic, not a benchmark.
- Fonts (Inter, Vazirmatn) load from Google Fonts. To avoid that, download them and serve them from this repo with `@font-face`.

## Using your own cover images

Create a `covers` folder next to `index.html` and add images named after the game id, for example `covers/valorant.jpg`
(portrait, about 3:4, e.g. 600×800). The site shows your image automatically; games without an image keep the generated artwork.
The ids are the `id` values in `games.js` (`cs2`, `gta5`, `eldenring`, `bg3`, ...).
