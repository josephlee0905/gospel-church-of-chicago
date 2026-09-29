/* ==========================================================================
   GOSPEL CHURCH OF CHICAGO — SITE SETTINGS

   This is the ONE file to edit for information that appears on every page:
   service times, address, phone, email, links, and the menu.

   HOW TO EDIT
   1. Change only the text between the "quotation marks".
   2. Keep the quotation marks and the comma at the end of each line.
   3. Save the file. Every page updates automatically.

   Anything written like [this] is a placeholder waiting for real information.
   ========================================================================== */

var SITE = {

  /* --- The basics ------------------------------------------------------ */
  churchName:     "Gospel Church of Chicago",
  churchNameKo:   "가스펠 교회",
  shortName:      "GCC",
  tagline:        "A warm, Christ-centered church in Des Plaines, Illinois, worshipping in Korean and in English.",

  /* --- Sunday worship -------------------------------------------------- */
  serviceTime:    "10:00 AM",
  serviceTimeKo:  "오전 10시",

  /* --- Where to find us ------------------------------------------------ */
  addressLine1:   "1250 E. Golf Road",
  addressLine2:   "Des Plaines, IL 60016",
  phone:          "(847) 803-9191",
  email:          "onenesschurch1250@gmail.com",

  /* --- Links ----------------------------------------------------------- */

  // The church's YouTube channel. Services are streamed live and stay on
  // the channel afterwards, so that is where the website looks for them.
  youtubeChannelId: "UCOGFUNaWYOBLK6baPQHJU_Q",

  // The sermon that plays on the Sermons page and the home page. Paste the
  // part of a YouTube address after "v=" -- in
  // youtube.com/watch?v=9c2kkQRDF3k that is 9c2kkQRDF3k.
  //
  // Why one sermon rather than the whole playlist: the playlists still hold
  // older videos with embedding switched off, and YouTube refuses to play a
  // playlist when that is true of any of them. The button underneath takes
  // people to the full playlist, which works regardless.
  //
  // To change which sermon plays, replace the code below. Leave it as ""
  // and the page shows only the button.
  latestSermonId: "4K_jT7oKRbU",
  youtubeChannelUrl: "https://www.youtube.com/@gospelchurchofchicago3850",

  // Give page: the church's existing giving platform. The website never
  // handles money itself -- this button simply sends people there.
  givingUrl:      "",

  // Social media. Leave a line empty ("") to hide that icon.
  facebookUrl:    "",
  instagramUrl:   "",

  // Contact form. Paste a form address from a free service such as
  // Formspree (formspree.io). While this is empty, the contact page shows
  // an email address instead of a form, so nothing is ever broken.
  contactFormUrl: "",

  /* --- Menu ------------------------------------------------------------
     The links across the top of every page. To remove a page, delete its
     line. To add one, copy a line and change both parts.               */
  nav: [
    { label: "Home",       href: "index.html"      },
    { label: "About",      href: "about.html"      },
    { label: "Visit",      href: "visit.html"      },
    { label: "Ministries", href: "ministries.html" },
    { label: "Missions",   href: "missions.html"   },
    { label: "Sermons",    href: "sermons.html"    },
    { label: "Events",     href: "events.html"     }
  ]

};

/* ==========================================================================
   Below this line is the code that puts the settings above onto each page.
   There is nothing here that needs editing.
   ========================================================================== */

