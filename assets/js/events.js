/* ==========================================================================
   EVENTS

   Add an event by copying one block between { } and changing the details.
   Keep the commas exactly where they are.

   Events that have passed disappear from the website on their own, so
   nothing needs to be deleted. The order does not matter -- the website
   always shows the soonest event first.

   date     Always year-month-day, e.g. "2026-12-24"
   time     Anything you like, e.g. "6:00 PM" (leave "" to hide)
   image    A photo in assets/img/ (leave "" for a plain card)
   link     A sign-up or information page (leave "" to hide the button)

   For the Korean side of the site, add titleKo, timeKo, locationKo and
   descriptionKo alongside the English ones. Anything you leave out simply
   shows the English wording on the Korean pages, so a Korean line is never
   required -- but an event only reads properly in Korean if it is given one.
   ========================================================================== */

var EVENTS = [

  // Nothing on the calendar yet. Copy the example below, take away the
  // two slashes at the start of each line, and fill in the details.

  // {
  //   title:         "Christmas Eve Service",
  //   titleKo:       "성탄 전야 예배",
  //   date:          "2026-12-24",
  //   time:          "6:00 PM",
  //   timeKo:        "저녁 6시",
  //   location:      "Main Sanctuary",
  //   locationKo:    "본당",
  //   description:   "A candlelight service of carols and readings.",
  //   descriptionKo: "촛불을 켜고 찬송과 성경 봉독으로 드리는 예배입니다.",
  //   image:         "",
  //   link:          "",
  //   linkLabel:     ""
  // }

];

/* ==========================================================================
   Below this line is the code that puts the events above onto the page.
   There is nothing here that needs editing.
   ========================================================================== */

window.GCC_renderEvents = function (root) {
  "use strict";

  var mounts = document.querySelectorAll("[data-events]");
  if (!mounts.length) return;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fill(value) {
    var text = esc(value);
    return /^\[.*\]$/.test(String(value).trim())
      ? '<span class="tbd">' + text + "</span>" : text;
  }

  // "2026-12-24" -> a date object at local midnight, so an event stays
  // listed for the whole of its own day regardless of time zone.
  function toDate(value) {
    var parts = String(value).split("-");
    return new Date(+parts[0], (+parts[1] || 1) - 1, +parts[2] || 1);
  }

  // The Korean pages set lang="ko" on the page itself, so the dates and the
  // wording below follow whichever site the reader is on.
  var KOREAN = document.documentElement.getAttribute("lang") === "ko";
  var LOCALE = KOREAN ? "ko-KR" : "en-US";
  var WORDS = KOREAN
    ? { none: '아직 예정된 일정이 없습니다. ',
        invite: '<a href="contact.html">연락해 주십시오</a> — 언제든지 반갑게 맞이하겠습니다.',
        more: "더 보기" }
    : { none: "There are no events on the calendar right now. ",
        invite: '<a href="' + root + 'contact.html">get in touch</a> — we would love to hear from you.',
        more: "Learn more" };

  // Picks the Korean wording for an event when it has been given one, and
  // falls back to the English rather than leaving a gap on the page.
  function say(item, key) {
    var korean = item[key + "Ko"];
    return KOREAN && korean ? korean : item[key];
  }

  var LONG = { weekday: "long", month: "long", day: "numeric" };
  var SHORT_MONTH = { month: "short" };

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var upcoming = EVENTS
    .filter(function (item) { return toDate(item.date) >= today; })
    .sort(function (a, b) { return toDate(a.date) - toDate(b.date); });

  Array.prototype.forEach.call(mounts, function (mount) {
    var limit = parseInt(mount.getAttribute("data-events"), 10);
    var list = isNaN(limit) ? upcoming : upcoming.slice(0, limit);

    if (!list.length) {
      mount.innerHTML =
        '<div class="notice"><p>' + WORDS.none +
        (KOREAN ? "" : "Please ") + WORDS.invite + "</p></div>";
      return;
    }

    mount.innerHTML = '<ul class="cards cards--events">' + list.map(function (item) {
      var when = toDate(item.date);
      var media = item.image
        ? '<img class="card__image" src="' + root + esc(item.image) + '" alt="" loading="lazy">'
        : '<p class="card__date-block"><span>' +
            esc(when.toLocaleDateString(LOCALE, SHORT_MONTH)) + "</span><strong>" +
            when.getDate() + "</strong></p>";

      return '<li class="card">' + media +
        '<div class="card__body">' +
          '<p class="card__eyebrow"><time datetime="' + esc(item.date) + '">' +
            esc(when.toLocaleDateString(LOCALE, LONG)) + "</time>" +
            (say(item, "time") ? " · " + fill(say(item, "time")) : "") + "</p>" +
          "<h3 class=\"card__title\">" + esc(say(item, "title")) + "</h3>" +
          (say(item, "location") ? '<p class="card__meta">' + esc(say(item, "location")) + "</p>" : "") +
          (say(item, "description") ? "<p>" + esc(say(item, "description")) + "</p>" : "") +
          (item.link
            ? '<p><a class="link-arrow" href="' + esc(item.link) + '">' +
              esc(say(item, "linkLabel") || WORDS.more) + "</a></p>"
            : "") +
        "</div></li>";
    }).join("") + "</ul>";
  });
};
