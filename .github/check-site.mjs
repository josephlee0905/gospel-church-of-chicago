/*
 * Checks the site before it is published.
 *
 * GitHub runs this automatically on every change. If anything below fails,
 * the change is NOT published and the website stays exactly as it was, so a
 * small typo can never take the live site down. Whoever made the change gets
 * an email saying what went wrong.
 *
 * To run it yourself before pushing:   node .github/check-site.mjs
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, normalize } from "node:path";
import vm from "node:vm";

const problems = [];
const notes = [];

/* --- Find every page ---------------------------------------------------- */

function htmlPages(dir = ".", found = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".") || entry === "node_modules") continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) htmlPages(path, found);
    else if (entry.endsWith(".html")) found.push(path);
  }
  return found;
}

const pages = htmlPages();

/* --- 1. The settings files must still be readable by a browser -----------
   This is the check that matters most. A missing comma or quotation mark in
   one of these files leaves every page without its menu and footer.        */

for (const file of ["assets/js/site.js", "assets/js/events.js"]) {
  if (!existsSync(file)) {
    problems.push(`${file} is missing.`);
    continue;
  }
  try {
    new vm.Script(readFileSync(file, "utf8"), { filename: file });
  } catch (error) {
    // Node reports the location on the first line of the stack, as "file:line".
    const where = (error.stack || "").split("\n")[0].match(/:(\d+)$/);
    const line = where ? ` on or near line ${where[1]}` : "";
    problems.push(
      `${file} has a typo${line}: ${error.message}\n    Look for a missing ` +
      `comma, or a missing " at the start or end of some text.`
    );
  }
}

/* --- 2. Every page must still load the shared parts ---------------------- */

const REQUIRED = [
  ['id="site-header"', "the shared menu"],
  ['id="site-footer"', "the shared footer"],
  ["assets/css/styles.css", "the stylesheet"],
  ["assets/js/site.js", "the settings file"],
  ["<title>", "a page title"],
  ['name="viewport"', "the mobile setting"],
];

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const [needle, description] of REQUIRED) {
    if (!html.includes(needle)) problems.push(`${page} is missing ${description}.`);
  }
}

/* --- 3. Links and images must point at something that exists ------------- */

const LINK = /(?<![-\w])(?:href|src)="([^"#]+)"/g;
const CSS_URL = /url\('([^']+)'\)/g;

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const targets = [
    ...[...html.matchAll(LINK)].map((m) => m[1]),
    ...[...html.matchAll(CSS_URL)].map((m) => m[1]),
  ];
  for (const target of targets) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(target)) continue;
    const resolved = normalize(join(dirname(page), target));
    if (!existsSync(resolved)) {
      problems.push(`${page} links to "${target}", which does not exist.`);
    }
  }
}

/* --- 4. Count what is still waiting for real content --------------------- */

const placeholders = pages.reduce(
  (total, page) => total + (readFileSync(page, "utf8").match(/class="tbd"/g) || []).length,
  0
);
if (placeholders > 0) {
  notes.push(
    `${placeholders} placeholder${placeholders === 1 ? "" : "s"} still to fill in ` +
    `(see CONTENT-CHECKLIST.md). This does not stop the site publishing.`
  );
}

/* --- Report -------------------------------------------------------------- */

console.log(`Checked ${pages.length} pages.\n`);

for (const note of notes) console.log(`Note: ${note}`);

if (problems.length === 0) {
  console.log("\nEverything looks right. Publishing.");
  process.exit(0);
}

console.error(`\nFound ${problems.length} problem${problems.length === 1 ? "" : "s"}. ` +
  `The website has NOT been changed and is still working normally.\n`);
for (const problem of problems) console.error(`  - ${problem}`);
console.error(
  `\nFix the problem above and save again. If you are stuck, open the file's ` +
  `History on GitHub and restore the version from before your change.`
);
process.exit(1);
