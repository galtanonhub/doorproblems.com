# DoorProblems.com

> **Session start:** This folder (`...\sites\doorproblems.com`) is the working root — launch sessions
> from here so this file auto-loads and the project shows as its own entry (not under the parent
> `sites\` folder). If a session opened in the parent `sites\` folder, this file won't have loaded
> automatically; read it first before doing project work.

A service-business website for a sliding glass door repair company in Central Florida
(phone (352) 234-4353, "Sliding Door Specialists", family-run, in business since 2008,
flat-rate pricing quoted over the phone). Originally built on the owner's son's Claude account;
the owner now edits it himself via this Git workflow so both can sync through GitHub.

## Stack & conventions
- **Plain static site — hand-written HTML, CSS, and vanilla JS. NO framework, NO build step.**
  (This is different from singledads, which uses Eleventy. Here the files in the repo root ARE the
  site exactly as deployed — what you edit is what ships.)
- **Project shape (all at repo root):**
  - Pages: `index.html`, `services.html`, `about.html`, `service-area.html`, `testimonials.html`,
    `contact.html`.
  - `css/styles.css` — all styles.
  - `js/main.js` — all scripts.
  - `images/` — photos (e.g. `josh-chris-resized-01.jpg` on the services page).
- **Nav order:** Home · Services · About Us · Service Area · Testimonials · Contact.
  The nav markup is duplicated in each page's `<header>` (no includes/templating) — when changing
  nav, update every page.
- **Services offered:** roller replacement, glass replacement, track repair, property management,
  new door installation, locks & handles.
- Keep everything **responsive**; nav collapses to a hamburger on mobile (see `js/main.js`).

## Local development
- Static preview: `npx -y serve -l 8081 .` → http://localhost:8081/  (no build needed; just open files).
- A `doorproblems-static` config exists in the PARENT `sites\.claude\launch.json` for the preview tool
  (port 8081), since the preview tool's cwd is `sites\`.

## Images
- Canonical originals live in the owner's `C:\Users\galta\Downloads\` (e.g. `josh-chris-01.jpg`).
  The owner dislikes the pre-existing `*-resized-01.jpg` exports — use the ORIGINAL and only
  downscale if it's larger than ~1200px wide. If an original is already web-sized, copy it as-is
  (re-encoding an already-small JPEG just adds loss and grows the file).

## Deployment
- Traditional cPanel host. Live site is currently staged at **doorproblems.com/test/** (pre-launch),
  so deploys target `public_html/test/`.
- Owner previously deployed via FTP but prefers the **cPanel Git Version Control** flow (same as
  singledads): `.cpanel.yml` copies the site files to `public_html/test/`.
- **Deploy flow:** edit files → commit + push to `master` → in cPanel: **Update from Remote** →
  **Deploy HEAD Commit**.

## Repo
- GitHub: github.com/galtanonhub/doorproblems.com (default branch: `master`).
- Local: `C:\Users\galta\sites\doorproblems.com`.

## Known TODO
- Wire up the cPanel Git deployment (`.cpanel.yml` + cPanel-side setup).
- Decide repo visibility (affects whether cPanel needs an SSH deploy key — public clones directly).
