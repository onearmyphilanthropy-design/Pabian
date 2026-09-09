# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

**Delegated** — the user left this choice to us. Recorded so later work knows it was
offered, not assumed.

Chosen: **Next.js (App Router, TypeScript) + Postgres via Prisma on Neon, Tailwind +
shadcn/ui, Auth.js for admin-only auth**, as proposed in `docs/plan-2026-08-20.md`.

Why this and not a static site: the differentiating features — heat capacity, group
invite pages, multi-runner orders, QR check-in, the Zeffy correlation/webhook
round-trip — are all server-and-database work, so a static marketing site would have
to be paired with a second app anyway. One TypeScript codebase is the right shape for
the actual maintainers: a small, rotating team of student org members with varying
skill levels, who benefit from the framework with the deepest documentation and
tutorial coverage.

Marketing pages (Home, Obstacles/Course, FAQ, Sponsors, About/Cause, Giveback,
Raffle, Results/Photos, Contact) are statically generated within the same app; content
is edited in the repo rather than through a CMS unless the org later asks for
non-engineer editing.

## Users

**Primary: college students at Texas A&M**, registering on a phone, usually while
coordinating with friends over text or GroupMe. The registration decision is social
before it is individual — "what time is everyone running?" is the question that
actually gates signup.

**Buyers registering multiple runners.** One person frequently pays for a group, a
family, or a household. Same audience, different job.

**Group organizers** — fraternity/sorority/club/sports-team leaders driving turnout
for their organization, and informal friend-group ringleaders. They need something
shareable in a text message.

**Event admins and race-day volunteers** — the same student org members, on laptops
before the race and on phones at the venue.

## Product Purpose

Replace the current Wix site (gladiatordash.com) and its third-party RaceEntry
registration with a custom site whose central job is **race registration that is
frictionless on a phone, with Apple Pay**.

Success is: a student who receives a friend's link registers, pays, and is confirmed
in as few taps and as little typing as possible — and knows what time their friends
are running without asking in a group chat.

Everything else on the site is secondary to that path.

## Positioning

The reason to build custom rather than stay on an off-the-shelf race-registration
platform is **heat and group coordination**:

- Heats every 10 minutes, with a full heat becoming unavailable.
- **Shareable per-heat links** (`/register/heat/9-30`) — "I'm running at 9:30,
  register here."
- **Shareable group invite links** (`/g/mud-boys-X82K`) that show who is registered
  for which heat, and make joining the same heat one tap.
- A group spans multiple heats. It never forces everyone into one.

No generic registration platform solves "what time did everyone sign up for?" This is
the differentiator, and it is where engineering care and documentation concentrate.

## Operating Context

- **Event:** Gladiator Dash, a mud run. **April 11, 2027**, at **Lake Bryan**.
- **Organizer:** **One Army**, a Texas A&M men's service organization. Contact on the
  current site: `onearmy.philanthropy@gmail.com`.
- **Organizer detail (from the live About page):** One Army is a **men's service and
  leadership organization at Texas A&M**, whose stated mission is to develop its members
  as Aggies and leaders by serving the campus and community and promoting unity in
  Aggieland. Gladiator Dash is its main philanthropy event, and is described as
  Bryan–College Station's original obstacle-integrated mud run.
- **Beneficiary:** **Still Creek Ranch** — operating since **1988**, it rescues children
  out of crisis situations including abuse, neglect, abandonment, and trafficking, and
  raises them in family-style homes. One Army volunteers there as well as fundraising
  for it. **100% of the proceeds go to Still Creek Ranch — org-confirmed**, and safe to
  state plainly. This is the strongest trust claim the event has and should not be
  buried.
- **Lifetime raised: $1.25 million — org-confirmed 2026-08-24.** This supersedes both
  the "over $900,000" figure on the org's own About page and the "over $450,000" figure
  in older press coverage. It grows every year, so re-confirm before each publication.
- **The race itself:** a family-friendly **5K (3.1 miles)** with **one swim station**.
  Obstacles are **"challenge by choice"** — a participant may skip any obstacle
  entirely — and the swim station has an alternate route. Course officials are stationed
  at every obstacle.
- **Open — how many obstacles?** The org's own About page says **12**; the RaceEntry
  listing says **15**. Both are the org's own channels and they disagree. Do not print
  either number until someone confirms it; describe the course without a count if
  needed.
