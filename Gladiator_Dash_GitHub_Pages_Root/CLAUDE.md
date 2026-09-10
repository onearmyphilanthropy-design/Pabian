# Gladiator Dash — Website

Custom website for **Gladiator Dash**, a mud run put on by a nonprofit student
organization at Texas A&M. Replaces the current live site at
https://www.gladiatordash.com/.

- **Event date:** April 11, 2027 · **Venue:** Lake Bryan
- **Audience:** primarily college students
- **Instagram (real promo material today):** @gladiatordash

## Current stage: PLANNING — do not start building

Event rules and the Zeffy integration boundary are not settled. Do **not**
wireframe pages or scaffold the production app until those are resolved. See
"Open decisions" below.

## The one thing that matters most

Registration checkout must be as frictionless as possible **on a phone**,
with **Apple Pay** support. Everything else is secondary. Design mobile-first
and minimize typing at every step.

## Payments — Zeffy, and its constraints

The org qualifies for **Zeffy** (0% platform, transaction, and card fees),
which supports Apple Pay. Zeffy is **not** Stripe — do not design as if it
were a programmable processor inside a custom checkout.

Assume this flow:

    our site → Zeffy's own checkout page → Apple Pay → return to our site

**Not** an embedded Zeffy iframe (Apple Pay should not be assumed to work
there).

None of this is proven yet. Before making architectural commitments, the
Zeffy feasibility tests in `docs/plan-2026-08-20.md` must actually be run
against a small fake event — especially whether a website registration ID can
be reliably tied back to a Zeffy transaction, and whether one purchase can
expose multiple runners individually.

## Division of responsibility

**Our site owns:** ticket discovery, heat selection, group/organization
system, shareable group + heat links, runner coordination, admin tools,
branding, our own database.

**Zeffy owns:** payment, Apple Pay, receipts.

Avoid rebuilding anything Zeffy already does well.

**Heats are never Zeffy items** (decided 2026-08-24). A heat does not change the
price — a 7:30 Competitive Student and a 12:40 Competitive Student are both $30 —
so Zeffy has no reason to know heats exist. Zeffy carries the **six ticket types
only**. Heat inventory and capacity live entirely in our database.

This is what stops a runner picking their heat twice: our site asks for the heat,
Zeffy never does. It also avoids administering 34 heats × 2 categories as Zeffy
line items. Ticket type is still chosen on both sides — unavoidable, since Zeffy
must know what to charge — so a deep link that pre-selects the right ticket
(feasibility test 3) is what keeps that down to a confirm-and-pay tap.

## Distinctive features (the actual reason to build custom)

- **Heat coordination.** Heats every 10 min; a full heat becomes unavailable.
  Shareable per-heat links (`/register/heat/9-30`).
- **Groups.** Official (admin-created orgs) and custom (runner-created) share
  one Group model. Shareable invite links (`/g/mud-boys-X82K`) show who's
  registered for which heat and make joining the same heat one tap. A group
  spans multiple heats — never force everyone into one.
- Solves "what time did everyone sign up for?" without a GroupMe thread.

## Ticket types

Competitive Student $30 · Non-Competitive Student $25 · Competitive
Non-Student $35 · Non-Competitive Non-Student $30 · Endurance $40 · Arena $10.

**Kids' 1K obstacle run — REJECTED (org, 2026-08-24).** Not happening. Do not
build, price, publish, or plan around it. The six ticket types above are the
complete set. This also closes the older "fun run" idea.

Student status is honor-system; no email verification. Endurance runs from the
first heat to the last heat. Arena skips heat selection entirely.

## Backend modeling rule

One buyer may purchase many runners. Model **Order → many Registrations**;
each Registration carries its own ticket, heat, group, bib, and check-in
status. Never collapse a multi-runner purchase into a single buyer record.

## Scope guardrails

**Keep:** QR check-in, bib assignment at check-in, runner lookup by name,
walk-up registration, pre-race offline backup export (Lake Bryan has spotty
service — this one is important).

**Do not build:** heat staging/check-in dashboards, wrong-heat prevention,
late-runner systems, live shirt inventory, live results, race command center,
photo matching (SWSH does it, by face, not bib).

