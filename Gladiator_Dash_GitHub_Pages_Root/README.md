# Gladiator Dash 2027 — GitHub Pages Preview

This folder is reorganized so GitHub Pages can publish directly from the repository **main branch / root**.

## Live-site files

- `index.html` — main clickable website preview
- `sponsor.html` — sponsor-focused page
- `media/` — optimized logos, hero video, and preview photography used by the site

## Reference files

- `brand/` — source Gladiator Dash brand assets
- `docs/` — planning, event rules, sponsorship proposal, and implementation notes
- `CLAUDE.md` / `PRODUCT.md` — project requirements and technical/product context

## GitHub Pages setup

1. Upload the **contents of this folder** to the repository root. Do not upload the ZIP itself.
2. Confirm that `index.html` appears on the first screen of the repository alongside `README.md`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/ (root)**.
6. Save and wait for the Pages deployment to complete.

The site should then open at:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

## What was removed

The earlier `prototype/` wrapper, local Node server scripts, artifact-build scripts, generated artifact HTML files, package metadata used only for local previewing, and editor/agent cache folders were removed from this clean version. GitHub Pages serves the static HTML/media directly, so they are not required.

## Important

This is still a clickable preview, not the final production registration system. The planning files explicitly note that the eventual custom registration experience needs server/database work and Zeffy feasibility testing before launch.