- **Endurance, in detail (from the live page):** starts at **7:45 a.m.** and runs
  continuously until **1:00 p.m.** Participants run laps of the course, a tally is kept
  beside each name, and whoever completes the most laps wins a prize. Water stations sit
  mid-course. Note this is a **lap tally**, not a timed race, and it sets the real shape
  of race-day hours.

  **Org-confirmed 2026-08-24:** Endurance starts with the **first heat** and ends at the
  **last heat**, with **no separate check-in**. The org confirmed the last heat lands at
  roughly **1:00 p.m.**, matching last year's Endurance window. Race day therefore runs
  **7:30 a.m. – ~1:00 p.m.** at **10-minute** heat intervals — 34 slots.
- **The Raffle** is a separate fundraiser with real prizes (a watch, golf equipment,
  gift cards, local food baskets), drawn on race day. **It already sells tickets through
  Zeffy** — meaning the org has a working Zeffy relationship today, which is the
  cheapest possible place to start the untested Zeffy feasibility work.
- **Obstacles are the same every year** (org-confirmed). What changes — and what the
  org deliberately **does not publish online** — is the **order** they come in. So the
  site can name and show the obstacles, but must not present them as a numbered
  sequence, a course order, or a map that gives the route away. The current live site's
  "obstacles and their order are subject to change" phrasing understates this: it is a
  choice not to reveal the order, not merely uncertainty about it.
- **One course only.** The kids' 1K second course was rejected by the org on 2026-08-24.
- **Prior event as a reference point:** the 2026 running was Sunday, April 13, 2026,
  with a **2:45 PM** start at 5104 TX-47, Bryan, TX — an afternoon race. **2027 is a
  morning race: first heat 7:30 AM, org-confirmed 2026-08-24.** Do not reason from the
  2026 afternoon start. Last heat ~1:00 PM, confirmed 2026-08-24.
- **Presenting sponsor:** **Mercuria**, which has its own page in the current nav.
- **Current site:** Wix, registration via RaceEntry. Nav today: Home, Register,
  Obstacles, Mercuria, About, Sponsors, Raffle, Giveback, FAQ. The prior event is
  referred to as "GD 26," with results and photos linked externally.
- **Venue reality:** Lake Bryan has spotty cellular service. Race-day tooling must
  tolerate that, and a pre-race offline export is a first-class requirement.
- **Race-day rituals (from the live FAQ):** free parking; gear check with a key wall at
  the check-in tables; bring photo ID and a wallet for post-race food, plus a change of
  clothes and a towel. Participants must be 18+, or have a parent/guardian sign and be
  present.
- **Arrival — org-confirmed 2026-08-24: everyone arrives 30 minutes before the first
  heat, i.e. 7:00 AM.** One fixed arrival time for the whole event, not the live FAQ's
  "45 minutes before *your* heat". Check-in is therefore a single morning rush rather
  than a rolling one, which matters for race-day tooling.
- **Photos:** the org uses **SWSH**, which matches event photos **by face, not by
  bib**. No bib-to-runner export is needed for it.
- **Promo material today:** the `@gladiatordash` Instagram.

## Capabilities and Constraints

### Registration flow

Register → choose ticket → choose an available heat (when applicable) → group
association → minimal runner info → payment → confirmation. Minimize typing at every
step. Multiple runners in one checkout, each with their own ticket type and heat.
Discount/promo codes supported. Runners cannot change their own heat after
registering; admins may need to.

### Ticket types

Competitive Student **$30** · Non-Competitive Student **$25** · Competitive
Non-Student **$35** · Non-Competitive Non-Student **$30** · Endurance **$40** ·
Arena **$10**. Student status is **honor-system** — no email verification. Endurance
starts with the first heat and runs as long as the participant wants (no 10-minute
slot selection). Arena is event-area access only and **skips heat selection
entirely**.

These six are the confirmed set. Ticket category should still be an extensible value
rather than a fixed enum, for the reason below.

**REJECTED — the kids' 1K obstacle run (org, 2026-08-24).** It was under consideration
as a seventh ticket type on its own shorter 1K course, run as a single heat. The org
declined it. **Six ticket types are the complete set, and there is only one course.**
Do not reintroduce it, and do not design around a second course. This also closes the
earlier "fun run" idea.

RaceEntry's existing "Young Gladiators (Under 18)" category therefore has no successor
here; under-18 participation continues on the 5K under the guardian-waiver rule.

