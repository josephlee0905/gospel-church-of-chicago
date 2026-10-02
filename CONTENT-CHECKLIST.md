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

**The church has chosen Zeffy** (zeffy.com), after comparing the options.

Why it won: it is the only one where a $100 gift arrives as $100 — every
other platform takes between 1% and 2.9% plus a fixed amount per gift. And
it issues IRS tax receipts automatically, including year-end cumulative
receipts, which the church would otherwise be producing by hand.

The catch, so nobody is surprised by it later: Zeffy makes its money by
asking *donors* to add an optional tip at checkout. The church is never
charged. Some givers find being asked mildly irritating; most add something.

**What is needed before signing up:**

- [ ] The church's **EIN**
- [ ] The **church logo** — Zeffy will not generate tax receipts without
      one, so this is a genuine blocker rather than a nice-to-have
- [ ] The **church bank account** details, for payouts

**Signing up** — a pastor or treasurer job, not a volunteer one:

- [ ] zeffy.com → **Sign up** → United States → **501(c)(3)**
- [ ] Enter the EIN and upload the logo
- [ ] Connect the church bank account
- [ ] Create a donation form, and turn on **automatic tax receipts**
- [ ] Send Claude the form's link

**Then:** one line changes and the "Give online" button starts working. Until
then that page tells visitors online giving is not set up yet and points them
to the offering and to checks by mail, both of which work today.

---

## 2. The other links — `assets/js/site.js`

- [x] ~~YouTube sermon playlist ID~~ — in place.
- [x] ~~Sermons on the site.~~ One recent sermon plays on the Sermons page
      and the home page, with a button through to the full playlist.

      Why not the whole playlist: YouTube will not play a playlist on another
      website if any video in it has embedding switched off, and the church's
      playlists hold 60, 40 and 35 videos, most of them older ones where it
      is off. Studio's **Select all** only ticks the page you are looking at,
      about 30 at a time, so bulk edits fix a page and leave the rest.

- [x] ~~Keeping the sermon current.~~ Every Monday morning, GitHub reads the
      church's YouTube channel, finds the newest **Sunday** service, checks it
      will actually play on another website, and puts it on the site.

      It reads the channel rather than a playlist, because the old 주일예배
      playlist stopped being updated in 2020 while the services carried on
      being streamed to the channel. It picks out Sunday by looking for
      주일예배 in the title, so the Wednesday and Friday services are left
      alone. If the church ever changes how it titles them, this job needs
      changing with it.

      It never puts up a video that cannot play, and if it cannot reach
      YouTube it fails loudly rather than quietly.

      To run it now: **Actions** → *Use the newest Sunday sermon* → **Run
      workflow**. To switch it off: delete
      `.github/workflows/newest-sermon.yml`, and the site keeps whichever
      sermon it was last given.

- [ ] **Optional: get the whole playlist playing.** Work through every page
      of Content → Uploads *and* Content → Live, Select all → Edit →
      Embedding → On, one page at a time until all of them are done. Worth it
      only if someone has the patience.
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

**한국어 — the whole Korean site now needs reading**

There is now a complete Korean site: the same nine pages as the English one,
so a Korean-speaking visitor never has to read English to find anything.

- [ ] **Rev. Duk Lee should read all nine Korean pages before launch.** This
      is the most important thing left on this list. The Korean was written
      here from what the church has described — it is not a translation of
      the English pages, and it is not machine-translated — but it goes out
      under his name and he should correct anything that is not how he would
      say it. The pages are 홈, 교회 소개, 예배 안내, 사역, 선교, 설교, 행사,
      헌금 and 연락처
- [ ] Two things in particular are worth his eye: the six statements of
      faith on 교회 소개, and the old church names on the same page
      (장성장로교회 → 임마누엘교회 → 오네스교회 → 가스펠 교회). **장성장로교회 is
      a guess** — the 2006 filing gives the English as Korean Jang-Sung
      Presbyterian Church, but nobody has said how the church wrote it in
      Korean

**About**

- [x] ~~The bulletin gives his name as Rev. Duk **Shin** Lee.~~ Confirmed —
      the English pages now say Rev. Duk Shin Lee. The Korean pages already
      said 이덕신, which was the clue
- [x] ~~The founding name.~~ The 2006 filing settles it: the church was
      incorporated as **Korean Jang-Sung Presbyterian Church**, and the About
      page now says so

**Missions** — from reading the church's own mission posts

- [x] ~~Is Panama still right?~~ No — it was a misremembering, and it has
      been taken off the page. The Missions page now names Brazil, Paraguay
      and Costa Rica, with Mexico in a line below them
- [x] ~~Pakistan.~~ The church no longer supports that work, so it stays off
      the page
- [x] ~~Who is the man beside Rev. Lee in the Brazil photograph?~~ A local
      pastor. The hidden description now says so
- [x] ~~Names for the mission partners.~~ The church would rather not name
      them. The page describes the work without naming anyone, which is also
      the safer choice for people serving overseas

---

## 4. Photographs — `assets/img/`

**Only photographs taken after November 2024.** The church split that month,
so anything older shows people who are no longer part of this congregation.

The 교회포토 gallery on gospelchurch1.com is almost entirely pre-split — the
newest church photo in it is from 2022. The **mission** posts are the
exception: those run to September 2026 and are being used. Worth checking
that gallery again whenever new photographs are posted there.

Real photographs make more difference to how the site feels than anything
else on this list. About 1600 pixels wide is right for the large ones.

- [ ] The congregation gathered — the large photo on the home page
- [ ] Sunday worship
- [ ] A welcome at the door
- [ ] Children's ministry
- [ ] An adult small group
- [ ] A shared meal
- [x] ~~Photographs from the mission trips~~ — five, taken from the church's
      own mission posts: Brazil (Sept 2026), Paraguay (2025), Costa Rica
      (2025), plus Rev. Lee preaching in Brazil and a training seminar for the
      page header. No usable photograph exists yet for Mexico or Panama
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

## 5b. Before the Zoom links go public

The Events page now carries both Zoom links. Before the site is made live,
one of these should happen:

- [ ] **Change the English service passcode from `123`.** A three-digit
      passcode printed next to the link on a public page protects nothing.
      Use a longer one, or
- [ ] **Turn on a waiting room** for both meetings in Zoom, so a host lets
      people in. This is the better answer: it works no matter who finds the
      link, and regulars still click straight through

Churches running open daily prayer meetings do get targeted by people who
find the link and join to disrupt it. A waiting room costs the host one
click per person and ends the problem.

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
