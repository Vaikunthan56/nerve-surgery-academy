# Nerve Surgery Academy

A self-hosted portal for online learning modules built with **Articulate**
(Storyline / Rise). The site is a plain static web app — no server code, no
database. Articulate HTML5 packages run entirely in the browser inside an
embedded player, and learner progress is stored privately in the browser's
local storage.

## Quick start

```bash
npm install
npm run dev        # development server
npm run build      # production build → dist/
npm run preview    # serve the production build
```

Deploy `dist/` to any static host (GitHub Pages, Netlify, Vercel, an
intranet web server, or institutional web space). No backend is required.

## Publishing a module from Articulate

1. **Publish from Articulate**
   - Storyline: *Publish → Web* (HTML5 output).
   - Rise 360: *Export → Web* (or "No LMS — web only"), then unzip.

2. **Copy the export into the site**

   Place the unzipped package in a new folder under `public/courses/`,
   named with a short lowercase id:

   ```
   public/
     courses/
       nerve-repair-principles/
         story.html          ← Storyline export entry point
         story_content/ …
       my-rise-course/
         index.html          ← Rise export entry point
         ...
   ```

   The entry file must sit **directly** inside the module folder.

3. **Register the module** in `src/config.ts`:

   ```ts
   {
     id: 'nerve-repair-principles',   // must match the folder name
     title: 'Principles of Primary Nerve Repair',
     description: '…',
     category: 'Nerve Repair',
     level: 'Intermediate',           // Foundation | Intermediate | Advanced
     durationMinutes: 35,
     entryFile: 'story.html',         // 'story.html' (Storyline) or 'index.html' (Rise)
     tags: ['microsurgery', 'repair'],
     updatedAt: '2026-10-15',
   }
   ```

4. **Rebuild** (`npm run build`) and redeploy. The module appears in the
   library automatically.

Modules listed in `src/config.ts` **without** an `entryFile` show in the
catalogue as "Content pending" — useful for advertising upcoming content.

## Notes & limitations

- **Progress tracking** is per-browser (localStorage): opening a module marks
  it *in progress*; learners press *Mark complete* when done. Articulate's own
  in-course bookmarking also works, since it uses the same browser storage.
- **SCORM/xAPI/LMS grade reporting is not included.** If you later need formal
  completion records across users, publish from Articulate as SCORM/xAPI and
  pair this portal with an LMS or an LRS — the catalogue structure here maps
  cleanly onto that upgrade.
- Large video assets inside exports are fine, but keep total module size
  reasonable for web delivery.
- The site uses hash-based routing (`#/module/<id>`), so it works on hosts
  that do not support SPA rewrite rules.

## Project layout

```
src/
  config.ts              ← site settings + module catalogue (edit this)
  types/index.ts         ← catalogue & progress types
  hooks/use-progress.ts  ← browser-local progress tracking
  components/            ← header, module cards
  pages/Home.tsx         ← library (search, categories, stats)
  pages/Player.tsx       ← embedded Articulate player
public/courses/          ← one folder per published Articulate module
```
