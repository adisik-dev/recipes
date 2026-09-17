# Recipe Site — Setup & Editing Guide

**Live site:** https://adisik-dev.github.io/recipes/

A free, static recipe website. No server, nothing exposed on your home network.

## One-time setup (GitHub Pages)

1. Go to https://github.com and create a free account if you don't have one.
2. Create a new repository:
   - Click **New repository**
   - Name it `recipes` (or anything you like)
   - Set it to **Public** (required for free GitHub Pages)
   - Don't initialize with a README (you already have files)
3. Upload these files to the repo. Easiest way without installing Git:
   - On the repo page, click **Add file → Upload files**
   - Drag in `index.html`, `style.css`, `app.js`, `recipes-data.js`, and the `recipes` folder
   - Commit the changes
4. Enable GitHub Pages:
   - Go to **Settings → Pages**
   - Under "Build and deployment", set **Source** to `Deploy from a branch`
   - Branch: `main`, folder: `/ (root)`
   - Save
5. Wait ~1 minute. Your site will be live at:
   `https://YOUR-USERNAME.github.io/recipes/`

That URL works from your phone or laptop, anywhere with internet — nothing is hosted on your home network.

## Adding a new recipe

1. Copy `recipes/_template.html` and rename it, e.g. `recipes/chicken-curry.html`.
2. Fill in the name, time, servings, ingredients, and steps. For tags, add one `<span class="recipe-tag" data-tag="Dinner">Dinner</span>` per tag inside `.recipe-tags` — the color is applied automatically, just make sure the tag text matches what you use in `recipes-data.js`.
3. Add an entry for it in `recipes-data.js` (this drives both the homepage list and search):
   ```js
   {
     title: "Chicken Curry",
     url: "recipes/chicken-curry.html",
     tags: ["Dinner"],
     time: "40 min"
   }
   ```
4. Upload the changed/new files to GitHub (drag-and-drop via **Add file → Upload files**, or `git push` if you set up Git locally).
5. Site updates automatically within about a minute.

## Hebrew recipes

Just write the recipe in Hebrew — no extra setup needed. Every content block (title, ingredients, steps, notes) uses `dir="auto"`, so it automatically displays right-to-left when the text is Hebrew, while the site header/navigation stays left-to-right. See `recipes/hummus.html` for a working example. Search also works fine with Hebrew text — try typing "חומוס" in the search box on the homepage.

If a recipe title in `recipes-data.js` is in Hebrew, it'll show and search correctly too (see the `חומוס` entry already in there).

## Search & tag filters

The homepage has a search box that filters recipes live as you type, matching against title and tags (in `recipes-data.js`). It's all client-side — no server or database needed, and it works whether the site is opened locally or on GitHub Pages.

Below the search box, a row of tag chips is generated automatically from every tag used in `recipes-data.js` — no extra setup needed when you add a recipe with a new tag, it just shows up as a filter. Click a chip to filter to that tag, click it again to clear.

## Design

The site uses a muted sage-green + warm paper palette with a serif heading font (Lora, loaded from Google Fonts) paired with clean sans-serif body text — an editorial, magazine-style look rather than a bright/playful one. Colors live as CSS variables at the top of `style.css`, so the whole palette (light and dark) can be changed in one place. The header logo and favicon are generated from `icon-192.png`.

Each tag gets its own muted color automatically (sage, terracotta, dusty blue, mustard, plum, clay red — defined as `--tag-0` through `--tag-5` in `style.css`), used for the tag filter chips, the colored accent stripe on each homepage card, the tag pills on individual recipe pages, and the bullet/step-number color. The color is picked deterministically from the tag's name (see `tagColorClass` in `tag-colors.js`, shared by the homepage and every recipe page), so no manual assignment is needed when adding a new tag.

## Dark mode

The site automatically follows your device's light/dark setting (`prefers-color-scheme` in `style.css`) — no toggle needed. It switches on its own if you change your phone or laptop's system theme.

## Home screen icon

The site has a favicon and a web app manifest (`manifest.json`), so on your phone you can open the site and use "Add to Home Screen" (Safari) or "Install app" (Chrome/Android) — it'll get its own icon (the fried egg logo) and open full-screen like a real app, no browser bar.

Icon files: `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`. These were generated once and shouldn't need to change unless you want a different logo.

## Optional: editing with Git instead of drag-and-drop

If you'd rather use Git from your laptop:

```bash
git init
git add .
git commit -m "Initial recipe site"
git remote add origin https://github.com/YOUR-USERNAME/recipes.git
git push -u origin main
```

After that, any local edit just needs:

```bash
git add .
git commit -m "Add chicken curry recipe"
git push
```

## Files

- `index.html` — homepage with search box + tag filters, lists all recipes
- `style.css` — shared styling (mobile-friendly, RTL-aware)
- `recipes-data.js` — list of all recipes (title, tags, time, link); edit this when adding/removing a recipe
- `app.js` — renders the recipe list, tag filter chips, and search
- `tag-colors.js` — shared color logic for tags, used by the homepage and every recipe page
- `manifest.json` — web app manifest for "Add to Home Screen"
- `favicon.ico`, `favicon-*.png`, `icon-*.png`, `apple-touch-icon.png` — site/home screen icons
- `recipes/_template.html` — copy this to start a new recipe
- `recipes/*.html` — individual recipes
