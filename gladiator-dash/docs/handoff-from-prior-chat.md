# Gladiator Dash Website — Project Handoff

## Project Overview

We are planning a custom website for **Gladiator Dash**, a mud run put on by a nonprofit student organization.

The website's most important job is race registration. The registration experience should be extremely simple on mobile, with **Apple Pay** being a major priority.

Event:
- Name: Gladiator Dash
- Date: April 11, 2027
- Venue: Lake Bryan
- Registration opens: TBD
- Registration closes: TBD

Do NOT start wireframing yet. We are still planning the system and requirements.

---

# Core Registration Goal

The desired experience is roughly:

Register
→ Choose ticket
→ Choose available heat if applicable
→ Group/organization association
→ Minimal runner-specific information
→ Payment through Zeffy / Apple Pay
→ Confirmation

The registration experience should minimize typing wherever possible.

Multiple runners must be able to register in one checkout.

Discount/promo codes should be supported.

When a heat reaches capacity, nobody else should be able to purchase that heat.

Runners should NOT be able to change their own heat after registering.

Admins may eventually need the ability to manually modify registrations.

---

# Ticket Types and Prices

There are six ticket types:

1. Competitive — Student: $30
2. Non-Competitive — Student: $25
3. Competitive — Non-Student: $35
4. Non-Competitive — Non-Student: $30
5. Endurance: $40
6. Arena: $10

Student status is currently based on the honor system.

No student email verification is needed at this point.

---

# Race Formats

## Competitive

Competitive runners participate in timed/start heats.

Competitive heats are expected to operate on the normal 15-minute heat system.

Exactly how Competitive and Non-Competitive heats are scheduled relative to one another has NOT been decided.

Possible future solution:
- Competitive block followed by Non-Competitive block
- Alternate them
- Other schedule

No decision yet.

---

## Non-Competitive

Non-Competitive runners also use normal heats.

Heats start every 15 minutes.

Heat capacity is TBD.

First heat is TBD.

Final heat is TBD.

Exactly how Competitive vs Non-Competitive heats interact is TBD.

---

## Endurance

Endurance does NOT use normal repeated heats.

Endurance begins when the first race heat starts.

Endurance participants can continue racing for as long as they want during the event.

Conceptually:

Endurance start = first heat of the day

They are not selecting among 15-minute heats like normal runners.

Exact details of Endurance registration/scheduling are still TBD.

---

## Arena

Arena does NOT use heats.

Arena simply gives someone access to the pre-race / post-race event area.

Arena participants should completely skip the heat-selection portion of registration.

Arena schedule/access times are still TBD.

---

# Heat System

Known:
- Normal heats occur every 15 minutes.
- A heat should disappear/become unavailable once it reaches capacity.
- Runner capacity per heat is TBD.
- Individual heat capacity overrides may eventually exist.
- First heat time is TBD.
- Last heat time is TBD.

Potentially shareable URLs should exist for individual heats.

Example:

gladiatordash.com/register/heat/9-30

Opening one of these links should automatically direct someone toward registering for that specific heat.

This makes it easy for someone to text friends:

"I'm running at 9:30. Register here."

---

# Groups / Organizations

Groups are an important part of the website because organizing a large group of friends through GroupMe/text can be difficult.

We decided that "organization" and "group" can effectively use the same underlying system.

There can potentially be two group types:

### Official Group

Created in advance by event admins.

Examples:
- Student organizations
- Fraternities
- Sororities
- Sports clubs
- Other campus organizations

### Custom Group

Created by a runner.

Examples:
- Mud Boys
- Roommates
- Families
- Friend groups

The database can represent both using the same basic Group object.

---

# How Groups Should Work

A runner should NOT have to create a group before choosing a heat.

The preferred concept is:

Runner chooses/registers for a heat
→ They can create a group
→ They receive a shareable group link
→ Friends open that group link
→ They can see which group members are registered for which heats
→ The website makes it easy to join the same heat

Example link:

gladiatordash.com/g/mud-boys-X82K

Example group page:

Mud Boys

9:30 AM
- Jacob P.
- Ryan M.
- Connor B.
- Sam T.

9:45 AM
- Luke C.
- Matt R.

The group page should show abbreviated names such as:

Jacob P.

rather than full names by default.

A group can contain people across multiple heats.

The group itself should NOT force everyone into a single heat.

