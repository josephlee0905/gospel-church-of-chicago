# Gospel Church of Chicago

The website for Gospel Church of Chicago — English-first, with a short Korean
section — built from the project brief in
`GCC_Website_Project_Brief_Aug30_v4.pptx`.

**For volunteers updating the site, everything you need is in
[EDITING.md](EDITING.md).**

---

## What this is

A plain, static website: HTML, one stylesheet, and two small settings files.
There is no build step, no framework, and nothing to install. Editing a file
and saving it is the whole workflow.

That is a deliberate choice. The brief asks for a site a non-technical
volunteer can maintain and that could move to Squarespace later, so this
repository is built to be readable, previewable, and easy to lift onto a
hosted platform.

## Previewing it

**On GitHub Pages** — in this repository, go to **Settings → Pages**, set
**Source** to *Deploy from a branch*, choose the branch you want to preview
and the `/ (root)` folder, and save. The site appears at
`https://<owner>.github.io/gospel-church-of-chicago/` within a minute or two.

Every link on the site is relative, so it works from that sub-folder without
any configuration.

**On your own computer** — open `index.html` in a browser. Sermons, events,
and the map need a small local server rather than a bare file, so for the
full experience run this from the project folder:

```
python3 -m http.server 8000
```

then open <http://localhost:8000>.

## The pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| About Us | `about.html` |
| Visit | `visit.html` |
| Ministries | `ministries.html` |
| Missions | `missions.html` |
| Sermons | `sermons.html` |
| Events | `events.html` |
| Give | `give.html` |
| Contact | `contact.html` |
| 한국어 | `ko/index.html` |
| Not-found page | `404.html` |

The brief's site map lists eight pages in the main menu. Contact is the
ninth page — the brief specifies one under *Core pages* — and it is reached
from the footer of every page and from the Visit page, keeping the top menu
to the eight in the sketch.

## How it is put together

```
index.html … contact.html   One file per page. Page text lives here.
ko/index.html               The Korean page.
404.html                    Shown for a mistyped address.
assets/css/styles.css       Every colour, font and spacing rule.
assets/js/site.js           SETTINGS + the shared header and footer.
assets/js/events.js         The event list.
assets/img/                 Photographs (placeholders for now).
```

Three ideas keep maintenance low:

1. **Facts live in one place.** The service time, address, phone, email,
   giving link, YouTube playlist, and the menu are all set once at the top of
   `assets/js/site.js`, and appear on every page from there. There is no page
   where the phone number can go stale.
2. **The header and footer are shared.** They are written once in
   `assets/js/site.js`, so adding a page to the menu is a one-line change,
   not nine.
3. **Events expire on their own.** Each event carries a date, and the site
   only ever shows events still to come. Nothing has to be tidied up after
   Christmas.

Anything not yet supplied by the church is written in `[square brackets]` and
highlighted in sand on the live site, so unfinished content is obvious in a
preview rather than hidden. Search the repository for `tbd` to list them all.
[CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md) is the list of what the church
still needs to provide.

## Deliberate limits

- **No payments.** The Give page is a button to the church's existing giving
  platform. Card details are never handled by this site.
- **No sermon uploads.** Sermons are a YouTube playlist embed, so a sermon
  posted to YouTube appears here with no further work.
- **No contact-form server.** The form posts to a free form service named in
  the settings file. Until one is set, the page shows an email address
  instead of a form that would silently fail.
- **No external fonts or libraries.** The site uses fonts already on the
  reader's device, so there is nothing to keep up to date and nothing that
  can break when a third party changes.

## Moving to Squarespace later

This site is a working preview, not a lock-in. It maps onto Squarespace
directly:

- **Content** — each page here becomes one Squarespace page. The sections are
  ordinary blocks of headings, paragraphs, and images, so they paste straight
  into Squarespace's editor.
- **Settings** — the values at the top of `assets/js/site.js` are exactly the
  fields Squarespace asks for during setup (business address, contact
  details, social links).
- **Sermons** — the same YouTube playlist ID goes into a Squarespace video
  block.
- **Events** — Squarespace has a native Events collection; the fields in
  `assets/js/events.js` (title, date, time, location, description, image,
  link) match it one for one.
- **Contact form and map** — both are native Squarespace blocks, so the
  form service in the settings file is no longer needed.
- **한국어** — Squarespace handles a secondary language as an additional
  page, which is how it is built here.

The brief recommends a church template such as *Cove* or *Safe Haven*. The
design in this repository — warm evergreen and sand, serif headings, arched
photographs — was drawn to sit comfortably inside either of them.
