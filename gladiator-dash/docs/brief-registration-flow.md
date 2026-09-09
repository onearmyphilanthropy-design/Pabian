# Design brief — Registration flow

Status: **draft for confirmation.** Prepared 2026-08-20. No code, no visual world
committed.

**Assumptions are marked `[ASSUMED]` throughout.** Several inputs this flow depends on
are recorded as undecided in `PRODUCT.md`, and the design below is built to survive any
reasonable resolution of them rather than to wait on one. Every assumption is listed
together in §8.

---

## 1. Job and audience

**Visitor mode: Operate.** The persuasion already happened — on the group page, the
homepage, or in a friend's text. By the time someone is here they have decided to run.
This surface exists to get out of their way. Scanability, minimal typing, and zero
surprises outrank expression; the brand lives in precise details, not in personality.

**Who arrives, and from where.** Three entry points, and they are not equal:

| Entry | Known on arrival | Frequency |
|---|---|---|
| Group link (`/g/{slug}` → join) | heat **and** group | The differentiating path |
| Heat link (`/register/heat/9-30`) | heat | Shared in texts |
| Cold (`/register`) | nothing | Homepage and direct |

The flow is one sequence that can be entered at three depths. It must never make someone
re-answer something their link already established.

**Context of use:** a phone, one-handed, often mid-conversation, frequently on campus
wifi or spotty cell. The buyer may be registering only themselves, or themselves plus
three friends whose details they do not know.

**The bar to clear:** RaceEntry's current flow. Not "a good checkout" in the abstract —
specifically, fewer steps and less typing than what the org uses today.

---

## 2. Outcome and proof

**Primary action:** a completed, paid registration for one or more runners, each attached
to the right ticket, heat, and group.

**Success:** the buyer reaches Apple Pay having typed as little as possible, and returns
to a confirmation they trust.

**The promise this flow has to keep.** The group page's join button says *"Join them at
9:30."* If six screens sit behind that button, the promise is false. The group-entry
path is therefore the design target, not the fallback:

> **From group link to Apple Pay in three screens.**
> Heat and group are already known. What remains is: which ticket → who's running →
> confirm, agree, and pay.

The cold path is the same sequence with the heat step restored. It is allowed to be
longer. It is not allowed to be a different flow.

---

## 3. The redirect is the defining constraint

Everything unusual about this flow comes from one fact: **we do not own the payment
screen.** The buyer leaves our site for Zeffy's hosted checkout, uses Apple Pay there,
and comes back. Three consequences drive the design.

### 3.1 Everything must be collected before the jump

Heat, group, runner details, and the waiver all have to be captured before the redirect,
because we cannot add fields to Zeffy's page. The final screen on our side is the last
moment we control.

### 3.2 Apple Pay's autofill advantage arrives too late to help us

Apple Pay supplies name, email, and phone — but it does so **on Zeffy's page, after we
have already asked**. The ordering means we cannot use it to prefill our own form, and
naive design will ask the buyer for details Apple Pay is about to collect anyway.

**This is the strongest argument for minimal fields on our side, independent of what the
org decides.** Ask only for what Zeffy cannot tell us: which tickets, which heats, which
group, who the runners are, and waiver acceptance. Let Zeffy and Apple Pay own buyer
contact details. Duplicating them is pure typing tax on the one path that matters most.

### 3.3 The handoff must feel deliberate

The buyer is about to land on a page that carries someone else's branding. Unannounced,
that reads as a broken link or a scam — particularly to a student about to enter payment
details. The transition needs an explicit, calm handoff that names where they are going
and what comes back. Not an interstitial to click through; a line of context on the
button that does it.

---

## 4. Selected direction

**Visual authority: expand Direction 1 ("Field Ops")**, consistent with
`docs/brief-group-invite.md`. Not committed — formalizing the world is a separate
`new-work` step. Everything structural here survives a change of skin.

### Structural thesis: one sequence, three entry depths, nothing asked twice

**The canonical sequence**

1. **Ticket** — what are you running?
2. **Heat** — when? *(skipped entirely for Arena; not applicable to Endurance)*
3. **Runners** — who's coming?
4. **Group** — running with anyone? *(pre-filled and confirmed, not asked, on the group path)*
5. **Review, waiver, pay** — the last screen we own.
6. → Zeffy → Apple Pay → return
7. **Confirmation.**