---

# Group Heat Recommendation

When someone opens a group invite, the site should make the most useful heat obvious.

Example:

Your friends are running at 9:30 AM

Jacob P.
Ryan M.
Connor B.

17 spots remaining

[ Join them at 9:30 AM ]

Other heat times ↓

If the group's original/default heat fills up, the page should show other heats containing members or nearby available heats.

The point is to reduce coordination effort.

---

# Group Sharing

After registering, someone should be able to easily share something like:

"I'm running Gladiator Dash at 9:30 AM. Join my group and run with me:
gladiatordash.com/g/mud-boys-X82K"

A Share button should make this easy on phones.

---

# Organization Membership

There was discussion about importing organization rosters.

Potential roster fields:

First Name
Last Name
TAMU Email
Organization

Phone numbers probably cannot be obtained, so do NOT design around phone-number verification.

Email could potentially be used later.

However, this feature is NOT finalized.

Possible future behavior:

jacob@tamu.edu
→ One Army
→ Wakeboarding
→ Fish Camp

The website could know someone's organization memberships while still allowing them to choose one primary group they are "running with."

Important distinction:

A person can BELONG to multiple organizations.

Their race registration should still have one primary Group for coordination purposes.

Example:

Jacob belongs to:
- Organization A
- Organization B

Jacob is running with:
- Organization A

Heat:
- 9:30 AM

Do not publicly reveal someone's organization memberships merely from typing their name.

If organization membership verification is ever implemented, email verification is preferred over name-only identification.

This feature can remain optional/TBD.

---

# Payment Platform

The organization qualifies for **Zeffy**.

Zeffy is preferred because it can offer qualifying nonprofits:
- $0 platform fees
- $0 transaction fees
- $0 card processing fees

Apple Pay is supported by Zeffy.

Apple Pay is a major requirement.

---

# Important Zeffy Constraint

Do NOT assume Zeffy works like Stripe.

Zeffy is not currently intended to act as a fully programmable standalone payment processor inside a completely custom checkout.

The zero-fee payment needs to happen through Zeffy's own form/payment flow.

Also:

Apple Pay should NOT be assumed to work inside an embedded Zeffy iframe/form.

Current plan should assume:

Our website
→ Zeffy checkout page
→ Apple Pay
→ Return to our website

Rather than:

Our website with embedded Zeffy checkout iframe

---

# Zeffy Integration Strategy

The preferred architecture, if technically possible:

## Our Website Owns

- Public website
- Ticket discovery
- Heat-selection UX
- Available heat display
- Group system
- Organization system
- Shareable group links
- Shareable heat links
- Runner coordination features
- Additional admin features
- Custom race-day tools
- Our own application database as necessary

## Zeffy Owns

- Actual payment
- Apple Pay
- Credit/debit card payments
- Transaction processing
- Payment receipts
- Potentially ticket capacity
- Potentially QR event tickets/check-in

Exactly where the line between our system and Zeffy's registration system will be drawn has NOT been finalized.

---

# Zeffy Integration Needs to Be Tested Later

The user cannot test Zeffy yet.

When testing becomes possible, create a small fake event instead of the full event.

Example:

Two heats:
- 9:00 AM
- 9:15 AM

Two fake ticket types.

Need to investigate:

1. Can Zeffy represent dozens of 15-minute race heats cleanly?

2. Does Apple Pay work correctly on the full Zeffy checkout page?

3. Can our website send someone into Zeffy with the correct ticket/heat already selected?

4. After payment, can our website reliably determine:
   - Who paid
   - What ticket they purchased
   - Which heat they selected
   - Which runner(s) were included in a multi-runner purchase
   - Payment status
   - Zeffy transaction/payment ID
   - Discount code
   - Custom field answers

5. Can Zeffy's API/webhooks notify our server after payment?

Desired behavior:

Zeffy payment completed
→ our database automatically marks registration paid/confirmed

6. Most importantly, can we reliably connect:

Our website registration ID
↔
Zeffy transaction

Example:

Website registration #8472
=
Zeffy payment XYZ123

This needs to be proven before making major architectural decisions.

7. Can one purchase contain multiple runners and expose each runner individually?

Example:

One transaction:

Jacob
Competitive Student
9:00

Ryan
Competitive Student
9:00

Luke
Non-Competitive Student
9:15

