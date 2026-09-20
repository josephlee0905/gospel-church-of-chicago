# Moving this site to Squarespace

Two questions this answers: **which plan to buy**, and **how to get the
content across**.

> Prices and plan names below were checked in September 2026. Squarespace
> replaced its old Personal / Business / Commerce tiers in late 2025, and
> published prices vary by source and by promotion. Confirm the figures at
> checkout before committing.

---

## 1. Which plan

Squarespace now sells four plans: **Basic, Core, Plus, Advanced**. Plus and
Advanced exist for high-volume online stores. This church is not selling
anything — giving goes out to an existing platform — so the choice is only
between the bottom two.

| | **Basic** | **Core** |
| --- | --- | --- |
| Billed annually | about **$16–19/mo** (~$190–230/yr) | about **$23–29/mo** (~$280–350/yr) |
| Billed monthly | about $25/mo | about $36/mo |
| People with logins | **2** | unlimited |
| Custom CSS editor | yes | yes |
| Code injection / custom scripts | **no** | yes |
| Pages, forms, events, video embeds | yes | yes |
| Free custom domain for the first year | yes | yes |

### The recommendation: start on Basic, billed annually

Everything this site needs is on Basic. Nothing in the design depends on
code injection — that was deliberate. The Korean page is an ordinary page,
not a translation plugin, so it needs no scripts. Sermons are a YouTube
embed. The contact form and the map are native blocks. Events are a native
collection.

**The one thing that decides it is how many people need logins.** Basic caps
that at two. If the pastor, the church secretary, and a volunteer all need
their own account, that is three, and you need Core.

Two practical notes:

- **You can move up later without rebuilding.** Upgrading from Basic to Core
  is a billing change, not a migration. This is a real advantage over Wix,
  where changing template means starting over — which the brief already flags.
- **Avoid sharing one login between volunteers.** It is the cheap-looking
  option that goes wrong: no way to see who changed what, and no way to
  remove one person's access when they move on. If more than two people will
  ever edit the site, pay for Core.

### Reducing the cost

- **Pay annually.** It is roughly a third cheaper than monthly and includes
  the free domain year.
- **Ask for the nonprofit discount.** Entering `NONPROFIT` in the promo code
  field at checkout has been taking about 10% off the first payment, and
  TechSoup offers a similar discount to verified nonprofits. Neither is large,
  but both are free to try.
- **Build during the free trial.** The trial costs nothing and takes no card.
  Do all the work described below inside it, and only pay when the site is
  ready to go live.

### Worth knowing before you commit

This repository already runs free on GitHub Pages, with HTTPS included. Over
five years, Squarespace costs roughly **$1,000–1,750** against roughly **$75**
for a domain name alone.

What that money buys is a visual editor and independence from anyone who
understands HTML. For a church relying on volunteers who turn over, that is
usually worth it — the brief reached the same conclusion, and this document
assumes it. But it is worth saying out loud, because the difference is a
meaningful line in a small church's budget.

---

## 2. How to port the content

### The honest answer first

**Squarespace cannot import a static HTML site.** Its importers cover
WordPress, Blogger, Tumblr, and a few store platforms. There is no tool that
will turn this repository into a Squarespace site.

That sounds worse than it is. The work that usually makes a migration
expensive is *deciding what the site says* — and that is already done. Every
page here is finished prose in a finished structure. Porting is copying
settled text into a visual editor, one page at a time. For nine pages, expect
**a long afternoon**, not a project.

This is also why the freelance budget in the brief ($300–600) should land at
the low end: whoever does the setup is not writing content or designing a
structure, only rebuilding one that exists.

### Before anything else: find out who controls the domain

The brief says the church must own its account, domain, and subscription.
That phrasing suggests it may not today.

**Do this first, before paying for anything.** Find out who the registrar for
`gospelchurch1.com` is and who can log in. Everything downstream depends on
it, and it is the one step that can stall for weeks while you track down a
former volunteer.

Three outcomes:

