# Gospel Church of Chicago

The website for Gospel Church of Chicago — English-first, with a short Korean
section — built from the project brief in
`GCC_Website_Project_Brief_Aug30_v4.pptx`.

**Updates are made by asking Claude Code.** The guide it follows is
[CLAUDE.md](CLAUDE.md). [EDITING.md](EDITING.md) explains the same changes
for anyone who would rather edit the files by hand.

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

**On GitHub Pages** — in this repository, go to **Settings → Pages** and set
**Source** to *GitHub Actions*. Every change pushed to `main` is then checked
and published automatically, and the site appears at
`https://<owner>.github.io/gospel-church-of-chicago/` within a minute or two.
Pushing any other branch publishes a draft under `/preview/` instead, leaving
the live site untouched — see *Publishing* below.

Every link on the site is relative, so it works both from that sub-folder and
from a custom domain at the root, with no configuration either way.

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
assets/css/styles.css       Every color, font and spacing rule.
assets/js/site.js           SETTINGS + the shared header and footer.
assets/js/events.js         The event list.
assets/img/                 Photographs (placeholders for now).
.github/                    The automatic check. Nothing to edit here.
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
4. **A broken edit cannot take the site down.** Every change is checked before
   it goes live — see *Publishing* below.

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

## Publishing

Two destinations, from one repository:

| Branch | Where it goes |
| --- | --- |
| `main` | The live site, and the church's domain once it is connected |
| any other branch | A private draft at `<site>/preview/<branch-name>/` |

A branch name's `/` becomes `-`, so `update/service-time` previews at
`/preview/update-service-time/`. Only one preview exists at a time — pushing
a different branch replaces it. Previews carry a `noindex` tag and are
excluded in `robots.txt`, so they stay out of search results.

This is why nothing is edited on `main` directly: a change is pushed to a
branch, looked at on the preview link, and only then merged.

`.github/workflows/publish.yml` runs the check before publishing either one,
and `.github/check-site.mjs` is the check itself. It confirms that:

- `site.js` and `events.js` can still be read by a browser — a missing comma
  or quotation mark here would otherwise leave every page without its menu
  and footer;
- every page still loads the stylesheet, the settings, and the shared header
  and footer;
- every link and image points at a file that exists.

**If any of that fails, nothing is published and the live site keeps
working.** Whoever made the change gets an email explaining what went wrong.
This is what makes the site safe for a volunteer to edit directly.

It also reports how many `[placeholders]` are still unfilled, as a note
rather than a failure.

To run the same check yourself before pushing:

```
node .github/check-site.mjs
```

## Using the church's own domain

GitHub Pages serves a custom domain for free, with an HTTPS certificate it
issues and renews automatically — which is what the current site at
`gospelchurch1.com` is missing.

1. **At the domain registrar**, point the domain at GitHub:

   | Record | Name | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `<owner>.github.io` |

   If the registrar supports `ALIAS` or `ANAME` records, one of those pointed
   at `<owner>.github.io` can replace the four A records.

2. **Add a file named `CNAME`** in the root of this repository containing
   nothing but the domain, e.g. `gospelchurch1.com`. It has no file
   extension.

3. **In Settings → Pages**, enter the domain under *Custom domain*, wait for
   the DNS check to pass, then tick **Enforce HTTPS**. The certificate can
   take a few minutes to issue.

DNS changes can take up to an hour to take effect. Leave the old site running
for a week or so afterward.

**This is reversible in minutes.** Pointing the same records somewhere else
later — including at Squarespace — is the only step needed to move.

One limit worth knowing: GitHub's terms do not allow Pages to be used for a
site "primarily directed at facilitating commercial transactions." A church
information site whose Give page *links out* to a giving platform is well
within that. Do not add a store.

## If the church ever moves to a hosted platform

Nothing here locks the church in. Each page is ordinary headings, paragraphs,
and images, so the content pastes into Squarespace, Wix, or anything similar;
the settings at the top of `site.js` are the same fields those platforms ask
for at setup; the events fields match a native events collection one for one;
and the sermon playlist, contact form, and map are native blocks everywhere.

Pointing the domain elsewhere is a DNS change, so the decision stays
reversible.
