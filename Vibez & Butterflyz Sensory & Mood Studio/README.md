# Vibez & Butterflyz — Sensory & Mood Studio

A static web app: pick essential oils, build a blend, check its safety profile, generate a shareable "Mood Card," and get a matching drink/food pairing (the Lounge Experience). No build step, no framework, no server required to run it.

## Running it locally

The entire app — HTML, CSS, JS, the oil/blend data, and the butterfly artwork — lives in one file: `index.html`, fully self-contained with no companion file to lose track of. Alongside it are the PWA files (`manifest.json`, `sw.js`, and four `icon-*.png` files) — optional for everyday use, but keep them in the same folder as `index.html` if you want "Add to Home Screen" / offline support to work (see below).

```bash
# from this folder
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

Double-clicking `index.html` to open it directly in a browser (`file://`) works for everyday use too. Two things specifically require `http(s)://` rather than `file://`: the email gate's request to Formspree (browsers block `fetch` from `file://` origins), and the service worker (browsers require a real origin for those entirely — it fails to register silently over `file://`, which is fine, the app just runs without offline support in that case).

## Deploying it

It's a static file set, so any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3+CloudFront, or a plain web server. Publish the whole folder (`index.html` plus the PWA files) — nothing to build, bundle, or install.

## Installing it as an app (PWA)

Once served over `http(s)://`, the site is installable: "Add to Home Screen" on mobile, or the install icon in a desktop browser's address bar. It'll launch full-screen (no browser chrome) and cache itself for offline use after the first visit — the oil library, blend analyzer, and Mood Card all keep working with no network at all (`sw.js`, cache-first for the app shell). The one thing that never works offline is the email gate's Formspree submission, since that's inherently a live network call.

If you regenerate the butterfly icon or change branding, regenerate all four `icon-*.png` files (192/512, plus the separately-padded `-maskable` pair — see the comment in `manifest.json`) rather than just swapping one; they're deliberately different crops, not duplicates.

## The email gate

Unlike an earlier version of this app, the email ask is **not** a first-load hard gate — the whole app (Library, Blend Analyzer, the mood quiz, Moodlab) is usable with no email ever entered. It's asked exactly once, at the moment someone clicks "Download or send your card," and immediately completes that download once submitted. `FORMSPREE_ENDPOINT` (near the bottom of the `<script>` block) is currently pointed at a real Formspree form (`https://formspree.io/f/xanonboo`). Two things worth checking before launch:

1. **Confirm the form is activated.** Formspree requires clicking a confirmation link (emailed to the form owner) after the very first submission before the form fully accepts more. Submit a test email once and check your inbox.
2. If you ever need to swap forms, replace the `FORMSPREE_ENDPOINT` constant — that's the only place it's referenced.

If `FORMSPREE_ENDPOINT` is ever left as a placeholder (contains `YOUR_FORM_ID`), the gate falls back to letting the download through anyway (with a small on-screen dev notice) rather than hard-blocking on a misconfigured site. Don't ship it in that state — it means no one is actually joining the mailing list.

## Data sources

- **Oils** (196): merged from a hand-curated set with real chemical-constituent data and a supplied "Essential Oils Application Database" spreadsheet. Oils without sourced constituent/dermal-limit data intentionally show "data pending" rather than an invented number — see the `OILS` array's comments if extending this list.
- **Curated Moods** (250 blends): from the supplied "Aroma Lab 250 Mood Blends" spreadsheet, in `MOOD_BLENDS`.

## Browser support note

Some sandboxed/secure WebViews (certain in-app browsers, MDM-managed viewers) restrict `localStorage` access and throw on touching it at all. Every `localStorage` call in this file goes through `safeStorageGet`/`safeStorageSet` wrappers that swallow that failure — the app degrades to "can't remember you between visits" rather than breaking entirely. If you add new persisted state, use those wrappers, not `localStorage` directly.
