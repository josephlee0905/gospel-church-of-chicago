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

**Zelle is live on the Give page now.** The church's Zelle QR code is on both
Give pages, in the church's legal name, Oneness Church of Chicago. Scanned
from a computer it opens the giver's bank app; tapped on a phone it opens
Zelle's "find your bank" page. The code was checked to scan correctly off
the page itself, and it holds no personal phone number or email.

- [ ] **Zelle gifts need recording by hand for year-end statements.** Zelle
      sends no receipt and keeps no donor list for the church. The sender's
      name shows in the church's bank account; whoever prepares the year-end
      giving statements needs to pick those gifts up from there

**Card giving and automatic tax receipts are still to come.** For that the
church has chosen Zeffy (zeffy.com), after comparing the options. When it
exists, a "Give by card" button appears next to the Zelle code.

Why it won: it is the only one where a $100 gift arrives as $100 — every
other platform takes between 1% and 2.9% plus a fixed amount per gift. And
it issues IRS tax receipts automatically, including year-end cumulative
receipts, which the church would otherwise be producing by hand.

The catch, so nobody is surprised by it later: Zeffy makes its money by
asking *donors* to add an optional tip at checkout. The church is never
charged. Some givers find being asked mildly irritating; most add something.

**What is needed before signing up:**

- [x] ~~The church's **EIN**~~ — on the 2001 IRS determination letter, which
      the church has. Not written down here on purpose: this repository is
      public, and a church does not file Form 990, so the number is not
      already sitting in the usual public records
- [ ] The **church logo** — Zeffy will not generate tax receipts without
      one, so this is a genuine blocker rather than a nice-to-have. There is
      no logo to reuse: the old website brands itself with text and colour
      only, and carries no logo file at all
- [ ] The **church bank account** details, for payouts

**Check the name against IRS records before applying.** Three names are in
play, and only one of them is right for the form:

| Name | Where it comes from |
| --- | --- |
| Gospel Church of Chicago | what the church calls itself today |
| Oneness Church of Chicago | the Illinois legal name, filed in 2006 |
| Korean Jang-Sung Presbyterian Church | the name on the 2001 IRS letter |

The 2006 name change was filed with **Illinois**. The IRS letter says in its
own words that the church should tell the IRS of any change of name, and
nobody here knows whether that was ever done. If it was not, IRS records may
still show the 1991 name against that EIN — and Zeffy, like a bank, checks
the name against IRS records.

- [ ] Look up the EIN at the IRS Tax Exempt Organization Search
      (apps.irs.gov/app/eos) and see which name comes back. Use that name on
      the Zeffy form. It cannot be looked up automatically; the IRS blocks it
- [ ] If the IRS still has the old name, filing the change with the IRS is
      worth doing anyway, whatever happens with Zeffy

**Signing up** — a pastor or treasurer job, not a volunteer one:

- [ ] zeffy.com → **Sign up** → United States → **501(c)(3)**
- [ ] Enter the EIN and upload the logo
- [ ] Connect the church bank account
- [ ] Create a donation form, and turn on **automatic tax receipts**
- [ ] Send Claude the form's link

**Then:** one line changes and a "Give by card" button appears on the Give
page, beside the Zelle code. Until then there is simply no card button —
Zelle, the Sunday offering and checks by mail all work today.

---

## 1b. Prayer requests and the connect card — done

- [x] ~~Both Google Forms made~~ in the church's account,
      gospelchurch1250@gmail.com, and linked from the site:
      - **Prayer request** — https://forms.gle/aSoHW8noEVgsNBJv8 — the
        Contact page and the Korean home page
      - **Connect card** — https://forms.gle/GpNKn7hmW9f3aTRFA — the Contact
        and Visit pages
      Both questions and wording, in English and Korean, were checked against
      the plan, and both forms were opened by a visitor who is not signed in to
      Google: they show every question and a Submit button straight away.
- [ ] Optional: in each form, **Responses → ⋮ → Get email notifications for
      new responses**, so a new prayer request lands in the church inbox

**If anyone edits these forms later**, two settings must stay as they are, or
the prayer form stops being anonymous:

- **Settings → Responses → Collect email addresses → Do not collect**
- **Settings → Responses → Limit to 1 response → off** (if on, people must
  sign in to Google, which tells you who they are)

To edit them: sign in as gospelchurch1250@gmail.com and go to
forms.google.com. Changing the questions there never needs a website change;
the site only holds the two links, in `assets/js/site.js`.

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

- [ ] **Keeping the sermon current — starts working at launch, not before.**
      Every Monday morning, GitHub reads the church's YouTube channel, finds
      the newest **Sunday** service, checks it will actually play on another
      website, and puts it on the site.

      **It has not run yet, and cannot until the site is launched.** GitHub
      only runs a scheduled job from the `main` branch, and this job — like
      everything else built so far — is still on the preview branch. Until
      launch, the sermon is updated by hand. It was last set to the
      11 October 2026 service.

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
- [ ] On the same page, Joseph Lee is now **영어부 리더** (English Ministry
      leader), no longer 부목사. Worth Rev. Lee confirming that is the term
      the church uses in Korean

**About**