Steps 1–5 collapse as the entry point supplies answers. A group-link arrival skips 2 and
4 outright, landing at three screens.

### Ticket selection: four choices and a toggle, not six SKUs

Six ticket types is a long scroll on a phone, and four of them differ only by two
attributes. Collapse the taxonomy instead of listing it:

- **Choose a format:** Competitive · Non-Competitive · Endurance · Arena.
- **Then one student toggle** adjusts price, appearing only for Competitive and
  Non-Competitive (Endurance and Arena are flat-priced). Student status is honor-system,
  so this is a toggle, never a verification step.

Four cards and one switch produce all six SKUs, and the toggle makes the student
discount *visible as a saving* rather than hidden inside a list of near-identical rows.

### Runners: a list you add to, with inheritance

Runner one defaults to the buyer `[ASSUMED]`, with an explicit way to say "I'm not
running." Each additional runner **inherits ticket type and heat from runner one** and
can override both. Completed runners collapse to a one-line summary so a four-runner
order stays scannable.

**The friction that will actually break this flow** is a buyer who doesn't know their
friends' shirt sizes or birthdays. Since the required field set is undecided, the design
assumes **name is required per runner and everything else is completable later**
`[ASSUMED]`, via a link emailed to each runner. This keeps checkout short regardless of
how the org resolves the field question, and degrades gracefully if more fields become
mandatory — they move into the follow-up, not the critical path.

### The waiver: one checkbox, no exceptions

**Updated 2026-08-24.** Everyone gets a checkbox — the org retracted the earlier
"minors require a real guardian signature" rule. Placed on the final screen, bound into
the same action as payment: "agree and pay," not a separate step.

The minor case is covered by an acknowledgement checkbox alongside it, using the org's
exact wording (see `docs/event-rules-confirmed.md`). There is **no signature path, no
minor branch, and no separate guardian screen** — the design problem this section used
to be about no longer exists, and the family case now costs the same one tap as
everyone else.

**Focal moment:** the final button. It carries the total, the payment method, and the
destination in one control — the buyer commits and leaves in a single tap.

---

## 5. Scope and boundaries

**Fidelity:** production-ready multi-screen flow, mobile-first at a 390px baseline, with
a desktop treatment.

**In scope:** all screens from entry through confirmation, the three entry paths, the
handoff and return, the waiver step, promo/discount presentation, and every state in §6.

**Out of scope:** Zeffy's checkout page (not ours), the group invite page (briefed
separately), walk-up/admin registration, and the follow-up "complete your details" screen
— related, but its own surface.

**Anti-goals:**

- **No account creation.** No runner accounts exist. Never introduce one here.
- **No rebuilt payment UI.** Zeffy owns payment; do not imitate a card form.
- **No embedded checkout.** Apple Pay must not be assumed to work in an iframe.
- **No seven-step progress bar.** Progress indication should make the flow feel short,
  and a long stepper advertises the opposite.
- **Never ask for what Zeffy or Apple Pay will collect anyway.**

---

## 6. States and ranges

**Ranges:** 1 runner (most common), 2–4 (families and friend groups), up to ~10 in one
order for a captain buying a block `[ASSUMED]`. Mixed orders are real — two Competitive
plus one Arena in a single purchase — and the heat step must apply to only the runners
who need it.

### Entry and selection

- **Heat already full on arrival** via a stale shared link. Say so immediately and offer
  the nearest open heat, matching the group page's behavior.
- **Arena-only order** — the heat step does not render at all, rather than rendering as
  skipped.
- **Endurance** — no heat selection; starts with the first heat of the day.
- **Registration not yet open / closed.**
- **All heats full** — only Arena remains purchasable.
- **Promo code invalid, expired, or already used.**

### The redirect boundary — where the real design work is

- **Abandoned at Zeffy.** Buyer never comes back. The pending order and its held spots
  expire on a TTL.
- **Payment failed.** They return without a payment. The order must still be there, fully
  filled in — never make someone re-enter four runners because a card declined.
- **Paid, confirmation unknown.** Webhook reliability is unverified, so this is a
  first-class state, not an edge case. The confirmation screen must separate two truths:
  **"your spot is recorded"** (we know — we created the rows) from **"payment
  confirmed"** (we may not know yet). Show the registration as secured with a quiet
  pending-payment note that resolves on its own. Never a bare spinner; a spinner on a
  payment screen reads as failure.
