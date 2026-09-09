# Zeffy test runbook

How to actually run the feasibility tests in `plan-2026-08-20.md`. Budget about
an hour. You need one person with Zeffy admin access and an iPhone.

## Before you start

**You already have a Zeffy account.** The Raffle sells tickets through Zeffy, so
there is no sign-up step and no waiting on nonprofit verification. That is the
single biggest reason this can happen this week.

You need:

- **Zeffy admin login.**
- **An iPhone with a card in Apple Wallet**, and Safari. Apple Pay cannot be
  tested on a desktop, in Chrome on Android, or in a simulator.
- **A webhook catcher.** Open <https://webhook.site> in a browser tab. It gives
  you a unique URL instantly, no account, and shows every request that hits it
  in real time. That URL is what you paste into Zeffy wherever it asks for a
  webhook or notification endpoint.
- **A real card.** Zeffy moves real money. Test purchases are real charges.
  Price test tickets at the lowest amount Zeffy allows and refund yourself at
  the end, which is test 10 anyway.

## What Zeffy's own docs already answer (checked 2026-08-24)

Found before running the tests, from Zeffy's help centre. Saves testing three things
and changes how two others have to be run.

- **Campaign type is "Event".** `New campaign → Event`. Not the Raffle's type.
- **Custom questions can be asked per guest, not just per buyer.** The section is
  called **"Collect Buyer and Guest Information"**, and it lets you "add questions to
  collect information from each guest or to the buyer", applied to all ticket types or
  specific ones. **This is a strong signal test 7 passes** — a multi-runner purchase
  can carry per-runner answers rather than just a quantity. Confirm it in practice.
- **The redirect/thank-you URL is NOT self-serve.** Zeffy configures it *by support
  request*: you email them your form URL and destination URL and wait for confirmation.
  **Consequence: file that request on day one**, because until support enables it you
  cannot test the return-URL leg of test 4 at all. Zeffy's docs say nothing about
  whether any parameters get appended to that redirect, which is exactly what test 9
  needs to find out.
- **No native webhook settings are documented.** The event campaign's advanced settings
  cover a target thermometer, check payments, notification emails, and form
  translation — no webhooks. Zeffy's integration path appears to be Zapier. Treat
  "there is no webhook field" as the likely answer to test 6 rather than as a failure
  to find one, and confirm.

**What this does to test 4.** Two of its three hiding places are now sequenced
differently: the **custom question + CSV export** legs can be tested immediately, but
the **return URL** leg is blocked until Zeffy support enables the redirect. Run the
first two now; come back to the third.

### Who types the registration ID? — the flaw in the obvious plan

The tempting answer to correlation is "put our registration ID in a custom question."
**It only works if a machine fills that field.** A student on a phone will not type a
UUID, and asking them to would violate the one priority this project has. So the
registration-ID approach lives or dies on one question:

**Can a Zeffy custom question be prefilled from the checkout URL, or set as a hidden
field?** Zeffy's help centre documents neither. That is not proof they don't exist, but
an undocumented behaviour is not something to build reconciliation on. **Ask support
directly** — see the email below.

**If prefill exists:** correlation is solved cleanly. Our site generates the ID, embeds
it in the checkout link, the field fills invisibly, and it comes back in the export.

**If it does not:** the registration-ID mechanism is dead, and the real correlation key
is **email + amount + timestamp** — the buyer's email is data Zeffy already collects
for the receipt, so it costs no extra typing. That is fuzzier, and it makes an admin
reconciliation screen a real feature rather than a rare fallback.

### A new test this raises: which email does Apple Pay hand over?

If we fall back to email matching, the whole scheme rests on the email in Zeffy being
the same one the runner typed on our site. **Apple Pay supplies its own name and email
from the Apple ID**, which is very often not the address a student types into a form.
If Zeffy records the Apple ID address instead, email matching silently degrades right
in the case we care most about — the phone-first Apple Pay path.

**Test it explicitly:** on the test purchase, type one address into our-side/buyer
fields and check which address actually lands in Zeffy's export. Record both.

### Rejected: one Zeffy campaign per ticket type

