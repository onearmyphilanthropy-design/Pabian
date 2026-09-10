# Design brief — Group invite page (`/g/{slug}`)

Status: **draft for confirmation.** Prepared 2026-08-20. No code, no visual world
committed.

---

## 1. Job and audience

**Visitor mode: Persuade**, built on an Operate spine. The visitor's success is that
they register. The roster is not decoration around a task — the roster *is* the
persuasion, and the task (pick a heat, join) is how the persuasion cashes out.

**Who arrives:** someone who just received a text from a friend. Confirmed as a **real
mix** of two states of mind, and the page must serve both without becoming two pages:

- **Committed.** Already knew about Gladiator Dash, already intended to run. They need
  one fact — what time is everyone going — and one tap. Every extra element is a tax.
- **Cold.** Has never heard of the event. This link is first contact. They need to know
  what it is, when, what it costs, and why it exists before "join" means anything.

The design resolution is that **the social proof is the pitch**. "34 people from your
outfit are running this" persuades a college student better than any hero headline. The
cold visitor gets their answers from a compact always-present fact band, not from a
landing-page overture that would slow the committed visitor down.

**Context of use:** a phone, one-handed, in a group chat, probably within seconds of
the text arriving. Possibly outdoors. Attention measured in seconds.

---

## 2. Outcome and proof

**Primary action:** join a specific heat, with group and heat pre-attached, in one tap
from the first viewport.

**Secondary action:** share the link onward. This page is the growth loop — every
person who joins should leave with their own shareable link.

**Success:** the visitor registers into a heat that has their people in it, without
anyone typing a time into a group chat.

**Real proof available to this page:**

- Actual registered group members, by heat, as abbreviated names ("Jacob P.").
- The group's registered count — org-confirmed as the number to associate with a group.
- **100% of proceeds go to Still Creek Ranch** — org-confirmed and the strongest trust
  claim the event has. It belongs on this page, stated plainly.
- Event facts: 5K, 15 obstacles, one swim station, obstacles are "challenge by choice."
- April 11, 2027 · Lake Bryan.

**Must not appear:** the $450,000 lifetime figure (press-sourced, unconfirmed), the
kids' 1K (rejected by the org 2026-08-24), any numbered obstacle sequence or route-revealing
map (the order is deliberately withheld), invented capacity numbers, testimonials, or
participant counts that aren't real.

---

## 3. The link preview is the first screen

**Everyone the link reaches sees the preview card. Only the people who tap see the
page.** That makes the card the highest-leverage surface in the entire group loop, and
it gets designed deliberately rather than left to whatever the platform scrapes.

A bare grey URL in a group chat is a wasted share. A card reading "Come run with 5
people from Mud Boys — 9:30 AM, April 11" is the pitch, delivered before anyone commits
to a tap.

**Mechanism:** `og:title`, `og:description`, and `og:image`, generated **per group
slug**. iMessage leans heavily on the image and frequently truncates or drops the
description entirely — so the image is the design object here, not the copy. Plan for a
server-generated card (group name, registered count, suggested heat time, over real race
photography) at 1200×630. The recommended stack has this built in via Next.js
`ImageResponse`, which is one more argument for it.

**The count on the card is threshold-gated** (§8). Below the reveal threshold the card
carries group name and heat time and no number at all — "Run with Mud Boys · 9:30 AM,
April 11." The card must have a composition that works without a numeral rather than one
that degrades into printing "1."

**Caching is the one real limitation — and the referral code already solves it.**
Preview cards are cached, so a link that said "5 people" can keep saying it at 30. But
every registered runner shares their own URL carrying their referral code
(`/g/mud-boys-X82K?r=a7f2`), which makes each shared link unique and generates a fresh
card per share. The attribution feature and the staleness fix are the same feature.
**Protect this when building** — collapsing referral codes into one canonical URL would
silently break preview freshness.

**Privacy line — the card is more public than the page.** The page shows abbreviated
member names to people who have the link and tapped. The card gets cached on third-party
infrastructure and forwarded onward by people who never opened it. So: **group name and
counts on the card, never member names.** Names stay behind the tap.

**Requirements:**

- Meta tags must be **server-rendered**. JavaScript-injected tags produce a plain grey
  link, because the preview fetcher does not run scripts.
- `noindex` does **not** block preview generation — they are separate mechanisms. Group
  pages stay unlisted and un-Googleable *and* unfurl properly. Keep both.
- The same tags serve **GroupMe, WhatsApp, and Instagram DMs**. Build once. GroupMe
  matters especially, since it is where this coordination currently dies.
- **Fallback:** if per-group image generation fails or times out, serve a static branded
  card. Never degrade to a bare URL.