- **The church can log in.** Good. Either transfer the domain to Squarespace
  (the free-domain year applies to a transfer, and it puts the domain in the
  church's own account) or leave it where it is and point its DNS at
  Squarespace. Transferring is tidier; pointing DNS is lower risk if the
  current registrar also handles the church's email.
- **Someone else controls it but is reachable.** Ask them to transfer it to a
  church-owned registrar account now, while the old site still works.
- **Nobody can get in.** Register a new domain — `gospelchurchchicago.org` or
  similar — in a church-owned account and use that. Better a clean start than
  a site the church cannot move.

### The order of work

Do these in order. The risky step is last, on purpose.

1. **Start a free trial** and pick a template. The brief suggests *Cove* or
   *Safe Haven*. Either is fine — since Squarespace 7.1 all templates share
   one engine, so a template is a starting layout, not a commitment, and
   switching later does not mean rebuilding.
2. **Set the site styles once.** Fonts, colours, button shapes. The palette
   is at the top of `assets/css/styles.css` — evergreen `#245243`, sand
   `#C2A275`, cream `#FBF7F0`, ink `#241F1A` — and Squarespace takes the same
   hex codes. Doing this first means every page you build afterward already
   looks right.
3. **Fill in the business information** — address, phone, email, social
   links. These are the same values as the top of `assets/js/site.js`.
4. **Create the nine pages plus the Korean page**, then build the navigation:
   the eight from the brief in the main menu, Contact and 한국어 in the footer.
5. **Paste the content**, page by page, using the mapping table below.
6. **Set up the footer once.** Squarespace footers are site-wide, so the
   address, phone, email, and the 한국어 link are entered a single time —
   exactly like `site.js` does here.
7. **Add the redirects.** The old site's address is
   `gospelchurch1.com/index.php`. Add a URL redirect from `/index.php` to `/`
   so old links and search results still land somewhere.
8. **Check it on a phone.** Squarespace has a mobile preview. Look at the
   home page, the Korean page, and the events list in particular.
9. **Only now, buy the plan and connect the domain.** Squarespace issues a
   free SSL certificate automatically, which fixes the current site's missing
   HTTPS. Leave the old site running for a week or so afterward while DNS
   settles.

### What goes where

| In this repository | In Squarespace |
| --- | --- |
| Each `.html` page | One page, built from section blocks |
| Headings and paragraphs | Text blocks — paste as plain text, then style |
| The arched photographs | Image blocks; the arched shape is a built-in image mask |
| `assets/img/` | Upload to the Squarespace image library |
| Settings at the top of `site.js` | Site business information + footer |
| The menu list in `site.js` | Main navigation |
| `youtubePlaylistId` | A video block, or an embed block with the playlist link |
| `givingUrl` | A button block linking out. **Do not** enable Squarespace commerce for this — the brief rules out custom payments, and a store would change the plan you need |
| Each entry in `events.js` | One event in a native Events collection — the fields match one for one: title, date, time, location, description, image, link |
| `contact.html`'s form | A native form block, set to email the church address |
| `#site-map` | A map block, with the same address |
| `ko/index.html` | One ordinary page at `/ko`, linked from the header and footer. No translation plugin — that would need code injection and a Core plan |
| `404.html` | Squarespace has a built-in 404 page; copy the wording across |
| `[bracketed placeholders]` | Nothing. These must be replaced with real content first — see `CONTENT-CHECKLIST.md` |

### Two things not to carry over

- **Do not paste the HTML into code blocks.** It would appear to work and
  would then be uneditable by exactly the volunteers this is all for. Rebuild
  the pages from native blocks.
- **Do not recreate the settings file.** Its whole purpose is to stop one
  fact from living in nine places. Squarespace solves the same problem with
  site-wide footers and business information — use those instead.

---

## 3. After the move

Keep this repository. It stops being the website and becomes three useful
things:

- **A record of the content**, in plain text, that nobody needs a Squarespace
  login to read.
- **A backup.** If the church ever leaves Squarespace, the site is still here
  and still deployable for free.
- **A staging copy**, if anyone wants to draft a wording change before making
  it live.

Add a line to the top of `README.md` noting the live site has moved, so the
next person is not confused about which is real.

If the church decides **not** to move, nothing here is wasted: the site as it
stands is complete, free to host, and served over HTTPS by GitHub Pages.
`EDITING.md` is written for exactly that case.

---

## Sources

Checked September 2026:

- [Squarespace pricing overview — Website Builder Expert](https://www.websitebuilderexpert.com/website-builders/squarespace-pricing/)
- [Basic vs Core plan comparison](https://mehdiouss.medium.com/squarespace-basic-vs-core-plan-which-one-is-right-for-your-website-0a962bfc0702)
- [Squarespace Basic plan guide — JPK Design Co](https://www.jpkdesignco.com/blog/squarespace-basic-plan-review)
- [Add custom code to your site — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/205815928-Add-custom-code-to-your-site)
- [Importing and exporting content — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/205814028-Importing-and-exporting-content)
- [Moving your existing site to Squarespace — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/115006390227-Moving-your-existing-site-to-Squarespace)
- [Free Squarespace domain offer — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/206541787-Free-Squarespace-domain-offer)
- [Squarespace nonprofit pricing](https://www.mehdiaoussiad.com/blog/squarespace-pricing-for-nonprofits)
