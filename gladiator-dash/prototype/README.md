# Gladiator Dash — prototype

A clickable prototype of the site. Real design, **mock data**, no backend and no
payments. Built to look at and argue with, not to launch.

## Run it

Needs Node 18+. Nothing to install.

```
cd prototype
npm start
```

Or without npm:

```
node serve.js          # http://localhost:8080
node serve.js 3000     # a different port
```

The server prints a second address on your local network — open that one on your
phone, on the same wifi. This is designed phone-first, so that is the view that
actually counts.

**Don't just double-click `index.html`.** Most of it works over `file://`, but the
hero video won't play: the browser needs HTTP range requests to start an MP4, and
opening a file off disk doesn't provide them. That's what `serve.js` is for.

## What's in it

| Page | Route |
|---|---|
| Home | `/#friends/home` |
| Group invite | `/#friends/group` |
| Registration flow | `/#friends/ticket` → heat → runners → review → confirm |
| Link preview (what a shared link looks like in a chat) | `/#friends/preview` |
| Course · Giveback · Standings · Sponsors · About · Raffle · FAQ | `/#friends/course` etc. |

### Scenarios

The button at the bottom-right switches the underlying data. The scenario is also
the first part of the URL hash, so you can link straight to one:

| Scenario | What it shows |
|---|---|
| `friends` | A five-person friend group. The normal case. |
| `outfit` | A 34-person Corps outfit spread across nine heats, one already full. |
| `seed` | One member — the state a group is in the moment it's created. |
| `theirsfull` | Every heat the group is in has filled, so the nearest open heat is offered. |
| `allfull` | Nothing left but Arena. |

Example: `/#outfit/group`, `/#theirsfull/group`.

## What's real and what isn't

**Real:** ticket prices, the event date and venue, the course description, the
100%-to-Still-Creek-Ranch claim, the full sponsor roster, the Giveback Program
rules and categories, the Endurance format, and the FAQ answers.

**Placeholder:** every runner name, all heat times and capacities, the leaderboard
standings, and the registered-runner counter. The reveal threshold is set to 3 so
the seed state is visible; it is admin-configurable in the real thing.

> **Known stale as of 2026-08-24.** The seed heats run 9:00–11:15 at 15-minute
> intervals with a capacity of 30. The org has since confirmed heats run **every 10
> minutes**, **7:30 AM to ~1:00 PM** (34 slots), at **125 per heat**. Prose and FAQ
> copy have been updated; the seed schedule deliberately has *not* — how Competitive
> and Non-Competitive heats are arranged across those slots is still open, and that
> answer changes the whole list. Regenerate `HEAT_TIMES` and the scenario `caps` in
> one pass once it lands, rather than twice.

**Deliberately absent:** obstacle names and photos, any obstacle order or route,
and the `$450,000`/`$900,000` figures from old press coverage and the org's About
page — the confirmed number is $1.25M+. The kids' 1K was rejected by the org on
2026-08-24 and is not coming back.

## Files

```
index.html    the whole prototype — markup, styles and logic in one file
serve.js      local server with range support
build.js      produces artifact.html (inlines images and video, strips the
              document skeleton) for publishing
media/        hero video and logo marks, with SOURCE.md recording their origin
artifact.html generated — do not edit by hand
```

## Publishing

`node build.js` rewrites `artifact.html` with the images and video inlined as data
URIs, because the artifact host blocks external and relative asset requests. That
puts the published page around 12MB. `node build.js link` builds it without the
video baked in if that's too heavy.