- Copy should age gracefully, since some cards will be cached longer than intended.

**Open:** the exact card layout must be verified on a real iPhone before it is trusted.
iMessage's rendering shifts between iOS versions and silently falls back to a plain link
on a slow or failed fetch. This is cheap to test and should be tested early, not at the
end.

---

## 4. Selected direction

**Visual authority: expand Direction 1 ("Field Ops")** — `brand/directions/D1-*.dc.html`,
the preferred direction. Deep navy ground, cyan as the primary accent for times and
numerals, red reserved for urgency, Bebas Neue for impact numerals over Work Sans for
body. It evolves the identity the org already runs on Instagram, which is the right call
for an audience that has already seen that identity in their feed.

**This brief does not commit the visual world.** The brand is explicitly still a
reference. Formalizing it is a separate step (`new-work`) before any build; everything
below is structural and survives a change of skin.

**The existing D1 invite comp is a useful anti-reference.** It opens straight into
"MUD BOYS / Your friends are running at 9:30 AM" with no mention of what the event is,
when it is, what it costs, or the cause. That serves the committed visitor perfectly and
abandons the cold half of the audience. It also assumes one group, one heat, which
breaks on the real data.

### Structural thesis: one rule, two group shapes

Group sizes are **bimodal** — most are 3–10 friends, but five or six Corps outfits run
30+ across many heats. A "your friends are running at 9:30" framing is exactly right for
the first and wrong for the second, where no single heat is where everyone is.

One rule handles both:

> **Feature the heat containing the most group members that still has room.**
> Tiebreak to the earlier time.

For a five-person group that is the one heat they're all in. For a 34-person outfit
spread across eight heats it is the largest open cluster. The headline adapts to what
the rule returns — a clustered group gets "Your friends are running at 9:30," a spread
group leads with scale ("34 from Squadron 17 are in") and presents the suggested heat as
the best place to land.

**Focal moment:** the join button, with the heat time inside it. One tap, heat and group
already attached, straight into registration.

**Sequence down the page:**

1. Group identity + registered count (count subject to the reveal threshold — see §8).
2. The suggested heat: time, who's in it, room remaining, **join**.
3. Full roster by heat time — collapsed by default above ~12 members.
4. Runners with no heat — Endurance and Arena members (see §6).
5. Event essentials band: what it is, when, where, from-price, 100% to Still Creek Ranch.
6. Share.

**Implementation consequence:** the suggested-heat rule needs group membership joined to
heat capacity in one query, and the page must be renderable server-side from a slug with
no session — it's a cold public URL opened from a text message, and it must be fast on
a bad connection.

---

## 5. Scope and boundaries

**Fidelity:** production-ready single screen, mobile-first at a 390px baseline, with a
desktop treatment. Not a flow — the registration steps that follow the join tap are a
separate surface.

**In scope:** the public group page, its states, the suggested-heat logic's presentation,
the roster, the share affordance, the event-essentials band, and **the link preview card**
(§3) — which is part of this surface even though it renders inside someone else's app.

**Out of scope:** the registration flow itself, group creation, the leaderboard page, the
admin group tools, and per-heat links (`/register/heat/9-30`) as their own surface.

**Anti-goals:**

- **Not a landing page.** No hero, no scroll-story, no full nav. The event facts are a
  compact band, not an act.
- **No countdown as the focal element.** It competes with the join button for the one
  thing this page exists to get.
- **Never full names.** Abbreviated, always, for every group type.
- **No fabricated urgency.** If capacity isn't known, don't invent scarcity.

---

## 6. States and ranges

**Content ranges to design against:** 1 member (common at launch), 3–10 (typical), 30–50
across many heats (Corps outfits, five or six of them). Names are short-to-medium; group
names range from "Mud Boys" to a formal outfit designation.

Material states, in rough order of how often they'll be hit:

- **Seed state — one member.** The creator registered, made the group, and sent the
  link. Visitor #2 sees a roster of one. This is the make-or-break state at launch and
  the comp doesn't address it. It must feel like an invitation, not an empty room —
  the single member *is* the ask ("Jacob's in at 9:30. Be the second."). Per §8 the
  numeric count is suppressed at this size, so this state is carried entirely by the
  name, the heat time, and the join button. No number appears, and none is needed.
- **Typical — clustered.** 3–10 people in one or two heats. The featured-heat framing.
- **Large — spread.** 30+ across many heats. Counts and heat summaries before names;
  roster collapsed; suggested heat is the biggest open cluster.
- **Suggested heat full.** State it honestly and redirect in the same breath: "9:30 is
  full — 9:45 has room, and four of them are in it."