(function () {
  "use strict";

  // Pages inside /ko/ have to reach back up one folder for shared files.
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var HERE = document.body ? document.body.getAttribute("data-page") : "";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Wraps [placeholder text] so it is easy to spot before launch.
  function fill(value) {
    var text = esc(value);
    return /^\[.*\]$/.test(String(value).trim())
      ? '<span class="tbd">' + text + "</span>"
      : text;
  }

  function digitsOnly(value) {
    return String(value).replace(/[^\d+]/g, "");
  }

  SITE.fullAddress = SITE.addressLine1 + ", " + SITE.addressLine2;
  SITE.mapEmbedUrl = "https://www.google.com/maps?q=" +
    encodeURIComponent(SITE.fullAddress) + "&output=embed";
  SITE.mapLinkUrl = "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(SITE.fullAddress);

  /* --- Header ---------------------------------------------------------- */

  function buildHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;

    // On the Korean page the language link should offer English, not the
    // page the reader is already standing on.
    var korean = document.documentElement.getAttribute("lang") === "ko";
    var langLink = korean
      ? '<a class="nav__lang" href="' + ROOT + 'index.html">English</a>'
      : '<a class="nav__lang" href="' + ROOT + 'ko/index.html" lang="ko">\ud55c\uad6d\uc5b4</a>';

    var links = SITE.nav.map(function (item) {
      var current = item.href === HERE;
      return '<li><a href="' + ROOT + esc(item.href) + '"' +
        (current ? ' aria-current="page"' : "") + ">" + esc(item.label) + "</a></li>";
    }).join("");

    mount.innerHTML =
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<div class="header__inner container">' +
        '<a class="wordmark" href="' + ROOT + 'index.html">' +
          '<span class="wordmark__mark">' + esc(SITE.shortName) + "</span>" +
          '<span class="wordmark__name">' + esc(SITE.churchName) + "</span>" +
        "</a>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" ' +
          'aria-controls="site-nav"><span class="nav-toggle__bars" aria-hidden="true">' +
          "</span>Menu</button>" +
        '<nav class="nav" id="site-nav" aria-label="Main">' +
          "<ul class=\"nav__list\">" + links + "</ul>" +
          '<div class="nav__actions">' +
            '<a class="btn btn--sm" href="' + ROOT + 'give.html">Give</a>' +
            langLink +
          "</div>" +
        "</nav>" +
      "</div>";

    var toggle = mount.querySelector(".nav-toggle");
    var nav = mount.querySelector(".nav");
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  /* --- Footer ---------------------------------------------------------- */

  function buildFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;

    var social = "";
    if (SITE.facebookUrl) {
      social += '<a href="' + esc(SITE.facebookUrl) + '">Facebook</a>';
    }
    if (SITE.instagramUrl) {
      social += '<a href="' + esc(SITE.instagramUrl) + '">Instagram</a>';
    }
    if (SITE.youtubeChannelUrl) {
      social += '<a href="' + esc(SITE.youtubeChannelUrl) + '">YouTube</a>';
    }

    var pages = SITE.nav.concat([
      { label: "Give",    href: "give.html"    },
      { label: "Contact", href: "contact.html" }
    ]).map(function (item) {
      return '<li><a href="' + ROOT + esc(item.href) + '">' + esc(item.label) + "</a></li>";
    }).join("");

    mount.innerHTML =
      '<div class="container footer__grid">' +
        '<div class="footer__col footer__col--brand">' +
          '<p class="footer__name">' + esc(SITE.churchName) + "</p>" +
          '<p class="footer__tagline">' + esc(SITE.tagline) + "</p>" +
        "</div>" +
        '<div class="footer__col">' +
          "<h2>Sundays</h2>" +
          "<p>" + fill(SITE.serviceTime) + "</p>" +
          '<p><a href="' + ROOT + 'visit.html">Plan your visit</a></p>' +
        "</div>" +
        '<div class="footer__col">' +
          "<h2>Find us</h2>" +
          '<p><a href="' + esc(SITE.mapLinkUrl) + '">' +
            fill(SITE.addressLine1) + "<br>" + fill(SITE.addressLine2) + "</a></p>" +
          '<p><a href="tel:' + esc(digitsOnly(SITE.phone)) + '">' + fill(SITE.phone) + "</a><br>" +
            '<a href="mailto:' + esc(SITE.email) + '">' + fill(SITE.email) + "</a></p>" +
        "</div>" +
        '<div class="footer__col">' +
          "<h2>More</h2>" +
          '<ul class="footer__links">' + pages + "</ul>" +
        "</div>" +
      "</div>" +
      '<div class="container footer__bar">' +
        "<p>&copy; " + new Date().getFullYear() + " " + esc(SITE.churchName) + "</p>" +
        '<p class="footer__social">' + social + "</p>" +
        '<p><a href="' + ROOT + 'ko/index.html" lang="ko">한국어 안내</a></p>' +
      "</div>";
  }

  /* --- Settings placed into the page ------------------------------------
     Any element written as <span data-site="phone"></span> is filled in
     with the matching setting from the list at the top of this file.    */

  function fillPlaceholders() {
    var nodes = document.querySelectorAll("[data-site]");
    Array.prototype.forEach.call(nodes, function (node) {
      var value = SITE[node.getAttribute("data-site")];
      if (value) node.innerHTML = fill(value);
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-site-href]"), function (node) {
      var key = node.getAttribute("data-site-href");
      var value = SITE[key];
      if (value) {
        node.setAttribute("href", key === "email" ? "mailto:" + value :
          key === "phone" ? "tel:" + digitsOnly(value) : value);
      } else {
        node.classList.add("is-unset");
      }
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-site-src]"), function (node) {
      var value = SITE[node.getAttribute("data-site-src")];
      if (value) node.setAttribute("src", value);
    });
  }

  /* --- The sermon on the page -------------------------------------------- */

  function buildSermons() {
    var mount = document.getElementById("sermon-player");
    if (!mount) return;

    var korean = document.documentElement.getAttribute("lang") === "ko";

    var channelLink = SITE.youtubeChannelUrl
      ? '<a href="' + esc(SITE.youtubeChannelUrl) + '">' +
        (korean ? "\uad50\ud68c \uc720\ud29c\ube0c \ucc44\ub110" : "YouTube channel") + "</a>"
      : "";

    // No sermon chosen yet: say so, and send people to the channel.
    if (!SITE.latestSermonId) {
      mount.innerHTML =
        '<div class="notice"><p>' +
          (korean
            ? "<strong>\uc124\uad50 \uc601\uc0c1\uc740 \uacf3 \uc774\uacf3\uc5d0 \uc62c\ub77c\uc635\ub2c8\ub2e4.</strong>" +
              (channelLink ? " \uadf8\ub3d9\uc548\uc5d0\ub294 " + channelLink + "\uc5d0\uc11c \ubcf4\uc2e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4." : "")
            : "<strong>Sermons will appear here soon.</strong>" +
              (channelLink ? " In the meantime you can watch them on our " + channelLink + "." : "")) +
        "</p></div>";
      return;
    }

    var more = SITE.youtubeChannelUrl
      ? '<p class="actions"><a class="btn btn--outline" href="' +
        esc(SITE.youtubeChannelUrl + "/videos") + '">' +
        (korean ? "\uc9c0\ub09c \uc124\uad50 \ubaa8\ub450 \ubcf4\uae30" : "All our sermons") + "</a></p>"
      : "";

    mount.innerHTML =
      '<div class="video">' +
        '<iframe src="https://www.youtube-nocookie.com/embed/' +
          encodeURIComponent(SITE.latestSermonId) + '" title="A sermon from ' +
          esc(SITE.churchName) + '" loading="lazy" allowfullscreen ' +
          'allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture">' +
        "</iframe>" +
      "</div>" + more;
  }

  /* --- Giving button ---------------------------------------------------- */

  function buildGiving() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-give-button]"), function (node) {
      if (SITE.givingUrl) {
        node.innerHTML = '<a class="btn btn--lg" href="' + esc(SITE.givingUrl) + '">Give online</a>';
      } else {
        node.innerHTML =
          '<p class="notice notice--inline">Online giving is not set up yet. ' +
          "Until it is, you can give in the Sunday service or by mail \u2014 both are below.</p>";
      }
    });
  }

  /* --- Contact form ----------------------------------------------------- */

  function buildContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    if (!SITE.contactFormUrl) {
      form.outerHTML =
        '<div class="notice">' +
          "<p><strong>Prefer to write to us?</strong> Email " +
          '<a href="mailto:' + esc(SITE.email) + '">' + fill(SITE.email) + "</a> " +
          "and someone will reply within a few days.</p>" +
        "</div>";
      return;
    }
    form.setAttribute("action", SITE.contactFormUrl);
  }

  /* --- Map -------------------------------------------------------------- */

  function buildMap() {
    var mount = document.getElementById("site-map");
    if (!mount) return;
    mount.innerHTML =
      '<iframe src="' + esc(SITE.mapEmbedUrl) + '" title="Map to ' +
      esc(SITE.churchName) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade">' +
      "</iframe>";
  }

  function start() {
    buildHeader();
    buildFooter();
    fillPlaceholders();
    buildSermons();
    buildGiving();
    buildContactForm();
    buildMap();
    if (window.GCC_renderEvents) window.GCC_renderEvents(ROOT);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
