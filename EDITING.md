# How to update the website

**The simplest way to update this site is to ask Claude Code.** Describe the
change in plain language — "change the service time to 11:00 AM", "add the
Christmas Eve service on December 24th at 6pm" — and it will make the change,
check it, and send you a link to look at before anything goes live.

This guide is for making the same changes by hand, if you would rather.

You can make every change below directly on GitHub:

1. Open the file you need in the list of files.
2. Click the **pencil icon** in the top-right corner.
3. Make your change.
4. Scroll down and click **Commit changes**.

The website updates itself a minute or two later.

---

## The three files you will use

| I want to change… | Open this file |
| --- | --- |
| Service time, address, phone, email, links, the menu | `assets/js/site.js` |
| Events on the calendar | `assets/js/events.js` |
| The words on one particular page | that page's `.html` file |

---

## Changing the service time, address, phone, or email

Open **`assets/js/site.js`**. At the top you will find a list that looks like
this:

```js
serviceTime:    "[Sunday service time]",
addressLine1:   "[Street address]",
addressLine2:   "Des Plaines, IL [ZIP]",
phone:          "[(000) 000-0000]",
email:          "[info@gospelchurch1.com]",
```

Change only the words **between the quotation marks**. Keep the quotation
marks and the comma at the end of the line.

```js
serviceTime:    "Sundays at 11:00 AM",
```

That one change updates the home page, the Visit page, the Contact page, the
Korean page, and the footer of every page at once.

---

## Turning on sermons, giving, and the contact form

These three settings are empty to begin with. Until you fill them in, the
website shows a short note in their place instead of a broken button.

| Setting | What to paste in |
| --- | --- |
| `youtubePlaylistId` | The church's YouTube **sermon playlist** ID — in a playlist link it is the part after `list=`. Once set, every new sermon added to that playlist appears on the website by itself. |
| `youtubeChannelUrl` | The full address of the church's YouTube channel. |
| `givingUrl` | The address of the church's existing giving platform. The website never handles money itself; the button simply sends people there. |
| `contactFormUrl` | A form address from a free service such as [Formspree](https://formspree.io). While this is empty, the contact page shows an email address instead. |

---

## Adding an event

Open **`assets/js/events.js`**. Copy one block between `{` and `}`, paste it
below, and change the details:

```js
  {
    title:       "Christmas Eve Service",
    date:        "2026-12-24",
    time:        "6:00 PM",
    location:    "Main Sanctuary",
    description: "A candlelight service of carols and readings.",
    image:       "assets/img/placeholder-candles.svg",
    link:        "",
    linkLabel:   ""
  },
```

- **`date`** must always be written year-month-day, like `2026-12-24`.
- **`image`** and **`link`** can be left empty (`""`). An event with no image
  gets a simple date block instead.
- Put a comma after every block **except the last one**.

**You never have to delete an old event.** Events disappear from the website
on their own the day after they happen.

---

## Changing the words on a page

Each page is one file: `about.html`, `visit.html`, `ministries.html`, and so
on. Open the file, find the sentence you want to change, and type over it.
Leave anything inside angle brackets — like `<p>` or `</div>` — exactly as
it is.

Text that is still waiting for real information is written in square
brackets and appears highlighted in sand on the live site, like
`[Pastor's name]`. **When you have replaced them all, the highlighting is
gone — that is how you know the site is ready to launch.**

To find every one of them at once, use GitHub's search box and search this
repository for `tbd`.

### Adding or removing a ministry

On `ministries.html`, each ministry is one block that starts with
`<li class="card">` and ends with `</li>`. Copy a block to add a ministry,
or delete a whole block to remove one. The layout rearranges itself.

---

## Replacing the photographs

The pictures on the site right now are colored placeholders. To use a real
photo, save it into the `assets/img/` folder and change the file name in the
page. For example, in `index.html`:

```html
<img src="assets/img/placeholder-children.svg" alt="">
```

becomes

```html
<img src="assets/img/childrens-ministry.jpg" alt="Children in Sunday class">
```

Photos should be **JPG** files, about **1600 pixels wide** for large images
and **900 pixels wide** for the smaller cards, and under about 500 KB each so
pages load quickly on a phone.

The `alt="…"` text describes the photo for people using a screen reader.
Write a short, plain description. Leave it as `alt=""` for a picture that is
purely decorative.

### Which photo goes where

| File | What it should show |
| --- | --- |
| `placeholder-hero.svg` | The congregation gathered — the main home page photo |
| `placeholder-gathering.svg` | Our church family together |
| `placeholder-welcome.svg` | A warm welcome at the door |
| `placeholder-worship.svg` | Sunday worship |
| `placeholder-children.svg` | Children's ministry |
| `placeholder-youth.svg` | Youth group |
| `placeholder-adults.svg` | An adult small group |
| `placeholder-missions.svg` | Mission partners |
| `placeholder-fellowship.svg` | A shared meal |
| `placeholder-candles.svg` | Christmas Eve service |

The home page photo is set slightly differently, near the top of
`index.html`:

```html
<section class="hero" style="background-image: url('assets/img/placeholder-hero.svg');">
```

---

## Changing the colors

Open `assets/css/styles.css`. The first block of the file lists every color
used on the site. Changing a value there changes it everywhere.

```css
--green-700: #245243;   /* buttons and links */
--sand-500:  #C2A275;   /* underlines and small accents */
--cream:     #FBF7F0;   /* page background */
```

---

## The Korean page

`ko/index.html` is a single page in Korean with service times, the pastor's
greeting, prayer requests, and directions. It is edited exactly like any
other page.

It deliberately stays short. The service time, address, phone, and email on
it come from the same settings file as the English pages, so those never need
translating twice. It shows the **same** YouTube playlist as the English
Sermons page, so sermons are never uploaded twice.

---

## You cannot break the website

Every change is checked automatically before it goes live. If something is
wrong — a missing comma, a missing quotation mark, a link to a page that does
not exist — **the change is simply not published, and the website carries on
exactly as it was.** You will get an email saying what went wrong and which
line to look at.

So there is no way to make an edit that takes the site down. The worst that
happens is that your change does not appear and you get an email about it.

The most common cause is a missing quotation mark or comma in
`assets/js/site.js` or `assets/js/events.js`. Compare your line with the ones
around it — they should look identical apart from the words.

Every change is also saved in this repository's history, so nothing is ever
lost. On GitHub, open the file, click **History**, find the version from
before your change, and restore it.