- [x] ~~The bulletin gives his name as Rev. Duk **Shin** Lee.~~ Confirmed —
      the English pages now say Rev. Duk Shin Lee. The Korean pages already
      said 이덕신, which was the clue
- [x] ~~The founding name.~~ The 2006 filing settles it: the church was
      incorporated as **Korean Jang-Sung Presbyterian Church**, and the About
      page now says so

**Missions** — from reading the church's own mission posts

- [x] ~~Is Panama still right?~~ No — it was a misremembering, and it has
      been taken off the page. The Missions page names Brazil, Paraguay,
      Costa Rica and Mexico
- [ ] **The medical mission to Mexico.** The church remembers one, but there
      is no post about it anywhere on gospelchurch1.com. Searched: both
      mission categories, every church-photo page, and the words 의료, 치과,
      진료, medical, dental and clinic. The three Mexico posts (2019 and 2020)
      are pastors' conferences. If photographs exist off the website, send
      them and the Mexico card can be rewritten around them
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

**There are no placeholder drawings left anywhere on the site.** Every
picture is now a real photograph. What follows is about quality, not gaps.

- [x] ~~The congregation gathered~~ — on the home page, About and Ministries
- [x] ~~Children's ministry~~, ~~an adult small group~~, ~~a shared meal~~
- [x] ~~The church building from Golf Road~~ — taken from the old site's
      교회안내 page, and the only photograph there with nobody in it, so the
      split does not affect it. It is the Contact page header
- [x] ~~**Sunday worship**~~ — a service seen from the back of the sanctuary,
      choir in front, is now on the Visit page (Your first Sunday) and, cropped
      wide to show the *Offering Prayer* screens, as the Give page header
- [x] ~~Retreat photos replaced~~ with photos from church, taken this past
      year: two moments of the church praying over expecting parents (About
      header, Events header), the New Year's Eve service (About, and the
      Adults cards), and a teaching session in the fellowship hall (the Young
      Adults cards). The congregation photo had been on six pages; it is now
      only the home page's main photograph, which was kept on purpose
- [x] ~~**Children**~~ — the Children cards and the Ministries header now show
      the children at the front of the sanctuary singing with a teacher, in
      place of the retreat photo by the fireplace. The same photo, uncropped,
      is also the Visit and Sermons header
- [ ] The Visit page's "Coming with kids" photo is still from the retreat
- [ ] **A welcome at the door** — still missing
- One photo offered was not used: the long line of members reading Scripture
  at the front. It is a screenshot of a video, so it is blurry, and a row of
  the computer's taskbar icons runs across it at head height. The original
  photo or video file would be worth having
- [x] ~~Photographs from the mission trips~~ — five, taken from the church's
      own mission posts: Brazil (Sept 2026), Paraguay (2025), Costa Rica
      (2025), plus Rev. Lee preaching in Brazil and a training seminar for the
      page header. No usable photograph exists yet for Mexico or Panama
- [x] ~~Rev. Duk Lee, for the About page~~
- [x] ~~Joseph Lee, for the About page~~
- [ ] The church logo, if there is one

---

## 4b. The website's address — gospelchurchofchicago.org

**Decided:** the new site will be **gospelchurchofchicago.org**. It was
unregistered when checked on 26 October 2026. The old site at
gospelchurch1.com is being retired.

**1. Buy it** (about 10 minutes) — at **porkbun.com**, $7.98 the first year,
then $11.84 a year:

- [ ] Search **gospelchurchofchicago.org** and add the .org result to the cart.
      Say no to any extras (email, hosting, website builder) — none are needed.
      Privacy for the owner's details is free and included
- [ ] Create the account with the church's email, **gospelchurch1250@gmail.com**,
      so the church owns the name, not a person. Turn on two-step sign-in when
      offered
- [ ] Owner details: organization **Oneness Church of Chicago** (the legal
      name), 1250 E. Golf Road, Des Plaines, IL 60016. These stay private
- [ ] Pay, ideally with a church card
- [ ] Make sure **Auto Renew** is on. If the name ever lapses, the site goes dark

**2. Point it at the website** (about 5 minutes, in Porkbun):

- [ ] Domain Management → **DNS** next to the name
- [ ] Delete the records Porkbun adds by default (they point at a "parked" page)
- [ ] Add four records, each **Type A**, **Host** left blank:
      `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- [ ] Add one record: **Type CNAME**, **Host** `www`, **Answer**
      `josephlee0905.github.io`
- [ ] Tell Claude it is done

**3. On launch day** (Claude, with one GitHub setting from the church): tell
GitHub Pages to use the name, turn on HTTPS, and change every page's
canonical link from the github.io address to the new one. Previews then live
at gospelchurchofchicago.org/preview/<branch>/.

**4. Retiring gospelchurch1.com:** it is paid until 8 January 2027. Once the
new site is live, set it at Gabia/Cafe24 to **forward** to the new address and
let it run until it expires, so old bulletins and bookmarks still arrive
somewhere. Before switching, save anything on the old site worth keeping —
bulletins, mission posts, photos.

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

Both Zoom links now appear on the **home page** as well as the Events page,
and every page has a strip at the top pointing to them — so they are much
easier to find than before, by members and by anyone else. They are set in
one place, `assets/js/site.js`. Before the site is made live, one of these
should happen:

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