Our system needs individual runner records, not just one buyer record.

8. Test discount codes.

9. Test post-payment redirect back to our website.

10. Test refund/cancellation behavior.

Do NOT design critical backend behavior around assumptions about Zeffy until these are tested.

---

# Runner Information

The goal is to collect as little information as necessary.

Earlier discussion included potentially collecting:

- Name
- Email
- Shirt size
- Date of birth / age
- Emergency contact
- Group
- Ticket
- Heat

Exactly which fields are required is NOT finalized.

Apple Pay / Zeffy may provide some contact/payment information, so avoid duplicating fields unnecessarily.

---

# Waiver

Currently, waivers are handled IN PERSON.

Do not add an online waiver to the core registration workflow yet.

The organization may continue using paper/in-person waivers.

Possible race-day status:

Waiver:
- Complete
- Not complete

But the exact waiver tracking implementation is not finalized.

Do not remove the existing in-person waiver process without checking with whoever handles liability/insurance.

---

# Multi-Runner Purchases

A purchaser SHOULD be able to register multiple runners in one purchase.

Ideally:
- Each runner can potentially have their own ticket type.
- Each runner can potentially have their own heat.
- The UI may default everyone to the same heat to make family/group checkout easier.

Exact UX has not been finalized.

The backend must model each runner individually even if one person pays for everyone.

Suggested conceptual model:

Order
- Buyer
- Zeffy transaction
- Total

Registrations
- Runner A
- Runner B
- Runner C

Each Registration has:
- ticket
- heat if applicable
- group
- bib eventually
- check-in status

---

# Admin Side

Do NOT build a giant complex admin system.

The earlier planning became too detailed.

Keep the first version focused.

Core admin capabilities likely needed:

### Event Configuration
- Event name
- Event date
- Venue
- Registration open/close dates
- First heat
- Final heat
- Heat interval
- Default capacity
- Individual heat capacity
- Ticket types
- Ticket prices
- Ticket-to-heat rules
- Arena access schedule
- Endurance setup

### Heat Management
- View heats
- View number registered
- View remaining capacity
- Open/close a heat
- Change heat capacity
- View runner list
- Possibly manually move/add a runner

### Runner Management
Search by:
- Name
- Email
- Registration ID
- Group
- Heat
- Ticket
- Bib

View basic registration/payment/check-in information.

### Group Management
- View groups
- Create official groups
- Rename groups
- Remove inappropriate groups
- Merge duplicate groups if necessary
- View group membership

### Payments
At minimum be able to reconcile:
- Registration
- Payment status
- Zeffy transaction ID
- Amount
- Refund status

Zeffy may remain the primary interface for actual payment/refund operations.

### Reporting
Useful basic totals:
- Total registrations
- Registrations by ticket type
- Registrations by heat
- Heat fill percentage
- Registrations by group
- Revenue
- Promo code usage

Avoid overengineering analytics initially.

---

# Race-Day Features — KEEP

The event does NOT need a huge race operations platform.

Keep these:

## QR Check-In

This is wanted.

Runner receives a QR/e-ticket.

At check-in:

QR scanned
→ runner found
→ mark runner checked in

If QR doesn't work:

Search runner by name/email.

Zeffy may already be able to provide QR tickets/check-in, so investigate using Zeffy instead of building our own scanner.

---

## Bib Assignment at Check-In

Bibs are NOT preassigned.

At check-in:

Runner checks in
→ volunteer grabs bib
→ bib number is associated with runner

Example:

Jacob P.
Bib 184

This makes it possible to later associate race information with the runner.

---

## Basic Runner Lookup

Useful if someone cannot find their QR code.

Volunteer searches runner name and checks them in manually.

---

## Walk-Up Registration

Potentially useful.

Someone arrives without registering.

Staff should be able to:
- Register them
- Select an available ticket/heat
- Take payment
- Assign bib
- Check them in

Zeffy may be able to handle in-person/Tap-to-Pay payments, but this can be investigated later.

---

## Offline Backup

KEEP THIS.

Before race day export a backup containing:
- Runners
- Ticket
- Heat
- Group
- Bib if assigned
- Basic registration status

Could be:
- CSV/Excel
- Printable roster
- Locally stored file

This protects against internet/cellular problems at Lake Bryan.

---

# Race-Day Features — DO NOT BUILD

