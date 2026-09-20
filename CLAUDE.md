# Working on this website with Claude Code

This is the website for Gospel Church of Chicago. It is maintained by a
church volunteer who is comfortable talking to Claude but has **not** worked
on websites before.

Read this before making any change.

---

## Who you are helping

Assume no web knowledge. Do not ask them to open a terminal, run a command,
edit HTML, or resolve a git problem. You do all of that.

- **Describe changes by what a visitor sees**, not by what the file says.
  "The service time on every page now reads 11:00 AM" — not "updated the
  `serviceTime` key in `site.js`."
- **Do not show raw HTML** unless they ask for it.
- **Never leave them at a decision they cannot evaluate.** If a choice is
  genuinely theirs — wording, which photo, whether to keep a section — ask in
  plain language. If it is technical, decide it yourself.
- If they describe something vaguely ("the events page looks wrong"), look at
  the page and find the problem rather than asking them to diagnose it.

---

## The workflow — follow it every time

Changes never go straight to the live site. The order is always:

1. **Make a branch.** Name it for the change: `update/service-time`,
   `update/christmas-events`, `update/pastor-greeting`.
2. **Make the change.**
3. **Run the check:** `node .github/check-site.mjs`. It must pass before you
   push. If it fails, fix the cause — never work around it.
4. **Push the branch.** Publishing takes about a minute.
5. **Give them the preview link** and wait:

   ```
   https://<owner>.github.io/gospel-church-of-chicago/preview/<branch>/
   ```

   The `<branch>` part is the branch name with any `/` replaced by `-`.
   Tell them it is a private draft, not the real site.
6. **Wait for them to say it looks right.** Do not merge before this.
7. **Merge to `main` and push.** That is what makes it live.

`main` is the live site. **Never commit to `main` directly.** Never merge on
their behalf without an explicit yes.

Only one preview exists at a time — pushing a different branch replaces it.
That is fine for one change at a time, which is how this site is maintained.

If a visual change is hard to describe, serve the site locally
(`python3 -m http.server`) and show them a screenshot alongside the preview
link. Do not rely on a screenshot alone — the preview link is what proves it
works when published.

---

## Where things live

| File | What it holds |
| --- | --- |
| `assets/js/site.js` | **Settings.** Service time, address, phone, email, giving link, YouTube playlist, and the menu. Used by every page. |
| `assets/js/events.js` | The event list. Past events drop off by themselves. |
| `index.html` … `contact.html` | One file per page. Page wording lives here. |
| `ko/index.html` | The Korean page. |
| `assets/css/styles.css` | Colors, fonts, spacing. All the colors are at the top. |
| `assets/img/` | Photographs. |
| `.github/` | The automatic check and the publishing setup. |

Longer explanations: `README.md` for how it is built, `EDITING.md` for the
volunteer's own guide, `CONTENT-CHECKLIST.md` for what the church still owes.

---

## House rules

**Never:**

- Commit to `main` without a previewed, approved change.
- Weaken, skip, or delete `.github/check-site.mjs` to make something pass.
- Add a package, a build step, a framework, or an external font or script.
  The site is plain HTML and CSS with two small scripts, deliberately. It
  must keep working untouched for years.
- Handle payments. The Give page links out to the church's giving platform.
- Machine-translate the English pages into Korean. The Korean page is short
  and independent on purpose.
- Put anyone's home address, personal phone number, or personal email in the
  repository. Church contact details only.
- Use a root-absolute link (`/about.html`). Every link must be relative
  (`about.html`, `../index.html`) or the previews and the domain both break.

**Always:**

- US English spelling — this is a church in Des Plaines, Illinois.
- Keep the existing voice: warm, plain, unhurried. Short sentences. No
  marketing language, no exclamation marks.
- Match the surrounding markup rather than inventing a new pattern. Nearly
  every layout you need already exists on another page.

---

## Content still to be written

Text the church has not supplied yet is written in square brackets inside a
highlight, like:

```html
<span class="tbd">[Pastor's name]</span>
```

It shows as highlighted text on the page, so unfinished content is obvious.
When they give you the real wording, **remove the whole `<span>` and the
brackets**, leaving just the text.

The check reports how many are left. It does not block publishing.

---

## Common requests

**"Change the service time / phone number / address."**
One line in `assets/js/site.js`. It updates every page at once. Note that
`serviceTime` and `serviceTimeKo` are separate — ask whether the Korean page
needs updating too.

**"Add an event."**
Copy a block in `assets/js/events.js`. Date must be `YYYY-MM-DD`. Ask for
time and location if they did not say. `image` and `link` may be `""`. Do not
delete past events — they disappear on their own.

**"Add this photo."**
Put it in `assets/img/` and update the `src` and the `alt` text. Check the
file size first: anything over about 500 KB is too slow on a phone, so resize
it to roughly 1600px wide and say that you did. Always write real `alt` text
describing the photo, unless it is purely decorative (`alt=""`).

**"Change the wording on a page."**
Edit that page's `.html`. Read the surrounding paragraphs first and match
their rhythm.

**"Add a ministry" / "remove a ministry."**
In `ministries.html`, each is one `<li class="card">` block. Copy or delete
the whole block. The layout adjusts itself.

**"Add a new page."**
Copy the closest existing page, change the `<title>`, the description, the
`data-page` attribute, and the content. Add it to the `nav` list in
`site.js` if it belongs in the menu. Check every link resolves.

**"Something on the live site is wrong."**
Fix forward on a branch as usual. If the live site is visibly broken and they
need it right now, revert the commit that caused it on `main` — that is the
one time to touch `main` first, and say clearly that you did.

---

## If the check fails

`node .github/check-site.mjs` fails for three reasons:

1. **A typo in `site.js` or `events.js`** — usually a missing comma or an
   unclosed `"`. The message names the line. This is the important one: left
   unpublished, the live site is fine; published, every page would lose its
   menu and footer.
2. **A page missing its shared parts** — the stylesheet, the settings script,
   or the header and footer mount points.
3. **A link or image pointing at a file that does not exist** — usually a
   misspelled filename.

Fix the cause. Never disable the check.