- **Hold expired while paying — the nightmare state.** The buyer lingered on Zeffy's
  page, our TTL released their spots, and then payment succeeded. They have paid for a
  heat they no longer hold.

  **Rule: never release a hold for an order carrying any payment signal, and when the
  conflict happens anyway, honor the payment and over-fill the heat.** Capacity is soft;
  money is hard. Flag it for an admin rather than telling someone who has paid that they
  have no spot. A heat one runner over is a non-event. A charged card with no
  registration is the worst failure this system can produce.

- **Returning to a finished order** — refreshing or re-opening the confirmation link
  shows the same confirmation, never a duplicate purchase.

---

## 7. Interaction and layout

**Typing minimization is the craft brief here.** Concretely:

- Native inputs only, with correct `autocomplete`, `inputmode`, and `enterkeyhint`. No
  custom date or select widgets — the OS keyboard and pickers are faster than anything
  built here.
- Segmented controls over dropdowns for small sets (shirt size, ticket format).
- Aggressive, visible defaults: same heat and ticket for every added runner, group
  carried from the link, buyer as runner one.
- Derive rather than ask — never request a fact already implied by the entry point.

**Hierarchy per screen:** one decision per screen, the decision at the top, the
continuation control fixed and reachable by thumb. The running total stays visible from
the moment a ticket is chosen — students are price-sensitive, and a total that appears
only at the end feels like a trap.

**Progress:** show it, keep it short, and label steps by name rather than number so the
group path visibly *is* shorter rather than appearing to skip ahead.

**Back and resume:** every step is reversible without data loss, and the pending order
survives a closed tab up to the hold TTL.

**Responsive:** phone is the design case. Desktop keeps the same single-column sequence
with a persistent order summary beside it — never a stretched mobile column.

**Motion:** functional only. Step transitions should orient, not perform. Respect
`prefers-reduced-motion`.

**Accessibility:** no formal standard applies, but this is a payment path used outdoors
in daylight. Errors must be text, adjacent to the field, and never color-only. Touch
targets sized for wet hands and hurry.

---

## 8. Constraints, assumptions, and open decisions

### Binding

- Zeffy hosted checkout, never embedded. Apple Pay is the priority payment method.
- Pending Order + unpaid Registrations created **before** redirect, carrying a
  `correlation_id`.
- Waiver captured on our side before the redirect. Adults checkbox, minors guardian
  signature.
- **Order → many Registrations.** Each runner is an individual record with their own
  ticket, heat, group, bib, and check-in status.
- Capacity enforced by our database, with pending-order holds on a TTL.

### Assumptions this brief makes `[ASSUMED]`

Each is a design decision made in the absence of an org decision. Correct any of them and
the affected part changes; none invalidates the structure.

1. **Name is the only per-runner field required at checkout**, with the rest completed
   later. Drawn from the priority on frictionless mobile checkout and from §3.2. This is
   the assumption most worth confirming.
2. **The buyer is usually a runner**, so runner one defaults to them with an opt-out.
3. **Orders reach about ten runners** at the top end.
4. **Zeffy accepts a pre-selected ticket and returns our correlation id.** Feasibility
   tests 3 and 4 in `docs/plan-2026-08-20.md` decide this. If test 4 fails,
   reconciliation becomes fuzzy matching and the confirmation screen's "payment
   confirmed" state gets materially weaker — worth knowing before this is built.
5. **Zeffy owns discount application**, with promo codes surfaced but not calculated by
   us. Untested (test 8).

### Open decisions a builder must not invent

- **Required runner fields** — the assumption above is a placeholder, not an answer.
- **Heat capacity**, first and last heat times, and the Competitive vs Non-Competitive
  schedule. The heat step cannot be finished without them.
- **Registration open and close dates.**
- **The hold TTL.** Apple Pay completes in seconds, so a short window is viable, but the
  number is a real decision with the nightmare state in §6 attached to it.
- ~~Family / same-purchase discount mechanics~~ — **cancelled 2026-08-24.** There is no
  discount. Multi-runner orders still exist; nothing is applied on top of them.
- ~~The kids' 1K~~ — **rejected 2026-08-24.** Not happening. There is no fourth format.
- **Whether the waiver is per-runner or per-order for adults.** The guardian rule is
  settled; the adult checkbox's granularity is not.