**Waivers are online** (org-confirmed 2026-08-20 — this reverses the earlier
"in-person paper" note). RaceEntry provides this today, so replacing RaceEntry
means inheriting it. Acceptance must be captured on our side **before** the
Zeffy redirect, not inside Zeffy's checkout.

**One mechanism for everyone: a checkbox** (org, 2026-08-24). This **reverses** the
earlier "minors require a real guardian signature" note, which the org has since
retracted as an error. There is no signature capture, no signer-identity storage,
and no separate minor path in the UI. Minors are covered by an acknowledgement
checkbox whose exact wording is in `docs/event-rules-confirmed.md` — use it
verbatim, do not paraphrase.

The waiver document itself is still to come from the org. Do not draft
substitute waiver language.

**Shirts are day-of** (org-confirmed). No pre-race pickup, no live inventory.
The live site's FAQ still says otherwise; corrected copy is drafted in
`docs/faq-revision.md`.

Keep the admin side small. Earlier planning over-detailed it. What the org
actually asked for (2026-08-24, **explicitly deferred — do not build yet**):
sign in with a **username and password**, view/collect registration data, and
**edit heats**. No "Sign in" link anywhere on the public site. Note that the
unlisted URL is a preference, not the security — real auth still gates it. This
supersedes the plan's Auth.js magic-link/OAuth suggestion.

## Confirmed additions

- Registered-runner counter with an admin-configurable reveal threshold, so
  it stays hidden until the number is flattering.
- Group bragging-rights leaderboard (registration counts, not race results).

**No family / same-purchase discount** (org, 2026-08-24 — this reverses the
earlier "confirmed" entry). Order → many Registrations is unaffected; there is
just no discount rule on top.

## Confirmed event rules (org, 2026-08-24)

Full record with caveats in `docs/event-rules-confirmed.md`.

- **Heats run every 10 minutes**, not 15. This changed on 2026-08-24 and
  invalidates the 15-minute figure in older docs.
- Competitive and Non-Competitive are **separate heats** — never mixed.
- **125 runners per heat.** **First heat 7:30 AM, last heat ~1:00 PM.**
- **Everyone arrives 7:00 AM**, 30 min before the first heat. One universal
  arrival time, not a per-heat check-in window.
- Registration **closes before the first heat**; **in-person registration is
  available** on race day.
- **Endurance:** starts at the first heat, ends at the last heat, no separate
  check-in.
- **Arena:** 7:00 AM until 30 min after the last heat.
- **No parallel heats** — one heat at a time, so a start time identifies exactly
  one heat and `/register/heat/9-30` stays valid.
- **Corps heats** exist as a **label on the heat select page only** — not a
  category, not a ticket type, not enforced. Nullable `designation` on Heat.
- **Required fields** are listed in `docs/event-rules-confirmed.md`. Shirt size
  is required. The A&M-org and Corps-outfit questions are **a searchable group
  select that creates a new group when nothing matches** — not free text.
- **Refunds exist but only by email — never publish a refund policy on the
  site.** No refund copy in FAQ, checkout, or confirmation email.
- **Giveback runs in 2027, but standings stay unpublished** until the org says.
- **No org roster import** — admins create official groups by hand.
- Lifetime raised is **$1.25 million**, not $900,000.

## Open decisions — do not guess these

Registration open date and the exact online close time, whether Corps heats are
genuinely open to anyone or the label is meant to be self-policing, obstacle
count (12 vs 15), and the waiver document text.

Heat inventory is no longer open — it is ours, entirely. See "Division of
responsibility" above.

The heat *arrangement* (which slots are competitive vs non-competitive) is no
longer a rule to guess — with no parallel heats it is just an ordered list, set
in the admin heat editor.

## Reference

- `docs/handoff-from-prior-chat.md` — full requirements, verbatim from the
  planning conversation. Source of truth for event rules.
- `docs/plan-2026-08-20.md` — technical architecture and Zeffy feasibility
  test plan. Proposed stack: Next.js (App Router, TS) + Postgres/Prisma on
  Neon, Tailwind + shadcn/ui, Auth.js for admin only.
- `brand/` — logo and helmet marks, plus three visual directions
  (`brand/directions/`, viewable via `brand/gladiator-dash-directions.html`).
  Direction 1 was preferred. Brand is a reference, not a decision yet.

Do not copy the `CLAUDE.md` from the sibling `portfolio` project.
