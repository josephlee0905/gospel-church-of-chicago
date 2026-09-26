# What still needs doing

Everything below is either waiting on the church, or waiting on someone to
open an account. Tick things off as they land — none of it is urgent, and
none of it stops the rest of the site working.

Anything still missing shows on the page as `[bracketed text]` in a sand
highlight, so it is obvious at a glance which pages are unfinished.

**The site is live, but hidden from Google on purpose** until this list is
done. See [the last section](#7-before-it-goes-public) for the two things
to do when you are ready.

---

## 1. Online giving — the big one

The website will never handle money itself. It links out to a giving
provider, who takes the card details, sends the receipt, and carries the
security and the liability. That is on purpose and should stay that way.

So the work is opening an account, not building anything.

**Step 1 — decide what to offer.** The suggestion was Zelle plus one card
option. Zelle costs the church nothing and most people already have it in
their banking app. The card option catches everyone else.

- [ ] **Zelle** — set up through the church's existing bank account. No
      fees at all. The catch: no automatic receipts or year-end statements,
      so the treasurer tracks those by hand.
- [ ] **One card option.** Any of these work:
  - **PayPal**, at the discounted nonprofit rate — shortest path if the
    church already has an account
  - **Tithe.ly** — built for churches, handles recurring giving and
    year-end statements on its own
  - **Givelify** — the simplest to use, common in smaller churches

**Step 2 — open it.** Whoever does this needs the church's EIN, the
501(c)(3) letter, and the church bank account details. This is a pastor or
treasurer job.

**Step 3 — send Claude the link.** One line changes and the "Give online"
button on the Give page starts working. Until then that page tells visitors
online giving is not set up yet and points them to the offering and to
checks by mail, both of which work today.

- [ ] Giving account opened
- [ ] Link handed over and the button switched on

---

## 2. The other links — `assets/js/site.js`

- [ ] **YouTube sermon playlist ID.** In a playlist address it is the part
      after `list=`. Until this is in, the Sermons page has nothing to show.
- [ ] **YouTube channel address**
- [ ] **Facebook address**, if the church uses one
- [ ] **Instagram address**, if the church uses one
- [ ] **A contact-form address**, e.g. a free one from
      [Formspree](https://formspree.io). Until this is in, the Contact page
      shows the church email address instead of a form, so nothing is broken

---

## 3. Blanks still on the pages

**Visit**

- [ ] Is parking free, and where are the accessible spaces?
- [ ] The nearest Pace stop on Golf Road, and the nearest Metra station
- [ ] Accessibility — step-free entrance, restrooms, hearing assistance
- [ ] Children — where parents check in, how the ages are grouped, and what
      happens if a child needs a parent during the service

**About**

- [ ] The exact name of Joseph Lee's seminary. It currently reads Trinity
      Evangelical Divinity School, which is a guess

**Missions**

- [ ] Missionary and partner names, or a decision to drop that section.
      There are three blank cards under "The people we support" and two
      blank updates under "Letters from the field"
- [ ] How often short-term teams actually travel. The page says every year

**Give**

- [ ] Can someone designate a gift to missions or benevolence, or does
      everything go to the general fund?

**한국어**

- [ ] The pastor's greeting, two or three paragraphs
- [ ] Rev. Duk Lee's name in Korean
- [ ] Three church prayer requests
- [ ] Directions, parking, and transit in Korean

---

## 4. Photographs — `assets/img/`

Every photograph on the site is a placeholder drawing at the moment. Real
ones make more difference to how the site feels than anything else on this
list. About 1600 pixels wide is right for the large ones.

- [ ] The congregation gathered — the large photo on the home page
- [ ] Sunday worship
- [ ] A welcome at the door
- [ ] Children's ministry
- [ ] An adult small group
- [ ] Mission partners
- [ ] A shared meal
- [ ] Rev. Duk Lee, for the About page
- [ ] Joseph Lee, for the About page
- [ ] The church logo, if there is one

---

## 5. Accounts to hand over

The brief asks that the church own everything. Before launch, confirm the
church — not an individual — holds:

- [ ] The domain name
- [ ] The hosting account
- [ ] The YouTube channel
- [ ] The giving account, once it exists
- [ ] The church email address

---

## 6. Decisions still open

- [ ] Bulletins (주보) — publish them on the site, or not?
- [ ] Photo gallery — include one, or not?
- [ ] A choir page or ministry card — the choir practises Sundays at 9:00 AM
      and is currently only listed in the weekly rhythm on the Events page
- [ ] A church email address of its own, to replace the Gmail one

---

## 7. Before it goes public

**The publishing setting is currently broken.** Drafts are not being
published, which is why there is no preview link. On GitHub, under
**Settings → Pages**, the Source must be set to *GitHub Actions*; and under
**Settings → Environments → github-pages**, deployments must not be
restricted to the `main` branch only. Until that is fixed, changes are saved
safely but nothing is published.

- [ ] Publishing setting fixed, and a preview link confirmed working

**Then, last of all, turn search engines on.** The site is reachable by
anyone with the link, but `robots.txt` currently tells Google and every
other search engine to skip it. That is deliberate: a half-finished page is
worse than no page when someone searches for the church by name.

- [ ] Open `robots.txt` and delete the line that reads `Disallow: /`
- [ ] Leave the `Disallow: /preview/` line in place — that one hides drafts
      and should stay for good

Search engines take days to weeks to notice a new site, so do this a little
before you want the church to start showing up in results.