This proposal is the clearest argument for keeping ticket category extensible: a
seventh type that nobody has committed to yet should cost a data change, never a
schema migration.

### Groups

**Official** (admin-created organizations) and **custom** (runner-created) share one
Group model. A group page lists members by heat time using abbreviated names
("Jacob P."), surfaces the most useful heat, and shows the nearest open heat when that
one is full. A person may belong to multiple organizations but has one primary group
per registration. Organization membership must never be publicly revealed just from
typing a name.

### Payments — Zeffy

The org qualifies for **Zeffy** (0% platform, transaction, and card fees), which
supports Apple Pay. **Zeffy is not Stripe** — it is not a programmable processor
inside a custom checkout. Assumed flow: our site → **Zeffy's own hosted checkout** →
Apple Pay → return to our site. **Not** an embedded iframe; Apple Pay must not be
assumed to work there.

**None of this is proven.** The feasibility tests in `docs/plan-2026-08-20.md` must be
run against a small fake event before architectural commitments — especially whether a
website registration ID reliably ties back to a Zeffy transaction, and whether one
purchase can expose multiple runners individually. Apple Pay failing on Zeffy's hosted
checkout disqualifies Zeffy entirely.

### Division of responsibility

**Ours:** ticket discovery, heat selection, groups/organizations, shareable group and
heat links, runner coordination, admin tools, branding, our own database.
**Zeffy's:** payment, Apple Pay, receipts, possibly ticket capacity, possibly QR
tickets/check-in. Do not rebuild what Zeffy already does well.

### Backend modeling rule

One buyer may purchase many runners. **Order → many Registrations.** Each Registration
carries its own ticket, heat, group, bib, and check-in status. Never collapse a
multi-runner purchase into a single buyer record.

### Confirmed additions

- **Registered-runner counter** with an admin-configurable reveal threshold, so the
  number stays hidden until it is flattering.
- **Group leaderboard — and it is not just bragging rights.** The org already runs a
  **Giveback Program**: Texas A&M student organizations compete on **participation count
  in Gladiator Dash**, and the org with the most participants **in each of four
  categories wins $1,000** toward its own philanthropy or a community event. The
  categories are **Men's/Women's Organizations · Greek Life · FLOs/SLOs · Corps of
  Cadets & Other**.

  This is the single most important thing found in the live site, because it means the
  leaderboard we planned as a vanity feature is **the scoreboard for a real $4,000
  competition the org is already running by hand**. Consequences:

  - The leaderboard must be **ranked within category**, not one global list.
  - **Official groups need a category field** — one of those four — set by an admin.
  - Registration counts become the thing money depends on, so they must be **accurate
    and disputable**, not a decorative number.
  - The counts are still **registrations, never race results or timing.**

  **Org-confirmed 2026-08-24: Giveback does run again in 2027** — but the standings
  are **not to be displayed publicly yet.** Build it; keep the page unpublished or
  behind a flag until the org says go.
- ~~Family / same-purchase discount~~ — **cancelled by the org 2026-08-24.** No
  discount. Multi-runner orders are unaffected.

### Keep (in scope)

QR check-in, bib assignment **at** check-in (bibs are not pre-assigned), runner lookup
by name, walk-up registration, and a **pre-race offline backup export** — the last one
matters because of Lake Bryan's connectivity.

### Do not build

Heat staging/check-in dashboards, wrong-heat prevention, late-runner systems, live
shirt inventory, live results, a race command center, and photo matching (SWSH owns
it). Keep the admin side small — earlier planning over-detailed it. The event runs on
the honor system; do not overengineer enforcement.

### Waivers — online, and ours to carry

**Confirmed by the org: waivers are online**, acknowledged during registration. This
reverses the earlier "in-person paper only" assumption recorded in the handoff.

Consequences that follow from it:

- **RaceEntry currently provides this.** Replacing RaceEntry means the online waiver
  acknowledgment becomes our responsibility. It is not a feature we are adding; it is
  one we are inheriting.
- **It cannot live in Zeffy's hosted checkout.** Since payment happens on Zeffy's own
  page and we do not control that form, waiver acceptance must be captured **on our
  side, before the redirect**, and stored against the Registration.
- **`waiver_status` changes meaning.** `docs/plan-2026-08-20.md` modeled it as a field
  set at check-in alongside bib assignment. It is now captured at registration time,
  with day-of walk-ups still signing on site.