Test 3 failed, so the obvious workaround is six separate Zeffy campaigns — one per
ticket type — which guarantees pre-selection because each form has only one thing to
select. **Do not do this.**

A buyer can only check out of one form at a time. A friend group buying one Competitive
Student, one Non-Competitive Student and one Competitive Non-Student would face **three
separate checkouts, three payments, three receipts** — and one registration on our side
would map to three unrelated Zeffy transactions, making correlation harder than it
already is. That breaks the Order → many Registrations rule in `CLAUDE.md`.

Mixed-type orders are not an edge case: both Competitive and Non-Competitive exist
precisely because friends run at different intensities.

**Keep one Zeffy form carrying all six ticket types.** The cost is one extra tap —
the buyer re-picks their ticket on Zeffy after picking it on our site. Unavoidable
anyway, since Zeffy must know what to charge.

### Ask Zeffy support directly — one email, four questions

You have to email them about the redirect anyway. Bundle it:

1. Please redirect form `<URL>` to `https://gladiatordash.com`.
2. Does the redirect append any parameters — transaction ID, order ID, anything?
3. Can a custom question be prefilled from the checkout URL, or configured as a hidden
   field set by the link?
4. Is there an API or webhook for retrieving transactions programmatically, or is
   Zapier the only integration path?

Their answers to 2–4 decide the reconciliation design, and cost one email.

## Set up the test event

Make a **new event**, separate from the Raffle. Do not experiment on anything
live. If Zeffy offers unlisted, private or draft, use it; if not, give it an
obviously fake name like `ZZ TEST DO NOT BUY` so nobody registers by accident.

Inside it create:

- **Two ticket types** — call them `Test Competitive` and `Test Non-Competitive`.
- **Two heats**, `9:00` and `9:10` — *for the test only.* Test 2 asks whether Zeffy
  **could** represent heats, not whether it should. **It should not:** decided
  2026-08-24 that heats are never Zeffy items, because a heat does not change the
  price, so Zeffy has no reason to know they exist. Production Zeffy carries the six
  ticket types only. Run test 2 anyway — it is two minutes and tells us what we gave
  up — but a failure here is now a non-event.
  Try it as separate ticket types first, then as a variant or option on one
  ticket if Zeffy has that concept.
- **One promo code**, any code, any discount. *Lower priority than when this was
  written* — the family/same-purchase discount was cancelled on 2026-08-24, so no
  planned feature depends on promo codes today. Still worth two minutes if you have
  them, for sponsor comps and future use.
- **A custom question** on the checkout form labelled `Registration ID`. This is
  what test 4 hangs on.
- **A return URL** pointing at anything you control, even
  `https://gladiatordash.com`. You are checking whether the field exists and
  what Zeffy appends to it.

## Run the tests

Do 1 and 4 first. They are the two that can change the plan. If you run out of
time, having done those two is most of the value.

### 1. Apple Pay — the hard gate

On the **iPhone, in Safari**, open the public checkout link for your test event
and buy a ticket.

- Does an **Apple Pay** button appear?
- Does the purchase complete with Face ID / Touch ID?

**If Apple Pay does not appear or does not work, stop.** That result
disqualifies Zeffy for this project, because a phone-first checkout with Apple
Pay is the whole premise. Tell the team before anyone builds anything else.

While you are on that screen, also note: **does Zeffy ask the buyer to add a
voluntary contribution to Zeffy?** That is how Zeffy funds its zero fees. It is
not a dealbreaker, but it is an extra decision in front of a student trying to
register, and we should know it is there before designing around it.

### 4. Correlation round-trip — the most important one

Buy another ticket. This time:

- Add something identifiable to the checkout link, e.g.
  `...your-zeffy-link...?ref=TEST-12345`
- And type `TEST-12345` into the `Registration ID` question.

Then hunt for `TEST-12345` in three places:

1. The **URL you land on** after paying.
2. The **webhook.site tab**, if a webhook fired.
3. The **CSV/Excel export** from Zeffy's dashboard.

Record which of the three it appears in. If it appears in **none**, that is the
result with the largest consequences: matching a payment back to a registration
would fall back to guessing from email, amount and timestamp, and manual
reconciliation becomes a feature we have to build rather than a rare fallback.

