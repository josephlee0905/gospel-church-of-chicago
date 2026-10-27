/* Finds the newest sermons on YouTube and puts them on the website: the
 * Sunday sermon from the church's channel, and the newest sermon in the
 * English Ministry's playlist.
 *
 * Run every Monday by .github/workflows/newest-sermon.yml. Nobody needs to
 * run this by hand.
 *
 * What it does, in order:
 *
 *   1. Reads YouTube's public listing of the church's channel. This is a plain
 *      web address anyone can open -- no account, no key, nothing to expire.
 *   2. Takes the videos newest first.
 *   3. Asks YouTube whether each one is actually allowed to play on another
 *      website, and picks the first one that is. This step matters: a sermon
 *      with embedding switched off would otherwise put "Video unavailable" on
 *      the home page and leave it there for a week.
 *   4. Writes that video into assets/js/site.js, if it is not already there.
 *   5. Does the same for the English Ministry playlist.
 *
 * If it cannot reach YouTube it stops and reports a failure, so somebody
 * hears about it. If it reaches YouTube and simply finds nothing playable,
 * it leaves the site alone -- last week's sermon keeps playing, which is a
 * perfectly good page.
 *
 * The English Ministry sermon never stops the job. If its playlist cannot be
 * read, the job says so in a warning and still puts up the Sunday sermon.
 *
 * To switch the whole thing off: delete .github/workflows/newest-sermon.yml.
 * The website carries on exactly as it is.
 */

import { readFileSync, writeFileSync, appendFileSync } from "node:fs";

const SETTINGS = "assets/js/site.js";
const HOW_MANY_TO_TRY = 10;
const SUNDAY = "\uc8fc\uc77c\uc608\ubc30";   // 주일예배 -- how the church titles a Sunday service

function report(changed, note) {
  console.log(note);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
  }
}

// Shown as a yellow warning on the job's page, without failing it.
function warn(note) {
  console.log((process.env.GITHUB_ACTIONS ? "::warning::" : "Warning: ") + note);
}

/* --- Which playlist ------------------------------------------------------ */

const settings = readFileSync(SETTINGS, "utf8");

const channel = settings.match(/youtubeChannelId:\s*"([^"]*)"/);
if (!channel || !channel[1]) {
  console.error(
    `No YouTube channel is set in ${SETTINGS}, so there is nothing to look ` +
    `up. Add one to youtubeChannelId, or delete ` +
    `.github/workflows/newest-sermon.yml to stop this running.`
  );
  process.exit(1);
}
const channelId = channel[1];

const current = settings.match(/latestSermonId:\s*"([^"]*)"/);
if (!current) {
  console.error(
    `${SETTINGS} has no latestSermonId line, so there is nowhere to put the ` +
    `sermon. It may have been renamed or removed.`
  );
  process.exit(1);
}
const currentId = current[1];

/* --- Reading YouTube ---------------------------------------------------- */

// The videos in a YouTube listing, newest first. `keep` decides which count.
// Throws if YouTube cannot be reached.
async function newestVideos(feedUrl, keep) {
  const response = await fetch(feedUrl);
  if (!response.ok) {
    throw new Error(`YouTube answered ${response.status}`);
  }
  const feed = await response.text();

  // Each entry carries its video id and the date it went up.
  const entries = [];
  for (const block of feed.split("<entry>").slice(1)) {
    const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const when = block.match(/<published>([^<]+)<\/published>/);
    const name = block.match(/<title>([^<]*)<\/title>/);
    const title = name ? name[1] : "";
    if (id && keep(title)) {
      entries.push({ id: id[1], when: when ? Date.parse(when[1]) : 0 });
    }
  }
  entries.sort((a, b) => b.when - a.when);
  return entries;
}

// YouTube's oEmbed address answers 200 for a video that is allowed to play
// elsewhere, and refuses for one that is not. That is the only reliable way
// to know before putting it on the page.
async function willPlayOffYouTube(id) {
  const ask =
    "https://www.youtube.com/oembed?format=json&url=" +
    encodeURIComponent("https://www.youtube.com/watch?v=" + id);
  try {
    const response = await fetch(ask);
    return response.ok;
  } catch {
    return false;
  }
}

