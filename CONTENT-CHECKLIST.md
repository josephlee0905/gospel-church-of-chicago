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

- [x] ~~YouTube sermon playlist ID~~ — in place. New sermons added to that
      playlist appear on the site by themselves.
- [x] ~~YouTube channel address~~ — @gospelchurchofchicago3850
- [x] ~~Facebook and Instagram~~ — the church uses neither
- [x] ~~A contact form~~ — the church prefers the email address, so the
      Contact page shows that instead

---

## 3. Blanks on the pages — all filled

There is no highlighted text left anywhere on the site. What remains here is
optional, and the pages read properly without any of it.

**Visit**

- [ ] Where exactly are the accessible parking spaces?
- [ ] Is there any hearing assistance in the sanctuary? Left off the page
      rather than claimed, since it was never confirmed
- [ ] Children — the page keeps this general for now. Where parents check in,
      how the ages are grouped, and what happens if a child needs a parent
      can be added whenever the church wants

**한국어**

- [ ] Rev. Duk Lee should read the greeting, the three prayer requests and
      the directions and correct anything that is not how he would say it.
      They were written here from what the church has described, not
      translated from the English pages

**About**

- [ ] The bulletin gives his name as Rev. Duk **Shin** Lee. The English pages
      say Rev. Duk Lee. Which does he use in English?

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
- [ ] A shared meal
- [ ] Photographs from the mission trips — one each for the Brazil, Mexico
      and Panama cards on the Missions page
- [x] ~~Rev. Duk Lee, for the About page~~
- [x] ~~Joseph Lee, for the About page~~
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

- [x] ~~Publishing setting fixed.~~ Two settings had to agree: **Settings →
      Pages → Source** set to *GitHub Actions*, and **Settings → Environments
      → github-pages → Deployment branches and tags** set to *No restriction*.
      Worth remembering that switching Pages on re-creates the environment and
      puts the branch restriction back, so that one may need setting twice.

**Then, last of all, turn search engines on.** The site is reachable by
anyone with the link, but `robots.txt` currently tells Google and every
other search engine to skip it. That is deliberate: a half-finished page is
worse than no page when someone searches for the church by name.

- [ ] Open `robots.txt` and delete the line that reads `Disallow: /`
- [ ] Leave the `Disallow: /preview/` line in place — that one hides drafts
      and should stay for good

Search engines take days to weeks to notice a new site, so do this a little
before you want the church to start showing up in results.
