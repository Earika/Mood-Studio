# Vibez & Butterflyz — Sensory & Mood Studio

A single-file, static web app: pick essential oils, build a blend, check its safety profile, generate a shareable "Mood Card," and get a matching drink/food pairing (the Lounge Experience). No build step, no framework, no server required to run it.

## Running it locally

Everything — HTML, CSS, JS, the oil/blend data, and the butterfly artwork — lives in one file: `index.html`. There is no companion file to lose track of.

```bash
# from this folder
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

Double-clicking `index.html` to open it directly in a browser (`file://`) also works for everyday use. The one thing that *won't* work over `file://` in most browsers is the email-gate's network request to Formspree (browsers block `fetch` from `file://` origins) — serve it over `http(s)://` to test that specific flow.

## Deploying it

It's a static file, so any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3+CloudFront, or a plain web server. Just publish `index.html` — nothing to build, bundle, or install.

## Before going live: the email gate

The site hard-gates on an email address before letting anyone in (`FORMSPREE_ENDPOINT`, near the bottom of the `<script>` block). It's currently pointed at a real Formspree form (`https://formspree.io/f/xanonboo`). Two things worth checking before launch:

1. **Confirm the form is activated.** Formspree requires clicking a confirmation link (emailed to the form owner) after the very first submission before the form fully accepts more. Submit a test email once and check your inbox.
2. If you ever need to swap forms, replace the `FORMSPREE_ENDPOINT` constant — that's the only place it's referenced.

If `FORMSPREE_ENDPOINT` is ever left as a placeholder (contains `YOUR_FORM_ID`), the gate falls back to letting visitors through anyway (with a small on-screen dev notice) rather than hard-locking a misconfigured site. Don't ship it in that state — it means no one is actually joining the mailing list.

## Data sources

- **Oils** (196): merged from a hand-curated set with real chemical-constituent data and a supplied "Essential Oils Application Database" spreadsheet. Oils without sourced constituent/dermal-limit data intentionally show "data pending" rather than an invented number — see the `OILS` array's comments if extending this list.
- **Curated Moods** (250 blends): from the supplied "Aroma Lab 250 Mood Blends" spreadsheet, in `MOOD_BLENDS`.

## Browser support note

Some sandboxed/secure WebViews (certain in-app browsers, MDM-managed viewers) restrict `localStorage` access and throw on touching it at all. Every `localStorage` call in this file goes through `safeStorageGet`/`safeStorageSet` wrappers that swallow that failure — the app degrades to "can't remember you between visits" rather than breaking entirely. If you add new persisted state, use those wrappers, not `localStorage` directly.
