# What has to happen before this can be hosted

Prepared 2026-08-23.

## First, the distinction that matters

There are two very different things you might mean by "host this site", and they
are months apart.

**A. Put the prototype online as a brochure site.** Doable in a day. It would
look right, tell people about the race, and link out to RaceEntry or Zeffy for
actual registration. It cannot take a registration itself.

**B. Launch the real registration site.** This is a software project. What exists
today is a front end with invented data. There is no application under it.

Everything below is split accordingly.

---

## What exists today

A complete, clickable front end: home, course, Giveback, standings, sponsors,
about, raffle, FAQ, the group invite page, the registration flow, and a separate
sponsorship page. Real design, real content where it was available.

**What does not exist:** any backend at all. No database, no accounts, no
payment, no admin. Every runner name, heat time, capacity figure and leaderboard
standing is invented. The registration flow ends at a fake confirmation screen.
The link-preview cards are HTML mockups of images a server would generate.

---

## Option A, the brochure site

### Blocking

1. **Decide what "Register" does.** Point it at RaceEntry or a Zeffy form, and
   remove the heat picker, group pages and standings, which imply a system that
   is not there. Shipping those as decoration will generate support email from
   people who think they joined a heat.
2. ~~**Refund policy.**~~ **Resolved 2026-08-24:** refunds are handled by email
   only and are deliberately **not published on the site**. No refund copy
   anywhere.
3. **Obstacle count.** Your About page says 12, the RaceEntry listing says 15.
   Pick one. *Still open — org unsure as of 2026-08-24.*
4. ~~**Confirm the money claims.**~~ **Resolved 2026-08-24:** $1.25M raised,
   updated throughout. "100% of proceeds" was already org-confirmed.
5. **Content still missing:** obstacle names and photos, sponsor logo files
   (names only at present), 2027 raffle prizes and ticket price.

### Then

- Domain. You own gladiatordash.com; it points at Wix. Moving it means a DNS
  change and a decision about what happens to the Wix site.
- Hosting. Static files on Vercel, Netlify or Cloudflare Pages. Free at this
  scale, HTTPS included.
- The hero video is a 9MB unoptimised MP4. Re-encode it and serve a poster image
  first, or phone visitors on cellular will wait several seconds on a blank hero.
- Generate real Open Graph images rather than the HTML mockups.
- Accessibility and performance pass.

---

## Option B, the real registration site

### 1. Test Zeffy. Nothing else can be designed around until this is done.

The entire payment architecture is an assumption. `docs/plan-2026-08-20.md` has
an eleven-item test protocol that has never been run.

**The good news found since:** your Raffle already sells tickets through Zeffy,
so the org has a working Zeffy account today. The tests can start this week.

Two results change everything:

- **Apple Pay on Zeffy's hosted checkout.** A hard gate. If it fails, Zeffy is
  disqualified and you are looking at Stripe and its fees.
- **Correlation round-trip** — can a registration ID we generate come back to us
  after payment? If not, reconciliation becomes fuzzy matching on email and
  amount, and manual admin reconciliation becomes a first-class feature rather
  than a rare fallback.

### 2. Event decisions that block the build

None of these are technical. All of them stop the registration flow being
finishable.

**Answered 2026-08-24** (see `docs/event-rules-confirmed.md`): heat capacity is
125, first heat 7:30 AM, everyone arrives 7:00 AM, registration closes before the
first heat, Competitive and Non-Competitive are separate heats, Endurance runs
first heat → last heat with no separate check-in, Arena opens 30 min before and
closes 30 min after, the kids' 1K is rejected, there is no family discount, no org
roster import, and the Giveback Program does run in 2027 (standings stay hidden
for now).

Also answered: the heat interval is **10 minutes, not 15**; last heat **~1:00 PM**;
in-person registration continues on race day; and the org supplied its
**required-fields list**.

Also settled: the waiver is **a checkbox for everyone** (the guardian-signature rule
was retracted), the org/outfit questions are **a searchable group select that creates
a group on a miss**, **shirt sizing is required**, there are **no parallel heats**, and
some heats carry a **Corps** label shown only on the heat picker.

Still blocking:

- **Registration open date, and the exact online close time** ("before the first
  heat" — race morning up to 7:30, or an earlier fixed cutoff?).
- **Are Corps heats open to anyone?** The label is display-only today. If it is meant
  to restrict who may pick one, that is a different feature.
- **The waiver document text**, still to come from the org, and worth a look from
  whoever handles liability now that the mechanism is a checkbox.
- The waiver document itself. Confirmed: signing is online, adults tick a box,
  minors need a guardian signature. Not confirmed: the actual text, the provider,
  and whether a typed name or a drawn signature is required. It also needs
  whoever handles liability and insurance to sign off.

### 3. Software that has to be built

Roughly in dependency order:

- Database and schema (Event, TicketType, Heat, Group, Runner, Order,
  Registration).
- Heat inventory with real capacity enforcement, including holding spots for
  pending orders so two people cannot take the last place at once.
- Group creation, invite links and the join flow.
- Order and Registration records, and the Zeffy hand-off and return.
- Webhook receiver plus a reconciliation job for when webhooks do not arrive.
- Confirmation emails and QR tickets.
- Admin: event config, heat management, runner and group lookup, payment
  reconciliation, reporting.
- Race day: QR check-in, bib assignment at check-in, walk-up registration, and
  the offline export. Lake Bryan has poor signal, so the offline export is not
  optional.
- Server-generated Open Graph images per group.

### 4. Legal and privacy

- Waiver reviewed by whoever handles liability.
- A privacy note. Group pages list student names. They are set to noindex and
  link-only, but that is an implementation detail, not a stated policy.
- Terms, including the refund policy above.

---

## The honest sequence

1. Run the Zeffy tests. Cheapest thing on this list and it gates everything.
2. Settle heat rules, dates, the waiver document and the refund policy.
3. Ship Option A so the 2027 race has a real presence while the rest is built.
4. Build the registration system against confirmed answers.

Doing 4 before 1 and 2 means building on assumptions that testing may overturn,
which is exactly what `CLAUDE.md` has been holding the project back from.