These were explicitly rejected as unnecessary:

- Heat-specific check-in dashboard
- Heat staging dashboard
- Wrong-heat prevention
- Late-runner handling system
- Emergency runner lookup system
- Live shirt inventory
- Live race results
- Group race-day tracking
- Complex race command-center dashboard

The event generally operates on the honor system.

Do not overengineer enforcement.

---

# Shirts

Shirts are simply handed out.

No live shirt inventory system is needed.

Runner shirt size may still need to be collected during registration for ordering/planning.

---

# Photo Matching

Do NOT build photo matching.

The organization plans to use **SWSH** for photo matching.

The website may eventually link to SWSH/photos, but SWSH handles the actual matching.

---

# Race Results

Live results are NOT needed as part of this project right now.

Competitive timing/results may exist separately.

Do not prioritize results infrastructure.

---

# Public Website Pages

The planned public website pages are:

- Home
- Register
- Course
- FAQ
- Sponsors
- About / Cause
- Results / Photos
- Contact

This overall page structure was approved.

Do NOT wireframe them yet.

---

# Suggested Data Model

This is conceptual only and can change after Zeffy testing.

## Event

Fields:
- id
- name
- date
- venue
- registration_open
- registration_close

## TicketType

Fields:
- id
- name
- price
- category
- student/non-student
- requires_heat
- active

Examples:
Competitive Student
Non-Competitive Student
Competitive Non-Student
Non-Competitive Non-Student
Endurance
Arena

## Heat

Fields:
- id
- event_id
- start_time
- type
- capacity
- registrations_count
- active

Only normal Competitive / Non-Competitive racing uses repeated heats.

Arena does not use heats.

Endurance should probably be modeled separately or as a special event start rather than dozens of heat records.

## Group

Fields:
- id
- name
- slug/invite_code
- type: official/custom
- created_by
- active

Example:

/g/mud-boys-X82K

## Runner

Fields TBD.

Potential:
- id
- first_name
- last_name
- email
- shirt_size
- DOB/age
- emergency contact

Avoid storing unnecessary information.

## Registration

Important object.

Possible fields:
- id
- runner_id
- event_id
- ticket_type_id
- heat_id nullable
- group_id nullable
- payment/order ID
- payment status
- checked_in
- bib_number
- waiver status if eventually tracked

## Order

Useful because one buyer may purchase multiple registrations.

Possible:
- id
- buyer
- Zeffy transaction ID
- total
- payment status

Order:
→ many Registrations

---

# Important UX Principle

The entire site should be designed mobile-first.

Ideal experience from a shared group link:

Friend receives link
→ opens group page
→ sees where friends are running
→ taps "Join them at 9:30"
→ chooses appropriate ticket
→ enters minimal runner info
→ Apple Pay
→ registered

The group/heat coordination system is one of the most valuable custom features of this website.

The website should solve:

"What time did everyone register for?"

without requiring people to coordinate manually in GroupMe/text.

---

# Important Engineering Principle

Avoid building features Zeffy already handles well.

Especially consider letting Zeffy own:
- Payments
- Apple Pay
- Payment receipts
- Possibly ticket capacities
- QR tickets
- QR check-in

Our website should concentrate on what is unique about Gladiator Dash:
- Better registration discovery
- Heat coordination
- Group coordination
- Shareable group links
- Shareable heat links
- Organization support
- Custom branding
- Simplified admin tools

---

# Current Open Decisions

Do not guess these yet:

- Registration opening date
- Registration closing date
- First normal heat time
- Final heat time
- Heat capacity
- Individual capacity overrides
- Exact Competitive vs Non-Competitive heat schedule
- Which ticket types can access which exact heats
- Arena access hours
- Exact Endurance rules beyond starting with the first heat
- Exact required runner fields
- Organization roster functionality
- Group permissions/details
- Exact Zeffy integration architecture
- Whether Zeffy or our database owns heat inventory
- Exact walk-up process

---

# Immediate Next Planning Question

The biggest unresolved event-design question is:

How should Competitive and Non-Competitive heats interact?

Known:
- Normal heats are every 15 minutes.
- Endurance begins with the first heat and continues.
- Arena has no heat.

Competitive vs Non-Competitive scheduling still needs to be decided.

Do not wireframe or start building the production application until the major event rules and Zeffy integration boundaries are clearer.
