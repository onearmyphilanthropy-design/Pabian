# FAQ — corrections needed on the live site

Status: **draft for org review.** Prepared 2026-08-20.

## How to read this

I worked from the live FAQ at `https://www.gladiatordash.com/faq` as fetched, which
gave me the substance of each answer but **not** guaranteed word-for-word copy. So
this is not a find-and-replace patch. Each item below states what is wrong and what it
should say; someone with the live Wix editor open should apply the meaning, keeping the
site's existing voice.

Nothing here invents a new policy. Where I do not know the answer, it is listed as an
open question rather than filled in.

---

## 1. Shirt pickup — WRONG, must change

**Currently says:** T-shirt pickup begins one hour before the first wave on race day,
*and* shirts and bibs are available for pickup two days prior to the event to avoid
race-day lines.

**The problem:** the org confirmed there is **no pre-race pickup**. Shirts are handed
out day-of. The org's stated reason is that the day-of shirt line is never more than
one person long. Advertising a pickup window that does not exist will send people to a
location on a day when nobody is there.

**Should say, in substance:** shirts are handed out at the event on race day. Bibs are
assigned at check-in — they are not pre-assigned and not available in advance.

**Also note:** the "one hour before the first wave" detail is worth re-confirming. It
is plausible and may well still be true, but it came from the same paragraph as the
incorrect part, so it should not be assumed correct by association.

---

## 2. Waiver — currently CORRECT, keep it

**Currently says:** waivers were acknowledged during online registration; day-of
registrants sign a waiver acknowledging participation risks. Under-18 participants
need a parent/guardian to sign at registration and to either run with or remain
present for the minor.

**Verdict: mostly accurate, one word to watch.** The org confirmed waivers are online.
As of 2026-08-24 the mechanism is **a checkbox for everyone** — the guardian *signature*
requirement recorded earlier was retracted. The live copy's "parent/guardian to sign"
is therefore slightly stronger than what the site will actually do; soften "sign" to
"complete and agree to" so the page matches the flow. The rest — that a guardian must
run with or remain present for the minor — stays.

It is flagged here only because our own planning docs had it wrong in the other
direction — they assumed paper-only, in-person waivers. The site was right; the plan
was wrong. Both `CLAUDE.md` and `docs/plan-2026-08-20.md` have been corrected.

---

## 3. Obstacles page — the framing is wrong

**Currently says:** "All of the following obstacles and their order are subject to
change as the course is different every year."

**The problem:** that phrasing reads as *we don't know yet*. The org confirmed the
reality is different — **the obstacles are the same every year**, and it is the
**order** that is deliberately withheld. Those are opposite messages. The current
wording makes a stable, well-tested course sound improvised.

**Should say, in substance:** these are the obstacles you'll face. The order is a
race-day surprise.

That framing is also better marketing — a known set of obstacles is something a
first-timer can prepare for and a returning runner can anticipate, and withholding the
order turns a limitation into a bit of showmanship.

**Constraint for the new site:** name and show the obstacles, but never present them as
a numbered sequence, a course order, or a map that gives the route away.

---

## 4. Event date and venue — needs updating for 2027

The next event is **April 11, 2027, at Lake Bryan**. The site currently reflects the
prior cycle. Whoever updates the FAQ should confirm the date is current everywhere it
appears, not just on the homepage.

For reference, the 2026 running was Sunday, April 13, 2026, with a 2:45 PM start at
5104 TX-47, Bryan, TX — an afternoon race. **2027 is a morning race:** first heat
**7:30 AM**, last heat **~1:00 PM**, heats every **10 minutes** (org, 2026-08-24).

---

## 5. Open questions the FAQ does not currently answer

These are gaps, not errors. Each one is a question people will ask, and answering them
on the site removes email volume. None should be written until the org decides.

- **Refunds — settled 2026-08-24, and the answer is silence.** Refunds are issued on
  email request only, and the org has decided **not to advertise that anywhere on the
  site**. No refund question in the FAQ, no refund line at checkout or in the
  confirmation email. The original note is kept below for context only; it is no
  longer an open item.

  ~~No refund policy appears anywhere on the site. Registration takes money
  from students; this will be asked. Needs a decision, then a line of copy.~~
- **Shirt sizes — partly answered 2026-08-24.** Sizes **are** collected at
  registration (org-confirmed), while shirts are still handed out day-of with no live
  inventory tracking. Still unanswered, and worth a line on the FAQ: whether a size is
  guaranteed, and what happens if someone's size has run out by the time they reach
  the table.
- **The kids' 1K — rejected by the org on 2026-08-24.** Not happening, so there is no
  FAQ answer to write. Do not reintroduce it.
- **The swim station.** The race includes one swim station with an alternate route for
  people who would rather not swim, and obstacles are "challenge by choice." That is
  genuinely reassuring information for a hesitant first-timer, and it is currently
  only findable in press coverage rather than on the FAQ. Worth adding.
- **Where the money goes.** 100% of proceeds go to Still Creek Ranch — org-confirmed
  and safe to state. It is the strongest trust claim the event has and deserves a
  direct answer on the FAQ, not just a "Benefitting Still Creek Ranch" tagline. The
  lifetime figure is now confirmed too: **$1.25 million**. Use that, not the
  press-sourced $450,000 or the About page's $900,000.

---

## 6. Arrival time — WRONG as of 2026-08-24, must change

**Currently says:** arrive at least 45 minutes early, phrased relative to *your* heat.

**The problem:** the org confirmed on 2026-08-24 that **everyone arrives 30 minutes
before the first heat** — a single fixed arrival time for the whole event, not a
rolling window computed from each runner's start. With a 7:30 AM first heat that means
**7:00 AM for everybody**, whether they run at 7:30 or four hours later.

**Should say, in substance:** gates and check-in open at 7:00 AM, and all participants
should arrive then regardless of which heat they are in.

This also simplifies race-day check-in on our side: one morning rush, not a rolling
one. Worth re-confirming the intent before publishing, since asking a 12:00 runner to
show up at 7:00 is unusual and may be a rule about *check-in* opening rather than a
requirement for everyone to be on site.

---

## 7. What is verified and needs no change

Carried here so nobody re-checks them: free parking; secure gear check with a key wall
at the check-in tables, with vehicles as the alternative; bring photo ID and a wallet
for post-race food, plus a change of clothes, shoes, and a towel; 18+ to participate
unless the minor rule above applies.
