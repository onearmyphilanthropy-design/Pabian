# Event rules — confirmed 2026-08-24

Answers given by the project lead on 2026-08-24, in response to the open-questions
list. **This file supersedes conflicting "TBD" entries elsewhere.**

`docs/handoff-from-prior-chat.md` is deliberately *not* edited — it is a verbatim
record of the earlier planning conversation. Where it says TBD and this file gives
an answer, this file wins.

---

## Heats

- **Heats run every 10 minutes** (org, 2026-08-24). This **changes the long-standing
  15-minute assumption** carried through every earlier planning doc. All prose has
  been updated; the prototype's seed schedule has not (see below).
- **Competitive and Non-Competitive are separate heats.** A heat is one category
  or the other, never mixed. This confirms `Heat.category` in
  `docs/plan-2026-08-20.md`.
- **Capacity: 125 runners per heat.**
- **First heat: 7:30 AM. Last heat: ~1:00 PM** (confirmed 2026-08-24 against the
  live Endurance page's 7:45 a.m.–1:00 p.m. window).
- **Everyone arrives 30 minutes before the first heat — 7:00 AM.** One universal
  arrival time for all runners, not a per-heat check-in window. This simplifies
  race-day check-in considerably: it is a single morning rush, not a rolling one.

**Capacity worth sanity-checking.** 7:30 AM to 1:00 PM at 10-minute intervals is
**34 slots**. At 125 per heat that is a theoretical **4,250 runners** — and if the
two categories alternate, roughly 17 heats and ~2,100 capacity each. Unless real
attendance is in that range, no heat ever fills, and "a full heat becomes
unavailable" — a headline feature — never fires in practice. Either capacity is
lower than 125, the day is shorter, or the feature is mostly insurance. Not urgent,
but it should be reconciled before the heat picker is designed around scarcity.

- **No parallel heats** between Competitive and Non-Competitive (org, 2026-08-24).
  One heat is on the course at a time, so **a start time identifies exactly one
  heat**. This keeps the `/register/heat/9-30` link scheme intact — the last thing
  that could have broken it.
- **Corps heats.** Some heats are designated Corps heats. Per the org this is
  **a label shown on the heat select page only** — not a separate ticket type, not a
  separate category, and nothing restricts who may pick one. Model it as a nullable
  `designation` (or label) column on Heat, not as a new category value. *Open: whether
  a Corps heat is genuinely open to anyone, or whether the label is expected to be
  self-policing.*

Whether the two categories alternate or run in blocks is no longer a blocking
question: with no parallel heats, the day is a single ordered list of heats, and the
admin heat editor below is where that order gets set.

## Registration window

- **Closes before the first heat.**
- **In-person registration is available** (org, 2026-08-24), so the online cutoff is
  not the end of registration — walk-ups continue on race day. This was already in
  scope as "walk-up registration"; it is now confirmed as a real, expected path
  rather than an edge case.

**Still open:** the registration **open** date, and whether the online form closes at
7:30 AM on race morning or at some earlier fixed time.

## Admin access (org, 2026-08-24 — build later, record now)

The org needs a way to **sign in, view/collect registration data, and edit heats**.

- **Username and password.** Not magic-link, not Google OAuth — this supersedes the
  Auth.js recommendation in `docs/plan-2026-08-20.md`, which assumed one of those.
- **No visible "Sign in" anywhere on the public site.** Admins reach it by knowing
  the URL.
- **Explicitly deferred** — "this can be done later." Do not build it now. It is
  recorded so the data model and routing leave room for it.

Two notes for whoever builds it:

1. **The unlisted URL is not the security.** The password is. An unadvertised admin
   route is fine as a preference, but it must sit behind real authentication, rate
   limiting, and no-index headers — not obscurity alone.
2. **A heat editor changes the heat-arrangement question.** If admins can create and
   edit heats directly, the Competitive/Non-Competitive arrangement stops being a
   rule to hardcode and becomes a schedule someone enters. That is likely the right
   shape, and it means the open question above may not need a general answer — just
   this year's actual schedule.

## Required registration fields (org, 2026-08-24)

The org's list, in the order given:

| Field | Type | Notes |
|---|---|---|
| First responder? | yes/no | New — not in any earlier plan |
| Signing up with a Texas A&M student org? | yes/no | If yes → **name of the org** |
| Member of the Corps? | yes/no | If yes → **which outfit** |
| Waiver acknowledgement | checkbox | See the conflict flagged below |
| Minor acknowledgement | checkbox | Exact wording preserved below |
| Emergency contact name | text | |
| Emergency contact phone | text | |
| Pre-existing health concerns | text | Free text, optional-sounding as phrased |

Plus runner name, and an email for the receipt.

**Minor acknowledgement — the org's exact wording, do not paraphrase:**

> "I acknowledge that if I am under the age of 18, this registration and waiver must
> be completed and agreed to by my parent or legal guardian, who has reviewed and
> consented to all terms on my behalf"

**Shirt size is also required** (org, 2026-08-24). It was missing from the list above
and the org confirmed it belongs. Shirts remain day-of with no live inventory — the
size is collected at registration, not fulfilled from a tracked stock.

### Resolved: minors get a checkbox

**Settled 2026-08-24 — the checkbox is correct and the guardian-signature note was the
error.** The org's words: *"I was wrong about the minors it is just a check box."*

This **reverses the 2026-08-20 entry** in `CLAUDE.md` and `docs/plan-2026-08-20.md`
that recorded minors as requiring a real guardian signature. There is now **one waiver
mechanism for everyone**: a checkbox, plus the minor acknowledgement above.

Two consequences worth knowing:

- **The guardian-signing-on-a-phone design problem is gone.** It was flagged as the
  one part of the waiver flow needing real design work. It no longer exists — no
  signature capture, no signer-identity storage, no separate minor path in the UI.
  `waiver_status` can be a simple accepted/not-accepted with a timestamp.
- The org has decided this, and it is their call. One thing to carry forward rather
  than re-argue: a self-attested checkbox is weaker evidence than a signature, so it
  is worth the person handling liability and insurance seeing the final wording once
  before the site goes live. Recorded, not blocking.

### Groups: searchable, with create-on-miss

**Org direction 2026-08-24:** there are too many orgs to present as a list. The A&M-org
and Corps-outfit questions should be **a searchable field with selection — and if
nothing in the list matches, it creates a new group.**

This is a combobox/typeahead over the existing Group table, not a free-text input,
which resolves the fragmentation problem: "Squadron 17" gets picked from the list
rather than retyped three different ways. Notes for the build:

- Search must be forgiving — match on partial words and ignore case and punctuation,
  so "sqd 17" still surfaces "Squadron 17".
- Creating on a miss is what makes it work for friend groups, but it is also how
  duplicates and junk names get in. The Group model already has `active` so an admin
  can hide one; that admin surface is part of the deferred admin tooling.
- This unifies the org question with the existing Group system rather than running two
  parallel notions of "who are you with", which is the right outcome.

### Health concerns is sensitive data

Free-text medical information carries a real handling duty, and it would land in the
**pre-race offline export** that goes to a volunteer's laptop at Lake Bryan. Whatever
policy covers it needs to cover that export too.

## Ticket types

- **Kids' 1K: NOT happening.** Rejected 2026-08-24. Do not price, build, publish
  or plan around it. The six existing ticket types stand.
- **No family / same-purchase discount.** This reverses the earlier "confirmed
  addition". The Order → many Registrations model is unaffected — one buyer can
  still purchase many runners, there is simply no discount rule applied on top.

## Endurance

- Starts with the first heat (7:30 AM) and **runs for as long as the participant can**,
  bounded by the last heat (~1:00 PM).
- **No separate check-in** — Endurance runners arrive at 7:00 with everyone else.
- No Heat rows, no heat selection.

## Arena

- No heat, no heat selection (reconfirmed 2026-08-24).

## Arena

- Access runs from **30 minutes before the first heat (7:00 AM)** until
  **30 minutes after the last heat** — confirmed 2026-08-24. With a ~1:00 PM last
  heat that is roughly **7:00 AM – 1:30 PM**.
- Skips heat selection entirely (unchanged).

## Refunds

- **Refunds are issued, but only when someone emails to ask.**
- **Do not publish a refund policy on the website.** The org does not want it
  advertised. No refund copy in the FAQ, checkout, or confirmation email.

One flag, recorded and not argued: an unstated refund policy on a paid event tends
to convert into support email and occasional card chargebacks rather than
disappearing. That is the org's call to make, and it has been made.

## Giveback Program

- **Running again in 2027 — yes.**
- **Do not display standings publicly yet.** Keep the standings page unpublished
  or behind a flag until the org says go.

## Groups

- **No org roster import.** Official groups are created by admins by hand.

## Facts to correct on the site

- **Lifetime raised: $1.25 million.** Replaces the $900,000 figure taken from the
  org's About page.

## Site / domain

- The Wix site will be **archived** at cutover, not deleted.

## Zeffy

- The project lead has Zeffy access as of 2026-08-24. The feasibility tests in
  `docs/zeffy-test-runbook.md` can be run now. Nothing else should be built first.

---

## Still open

| # | Question | Who |
|---|---|---|
| 6b | Registration **open** date, and the exact online close time | org |
| — | Are Corps heats genuinely open to anyone, or is the label meant to be self-policing? | org |
| — | Does the 125 × 34 heats ≈ 4,250 capacity match real expected attendance? | org |
| 21 | Obstacle count: 12 (About page) vs 15 (RaceEntry listing) | org — unsure |
| — | Waiver document text and provider | org + liability |
| 23 | Sponsor logo files | to source |

Closed since the first pass: the minor waiver mechanism (checkbox), the org/outfit
field shape (searchable group with create-on-miss), shirt sizing (required), parallel
heats (none), and the heat arrangement (an admin-editor concern, not a rule).