- **Minors need a different path.** Per the current FAQ, participants under 18 need a
  parent/guardian to sign and to run with or remain present. An online waiver flow has
  to handle that case, and it lands directly on the frictionless-checkout priority.

**One mechanism for everyone: a checkbox** (org-confirmed 2026-08-24).

This **reverses** the earlier two-path design recorded here, which had adults ticking
a box and minors requiring a real guardian signature. The org retracted the signature
requirement outright — *"I was wrong about the minors it is just a check box."*

Minors are covered by an additional acknowledgement checkbox whose exact wording the
org supplied (see `docs/event-rules-confirmed.md`); use it verbatim.

The practical effect is a real simplification: there is **no signature capture, no
signer-identity storage, no separate minor branch in the UI**, and the
guardian-signing-on-a-phone problem — previously the hardest design work in the flow —
does not exist. The family case now costs the same single tap as everyone else, which
serves the frictionless-checkout priority directly.

One thing to carry forward rather than re-litigate: a self-attested checkbox is weaker
evidence than a signature. The org has made this call and it is theirs to make; it is
worth whoever handles liability and insurance seeing the final wording once before
launch.

**Still to come:** the waiver document itself — its text and provider. The org will
supply it later; it is not on any public page and sits inside RaceEntry's current
registration form. Do not draft substitute waiver language.

Minors are a live case in their own right — the current FAQ already permits under-18
participants in the 5K with a guardian present.

### Shirts

**Confirmed: shirts are handed out day-of.** No pre-race pickup, and no live inventory
system. The current site's FAQ still advertises shirt and bib pickup two days prior —
that copy is out of date and needs replacing.

### Open decisions — do not guess