### The rest

| # | Test | What to record |
|---|---|---|
| 2 | Heats as items | Can 2 heats x 2 tickets be distinct, trackable items? Would 30+ heats be sane to administer this way? |
| 3 | Pre-selection | Does a link land on the right ticket already chosen, or on a generic page? |
| 5 | Data retrieval | For one purchase, which of these come back: buyer name, email, ticket, heat, payment status, transaction ID, promo code, custom answers |
| 6 | Webhooks | Does anything reach webhook.site on purchase? On refund? How long after? |
| 7 | Multi-runner | Buy 2+ tickets in one transaction. Can you tell the runners apart afterwards, or just see a quantity? |
| 8 | Promo codes | Does the discount apply, and is the code visible after payment? |
| 9 | Return URL | Is it configurable, and what parameters does Zeffy append? |
| 10 | Refunds | Refund your test purchases. Does a webhook fire? Does the export show it? |
| 11 | Tap to Pay | Optional. Does Zeffy do in-person card payments? Relevant to walk-up registration. |

Test 10 doubles as getting your money back. Do it last.

## Record the results

Fill this in as you go — do not save it for the end, and do not trust memory for the
correlation test. Screenshots of the checkout and of any webhook payload are worth more
than a description.

**Test run by:** ______ **Date:** ______ **Zeffy test event name:** ______

| # | Test | Pass / Fail / Partial | What actually happened |
|---|---|---|---|
| 1 | **Apple Pay** (hard gate) | **PASS** (reported 2026-08-24) | Org reports Apple Pay works on Zeffy. Confirm it appears on a **ticketing** form specifically, not only the Raffle form — you get this for free when you buy the test 4 ticket on your phone. |
| 1b | Voluntary Zeffy tip shown to buyer? | | |
| 4 | **Correlation round-trip** | | |
| 4a | → `TEST-12345` in the **return URL**? | | |
| 4b | → in the **webhook**? | | |
| 4c | → in the **CSV export**? | | |
| 2 | Heats as distinct items | | |
| 3 | Link pre-selects the right ticket | **FAIL — low impact** (2026-08-24) | The URL never changes while selecting a ticket; Zeffy keeps form state off the URL, so there is no link that lands pre-selected. **Resolution: keep ONE Zeffy form with all six ticket types and accept one extra tap.** The one-campaign-per-ticket-type workaround was considered and rejected — see below. |
| 5 | Data retrieval — which fields come back | | |
| 6 | Webhook fires (purchase / refund / delay) | | |
| 7 | **Multi-runner** — 2 tickets, told apart? | | |
| 8 | Promo code (low priority) | | |
| 9 | Return URL configurable + appended params | | |
| 10 | Refund — webhook? export? | | |
| 11 | Tap to Pay (optional) | | |

**Field-level results for test 5** — tick what actually came back for one purchase:

- [ ] buyer name  - [ ] buyer email  - [ ] ticket type  - [ ] heat
- [ ] payment status  - [ ] transaction ID  - [ ] promo code  - [ ] custom question answers
- [ ] timestamp  - [ ] amount

**Anything Zeffy calls by a different name than this runbook expects:**

_______________________________________________

## What the results decide

- **Test 1 fails** → Zeffy is out. Reconsider Stripe, and accept its fees.
- **Test 4 fails** → the architecture holds, but reconciliation gets materially
  weaker and admin reconciliation becomes a real feature to build.
- **Test 2 fails** → we own heat inventory entirely in our own database, which
  is the recommended default anyway. Not a crisis.
- **Test 6 fails** → no instant auto-confirmation. The return redirect plus a
  polling job becomes the primary mechanism rather than the backup.
- **Test 7 fails** → we collect every runner's details ourselves before payment
  and stitch them together with our own ID. Already the plan's assumption.

Only test 1 can end the approach. Everything else shifts work around.

## One caveat

I have not used Zeffy's admin interface, so the exact menus and field names
above are described by what to look for rather than where to click. If something
does not exist under the name given here, note what it is called instead. That
is useful information in itself.
