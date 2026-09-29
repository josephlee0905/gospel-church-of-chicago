/* Finds the newest sermon in the Sunday playlist and puts it on the website.
 *
 * Run every Monday by .github/workflows/newest-sermon.yml. Nobody needs to
 * run this by hand.
 *
 * What it does, in order:
 *
 *   1. Reads YouTube's public listing of the Sunday playlist. This is a plain
 *      web address anyone can open -- no account, no key, nothing to expire.
 *   2. Takes the videos newest first.
 *   3. Asks YouTube whether each one is actually allowed to play on another
 *      website, and picks the first one that is. This step matters: a sermon
 *      with embedding switched off would otherwise put "Video unavailable" on
 *      the home page and leave it there for a week.
 *   4. Writes that video into assets/js/site.js, if it is not already there.
 *
 * If it cannot reach YouTube it stops and reports a failure, so somebody
 * hears about it. If it reaches YouTube and simply finds nothing playable,
 * it leaves the site alone -- last week's sermon keeps playing, which is a
 * perfectly good page.
 *
 * To switch the whole thing off: delete .github/workflows/newest-sermon.yml.
 * The website carries on exactly as it is.
 */

import { readFileSync, writeFileSync, appendFileSync } from "node:fs";

const SETTINGS = "assets/js/site.js";
const HOW_MANY_TO_TRY = 10;

function report(changed, note) {
  console.log(note);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
  }
}

/* --- Which playlist ------------------------------------------------------ */

const settings = readFileSync(SETTINGS, "utf8");

const playlist = settings.match(/youtubePlaylistId:\s*"([^"]*)"/);
if (!playlist || !playlist[1]) {
  console.error(
    `No sermon playlist is set in ${SETTINGS}, so there is nothing to look ` +
    `up. Add one to youtubePlaylistId, or delete ` +
    `.github/workflows/newest-sermon.yml to stop this running.`
  );
  process.exit(1);
}
const playlistId = playlist[1];

const current = settings.match(/latestSermonId:\s*"([^"]*)"/);
if (!current) {
  console.error(
    `${SETTINGS} has no latestSermonId line, so there is nowhere to put the ` +
    `sermon. It may have been renamed or removed.`
  );
  process.exit(1);
}
const currentId = current[1];

/* --- What is in it ------------------------------------------------------- */

const feedUrl =
  "https://www.youtube.com/feeds/videos.xml?playlist_id=" +
  encodeURIComponent(playlistId);

let feed;
try {
  const response = await fetch(feedUrl);
  if (!response.ok) {
    throw new Error(`YouTube answered ${response.status}`);
  }
  feed = await response.text();
} catch (error) {
  console.error(
    `Could not read the sermon playlist from YouTube: ${error.message}\n` +
    `Nothing has been changed. If this keeps happening, check that the ` +
    `playlist is still public: ${feedUrl}`
  );
  process.exit(1);
}

// Each entry carries its video id and the date it went up.
const entries = [];
for (const block of feed.split("<entry>").slice(1)) {
  const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
  const when = block.match(/<published>([^<]+)<\/published>/);
  if (id) entries.push({ id: id[1], when: when ? Date.parse(when[1]) : 0 });
}

if (!entries.length) {
  console.error(
    `YouTube returned the playlist but it has no videos in it. Nothing has ` +
    `been changed.`
  );
  process.exit(1);
}

entries.sort((a, b) => b.when - a.when);

/* --- Which of them will actually play on the site ------------------------ */

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

let chosen = null;
for (const entry of entries.slice(0, HOW_MANY_TO_TRY)) {
  if (await willPlayOffYouTube(entry.id)) {
    chosen = entry.id;
    break;
  }
  console.log(`${entry.id} is not allowed to play on other websites; skipping.`);
}

if (!chosen) {
  report(
    false,
    `None of the newest ${HOW_MANY_TO_TRY} sermons is allowed to play on ` +
    `another website, so the site keeps the one it has. To fix that in ` +
    `YouTube Studio: Content -> Select all -> Edit -> Embedding -> On, on ` +
    `the Live tab as well as Uploads, a page at a time.`
  );
  process.exit(0);
}

if (chosen === currentId) {
  report(false, `The newest playable sermon is already on the site.`);
  process.exit(0);
}

/* --- Put it on the site -------------------------------------------------- */

const updated = settings.replace(
  /latestSermonId:\s*"[^"]*"/,
  `latestSermonId: "${chosen}"`
);

if (updated === settings) {
  console.error(`Could not write the new sermon into ${SETTINGS}.`);
  process.exit(1);
}

writeFileSync(SETTINGS, updated);
report(true, `The sermon on the site is now ${chosen} (it was ${currentId}).`);