**Answered 2026-08-24** — see `docs/event-rules-confirmed.md`: the **10-minute** heat
interval (changed from 15), heat capacity (125), first heat (7:30 AM), last heat
(~1:00 PM), Arena hours (7:00 AM to 30 min after the last heat), Endurance rules (first
heat → last heat, no separate check-in), the registration close ("before the first
heat", with in-person registration continuing on race day), Competitive and
Non-Competitive being separate heats, the required-fields list, and organization roster
import (**not happening** — admins create official groups by hand).

Still open:

The **registration open date** and the exact online close time; whether **Corps heats**
are genuinely open to anyone or the label is meant to be self-policing; **per-heat
capacity overrides**; **group permissions** (who may rename or delete a group created
through the combobox); the **waiver document text**; and where the
**Zeffy/our-database line** falls for heat inventory.

Closed 2026-08-24: the waiver mechanism (checkbox for everyone), the org/outfit field
shape (searchable group select with create-on-miss), shirt sizing (required), parallel
heats (none — so a start time identifies one heat and the `/register/heat/9-30` scheme
holds), and the heat arrangement, which is now data an admin enters rather than a rule
to encode.

~~Open — whether the kids' 1K happens at all.~~ **Closed 2026-08-24: it is not
happening.** Price, age range, and the accompanying-adult-ticket question are all moot.

## Brand Commitments

- Name: **Gladiator Dash**. Organizer: **One Army**. Beneficiary: **Still Creek
  Ranch**. Presenting sponsor: **Mercuria**. These are real and must be represented
  accurately.
- Existing marks in `brand/`: full logo (`GD-Logo-26.png`) and gladiator helmet marks
  (`GD-Helmet.png`, `GD-Helmet-white.png`, `GD-Helmet-badge.png`). The helmet is the
  org's established mark.
- **Voice, as it actually exists on `@gladiatordash`:** gritty confidence with a wink
  ("WE WILL NOT BE CANCELING OUR EVENT DUE TO MUDDY CONDITIONS. SEE Y'ALL NEXT
  SUNDAY"), military-adjacent toughness balanced with genuine campus-community warmth.
  Texas A&M student vernacular is native here, not a costume.
- **Palette is pinned (org, 2026-08-20):** the site uses **the colors the org already
  uses** — deep navy ground, cyan/steel-blue accent, red used sparingly for urgency.
  This is the identity the audience already recognizes from `@gladiatordash`, and it is
  binding on every direction.
- **Standing direction preference (org, 2026-08-20): the category, read straight and
  executed at full craft.** After two rounds of foreign-world exploration, the org's
  verdict was that conceptual directions read as "concepts, not a race site." Convention
  is therefore the commitment — not a failure of nerve, a decision. Build the thing a
  visitor expects, at a craft level the category does not usually reach. No smuggled
  conceit, no ironic framing.
- **Craft bar — the three references the org named**, whose level this work must match:
  - **Spartan / Tough Mudder** — production value: full-bleed real action photography,
    heavy condensed display type, genuine physical energy.
  - **Strava / Nike Run Club** — time and numbers treated as heroes; ordinary figures
    (a heat time, a count, a rank) made to feel like achievements.
  - **Partiful / Posh** — mobile-first social invite mechanics: a link lands in a group
    chat and converts, organized around who else is going.

  The synthesis is the actual brief: a race site with athletic-data typography and
  social-invite mechanics. Beat the national race brands at the thing they are worst at,
  which is coordinating a group of friends.
- `brand/directions/` holds three earlier exploratory comps (Direction 1 was preferred).
  They remain reference and anti-reference, not a committed system; the marks, the names,
  the pinned palette, and the craft bar above are what bind.

## Evidence on Hand

Confirmed by the user as real and available — future work must use these rather than
invent substitutes:

- **Race photography** — genuine muddy, mid-effort, sunlit action shots from past
  events. The authenticity is the asset; do not replace it with polished stock.
- **Sponsors — a full, real, tiered roster** is published on the live Sponsors page:
  **Title:** Mercuria. **Arena:** Slate Construction. **Gold:** Wings N More,
  Cognascents, ELOS Water, Monte Longos, GFG Wealth, David Garner's Jewelers.
  **Silver** and **Bronze** carry roughly thirty more, a mix of local businesses and
  named family sponsors. Names are usable now; **logo files are not in the repo** and
  must be collected. Sponsorship enquiries go to `onearmy.philanthropy@gmail.com`.
- **Course map / obstacle list** — real obstacles, backing the current Obstacles page,
  and stable year to year. Usable as named, illustrated content. **Their running order
  is deliberately not published** — do not build a numbered course sequence or a
  route-revealing map out of them.
- **Written copy** — existing FAQ answers and the About/Cause story for Still Creek
  Ranch.
- **The live site itself**, `https://www.gladiatordash.com/`, is the source for all of
  the above and may be read directly.
- **Prior-event results and photos** exist and are linked externally ("GD 26"); photos
  live with **SWSH**.
- **Press coverage** exists and is citable: KBTX has covered the event in 2022, 2024,
  and 2025; TexAgs has run promotion threads. This is where the "$450,000 raised" and
  "100% of proceeds" figures come from — real, but secondhand, so confirm with the org
  before putting either on the site.
- **The current RaceEntry listing** (`raceentry.com/gladiator-dash/race-information`)
  is the source for the 5K/15-obstacle/swim-station facts and the current ticket
  categories. **The waiver is not on it** — it lives inside RaceEntry's registration
  form and still needs to be retrieved.

**Must not be fabricated:** registration counts, testimonials, participant numbers,
sponsor names beyond those confirmed, obstacle names, dollars raised, or any claim
about Still Creek Ranch. The asset files themselves are not yet in the repo — only
`brand/` is — so they must be collected before a build that depends on them.

## Product Principles

1. **The phone checkout is the product.** Every decision is judged by whether it adds
   or removes a tap or a keystroke on the registration path. Everything else is
   secondary.
2. **Coordination is the reason to exist.** Heat and group sharing is what an
   off-the-shelf platform cannot do. It gets the most care.
3. **Let Zeffy own payment; own everything before and after it.** Do not rebuild
   payment, receipts, or Apple Pay, and do not commit architecture to untested Zeffy
   behavior.
4. **Model every runner individually.** One order, many registrations — always.
5. **Build for a rotating novice team and a field with no signal.** Conventional over
   clever; offline-tolerant over live-dependent; small admin over complete admin.
6. **Honor system over enforcement.** The event trusts its participants. The software
   should not be stricter than the race is.

## Accessibility & Inclusion

No formal standard is imposed by the university or the org (confirmed). No
product-specific accessibility requirement is recorded.

Two situational needs are product facts, not preferences: the site is used **outdoors
in daylight on phones**, and by people who are **wet, muddy, and in a hurry** on race
day. Contrast and touch-target sizing carry more weight here than on a desktop
product.