- **Filled while deciding.** Capacity is advisory here and authoritative in registration
  (pending orders hold spots with a TTL). Someone will tap join on a heat that closes
  during checkout. That recovery path must be designed, not left to an error page.
- **All heats full.** The group can't be joined. Say so plainly and offer the one thing
  still available — Arena, which never uses heats.
- **Registration not open yet.** Links will be shared early. Show the group and the
  date, and capture intent rather than 404-ing.
- **Registration closed.** Read-only roster; no join.
- **Group deactivated.** Admins can hide an inappropriate group without breaking its
  members' registrations. Needs a neutral, non-accusatory dead-end.

**The gap the comp misses entirely:** the page is organized by heat time, but **two of
six ticket types have no heat.** Endurance starts with the first heat and runs open-ended;
Arena skips heat selection altogether. A group with an Arena member has someone who
belongs on the roster and has no time to sit under. They need their own band — present,
counted toward the group total, not forced into a time slot.

---

## 7. Interaction and layout

**Hierarchy:** group identity → suggested heat → join → roster → event facts → share.
The first viewport on a 390px phone must carry the group name, the suggested heat time,
who's in it, and the join button. Nothing else competes.

**Roster:** grouped by heat time, ascending. Each heat shows its time, its members, and
its room state. Above ~12 members, collapse to per-heat summary rows that expand — a
34-person outfit must not push the event facts three screens down.

**Join:** a single tap carrying heat + group into registration. Multi-runner joins are
possible (someone brings friends), so the page suggests a heat but must never promise
capacity that registration hasn't reserved.

**Share:** Web Share API with a clipboard fallback. After someone registers, their share
link carries their own referral code (`/g/{slug}?r={code}`) so per-sharer attribution
works. The share affordance should be persistent but subordinate — it matters *after*
the join, and the page shouldn't beg for a share before the visitor has done anything.

**Responsive:** phone is the design case. On desktop, two columns — roster left, sticky
suggested-heat-and-join card right. Never a stretched mobile column.

**Feedback and transitions:** joining is a navigation, not an in-place mutation, so
motion should be minimal and functional. Expanding a heat row is the one place where
animation earns its keep. Respect `prefers-reduced-motion`.

**Accessibility:** no formal standard applies, but this page is read outdoors in daylight
on phones. Contrast and touch targets carry more weight than usual. Time values must be
readable as text, not conveyed by color or position alone.

---

## 8. Constraints and open decisions

**Binding constraints:**

- **Unlisted, never indexed** (org-confirmed). Link-only access, `noindex`, no sitemap
  entry, no crawlable path from any public page. It lists students by name.
- **Counts are public even though rosters aren't.** The group's registered number feeds
  the public leaderboard; the leaderboard shows the count and must **not** link through
  to the roster.
- Abbreviated names only. Never expose which organizations a person belongs to.
- Server-rendered from the slug, no session, fast on a weak connection — including the
  Open Graph meta tags, which must be in the HTML response, not injected by script.

**Open decisions a builder must not invent:**

- **Heat capacity**, and therefore whether "17 spots left" is a real number, a fill
  state, or absent. Design must tolerate capacity being unknown at build time.
- **First/last heat times** and the **Competitive vs Non-Competitive schedule** — this
  decides whether a heat row must also show its race type, which changes the roster's
  information density.
- **Registration open/close dates** — determines how long the not-yet-open state lives.
**Decided 2026-08-20 (org):**

- **No leaderboard rank on the group page.** Registered count only. Rank lives solely on
  the leaderboard page. The invite page stays pointed at the join.
- **The reveal threshold applies here too.** The same admin-configurable threshold that
  hides an unflattering number on the homepage also governs the group page's count.

That second decision needs a design resolution rather than a literal reading, because a
group page below the threshold must not become a blank room:

> **The threshold hides the numeral, not the roster.**

A count and a roster are different things. Below the threshold the page shows no "1
RUNNER" figure but still shows Jacob P. under 9:30 AM — because the roster is the proof,
and a name is more persuasive to visitor #2 than a numeral was ever going to be. The
seed-state copy therefore carries no number: "Jacob's in at 9:30. Be the second."
Above the threshold, the count appears and does its work.

Two consequences to carry:

- **The leaderboard only lists groups above the threshold.** That is a feature, not a
  gap — a leaderboard of forty groups holding one runner each is noise.
- **The link preview card (§3) must handle a suppressed count.** Below threshold the
  card shows group name and heat time with no number; the generator must never fall back
  to printing "0" or "1."

**Downstream dependency:** the join tap leads into registration, where the waiver lives —
a single checkbox for everyone (updated 2026-08-24). This page does not own that,
but the promise it makes ("one tap") is only honest if the flow behind it stays short.
