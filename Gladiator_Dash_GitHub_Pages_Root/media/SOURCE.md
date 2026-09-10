# Prototype media

- `hero-480.mp4` — the background video from the current gladiatordash.com homepage.
  Wix asset id `09e9fc_f4b2c128e5494a9b97094e03661226a0`.
  Full-resolution source (1080p, ~20MB), re-fetch if needed:
  https://video.wixstatic.com/video/09e9fc_f4b2c128e5494a9b97094e03661226a0/1080p/mp4/file.mp4
  The 480p rendition is used here to keep the prototype light on a phone.

- `helmet-white.png`, `helmet-badge.png` — copied from `brand/`.

NOT used: `brand/GD-Logo-26.png`. The full lockup has "APRIL 19, 2026" baked into it,
which is the wrong date for the April 11, 2027 event. It needs a re-dated version
before it can appear on the site.

## Updated 2026-08-22 — optimized brand marks

Now using the optimized exports. Same pixel geometry as the full-size versions
(verified against the alpha channel, bands within 1px), so they were a straight
swap with no change to the crop maths.

- `opt-helmet.png`      65KB, was 331KB. White helmet, transparent.
- `opt-words-white.png` 46KB, was 312KB. Both name lines, white, transparent.
  The site crops the GLADIATOR DASH line (y 358-502 of 2172x724) and uses it as
  the front-page logo.

Available but not currently used:

- `opt-banner.png`      65KB. The complete lockup in white: helmet, both name
  lines and "APRIL 11, 2027". The natural choice if you ever want the full dated
  logo on a dark background rather than the wordmark alone.
- `opt-logo-navy.png`   92KB. Same lockup in navy. Invisible on this site's dark
  ground, correct for light backgrounds: print, letterhead, a white page.

All are palette-indexed PNGs. Alpha edges were checked at hero scale and are
smooth, with no banding. Still not vector, so an SVG would be better again for
arbitrary scaling.