async function firstPlayable(entries) {
  for (const entry of entries.slice(0, HOW_MANY_TO_TRY)) {
    if (await willPlayOffYouTube(entry.id)) return entry.id;
    console.log(`${entry.id} is not allowed to play on other websites; skipping.`);
  }
  return null;
}

const EMBEDDING_HELP =
  `To fix that in YouTube Studio: Content -> Select all -> Edit -> ` +
  `Embedding -> On, on the Live tab as well as Uploads, a page at a time.`;

let updated = settings;
const notes = [];

/* --- The Sunday sermon --------------------------------------------------- */

const feedUrl =
  "https://www.youtube.com/feeds/videos.xml?channel_id=" +
  encodeURIComponent(channelId);

let entries;
try {
  // The channel carries the Wednesday and Friday services too. Only the
  // Sunday one belongs on the front of the website, and the church titles
  // every one of them with the Korean for "Sunday service".
  entries = await newestVideos(feedUrl, (title) => title.includes(SUNDAY));
} catch (error) {
  console.error(
    `Could not read the church's YouTube channel: ${error.message}\n` +
    `Nothing has been changed. If this keeps happening, check that the ` +
    `channel is still public: ${feedUrl}`
  );
  process.exit(1);
}

if (!entries.length) {
  console.error(
    `No Sunday service was found among the newest videos on the channel. ` +
    `The church titles them with ${SUNDAY}; if that ever changes, this job ` +
    `needs changing with it. Nothing has been changed.`
  );
  process.exit(1);
}

const chosen = await firstPlayable(entries);

if (!chosen) {
  notes.push(
    `None of the newest ${HOW_MANY_TO_TRY} sermons is allowed to play on ` +
    `another website, so the site keeps the one it has. ${EMBEDDING_HELP}`
  );
} else if (chosen === currentId) {
  notes.push(`The newest playable sermon is already on the site.`);
} else {
  updated = updated.replace(
    /latestSermonId:\s*"[^"]*"/,
    `latestSermonId: "${chosen}"`
  );
  notes.push(`The sermon on the site is now ${chosen} (it was ${currentId}).`);
}

/* --- The English Ministry sermon ----------------------------------------- */

const playlist = settings.match(/englishPlaylistId:\s*"([^"]*)"/);
const english = settings.match(/englishSermonId:\s*"([^"]*)"/);

if (!playlist || !playlist[1]) {
  notes.push(`No English Ministry playlist is set, so there is nothing more to look up.`);
} else if (!english) {
  warn(
    `${SETTINGS} has an englishPlaylistId but no englishSermonId line, so ` +
    `there is nowhere to put the English Ministry sermon.`
  );
} else {
  const playlistUrl =
    "https://www.youtube.com/feeds/videos.xml?playlist_id=" +
    encodeURIComponent(playlist[1]);
  let englishEntries = null;
  try {
    // Everything in this playlist is an English Ministry sermon.
    englishEntries = await newestVideos(playlistUrl, () => true);
  } catch (error) {
    warn(
      `Could not read the English Ministry playlist: ${error.message}. ` +
      `Its sermon on the site stays as it is. Check that the playlist is ` +
      `still public: ${playlistUrl}`
    );
  }
  if (englishEntries && !englishEntries.length) {
    warn(`The English Ministry playlist is empty, so its sermon on the site stays as it is.`);
  } else if (englishEntries) {
    const englishChosen = await firstPlayable(englishEntries);
    if (!englishChosen) {
      warn(
        `None of the newest English Ministry sermons is allowed to play on ` +
        `another website, so the site keeps the one it has. ${EMBEDDING_HELP}`
      );
    } else if (englishChosen === english[1]) {
      notes.push(`The newest English Ministry sermon is already on the site.`);
    } else {
      updated = updated.replace(
        /englishSermonId:(\s*)"[^"]*"/,
        `englishSermonId:$1"${englishChosen}"`
      );
      notes.push(
        `The English Ministry sermon on the site is now ${englishChosen} ` +
        `(it was ${english[1] || "empty"}).`
      );
    }
  }
}

/* --- Put them on the site ------------------------------------------------ */

if (updated !== settings) {
  writeFileSync(SETTINGS, updated);
}
report(updated !== settings, notes.join("\n"));
