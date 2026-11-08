# InWardOut: website

Website for **InWardOut**, the practice of Jan Leyssens: personal coaching and bodywork for CEOs,
entrepreneurs and other leaders. Built with **Astro 7, TypeScript (strictest) and Tailwind CSS 4**,
ready for hosting on **Vercel**.

> Status: review demo. Every page is `noindex` and the contact form sends nothing until it is configured.
> Open points are in [`CONTENT_REVIEW.md`](./CONTENT_REVIEW.md), go-live steps in [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md).

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: who it is for, the vision, Jan, programmes, process, invitation |
| `/approach` | How Jan works: five themes, bodywork explained, values |
| `/programmes` | Both twelve-week programmes, comparison, after three months |
| `/about` | Jan Leyssens: background, way of working, values, location |
| `/faq` | Questions and answers (accessible accordion) |
| `/contact` | Request an introductory conversation (form) |
| `/start` | LinkedIn landing page with minimal navigation |
| `/privacy` | Draft privacy notice (noindex, not in sitemap) |
| `/contact/sent`, `/contact/not-sent` | Result pages for form posts without JavaScript (noindex) |
| `/404` | Not found |

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
cp .env.example .env     # optional; every value has a safe default
npm run dev              # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with the contact endpoint (http://localhost:4321) |
| `npm run check` | Type check (`astro check`, TypeScript strictest) |
| `npm run build` | Production build (Vercel output in `.vercel/output`) |
| `npm run check:links` | After a build: internal links, anchors, one H1 per page, unique titles and descriptions, robots meta, no visible prices or placeholders, JSON-LD |
| `npm run verify` | All of the above in sequence |

Note: the Vercel adapter does not support `astro preview`. Use `npm run dev` to view the demo locally,
or deploy a Vercel preview.

## Where to change what

| What | Where |
| --- | --- |
| All English copy (per page) | `src/content/en/*.ts` |
| Routes, navigation, primary CTA target, flags | `src/data/settings.ts` |
| Programme facts, **price publication**, group sessions | `src/data/programmes.ts` |
| Colours, fonts, type scale, spacing | `@theme` block in `src/styles/global.css` |
| Contact form rules (client and server) | `src/lib/contact/validation.ts` |
| Form delivery (Resend / webhook) | `src/lib/contact/server.ts`, endpoint `src/pages/api/contact.ts` |
| Structured data (schema.org) | `src/lib/structured-data.ts` |
| OG image, favicon, touch icon | `public/`, regenerate with `node scripts/generate-brand-assets.mjs` (needs Playwright) |

**Later Dutch version:** copy `src/content/en/` to `src/content/nl/`, translate it, register it in
`src/content/index.ts` (the `Content` type keeps the shape identical) and add localised routes.
No language switcher is shown yet.

## Configuration (environment variables)

See [`.env.example`](./.env.example). On Vercel: *Project → Settings → Environment Variables*, then redeploy.

| Variable | Default | Effect |
| --- | --- | --- |
| `SITE_URL` | empty | Real domain. Enables canonical URLs, absolute OG URLs and the sitemap. |
| `PUBLIC_ALLOW_INDEXING` | `false` | Indexing is only allowed when this is `true` **and** `SITE_URL` is set. |
| `PUBLIC_BOOKING_URL` | empty | If set, every "Request an introductory conversation" CTA links there instead of `/contact`. |
| `PUBLIC_ANALYTICS_ENABLED` | `false` | Loads Vercel Web Analytics and sends CTA events. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | empty | Form delivery by email via Resend. |
| `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_TOKEN` | empty | Form delivery as JSON POST to a form service or automation (HTTPS only). |
| `CONTACT_PROVIDER` | auto | Force `resend` or `webhook`. |

Server variables are read through `astro:env/server` and never reach the browser.

### Contact form behaviour

- **Not configured** (default): the form is visible and validates, but a notice says it is not active yet.
  Submitting valid data shows "Not sent… nothing was submitted". No request is made, and no success is simulated.
  The endpoint itself also refuses with `503`.
- **Configured:** the success message appears **only** after the provider returns a 2xx status.
  Provider errors show a clear error message.
- Validation is shared between browser and server (`validation.ts`). There is a honeypot field,
  a same-origin check, a body size limit, protection against double submission (button lock plus an
  idempotency key for Resend) and a fallback for posts without JavaScript (303 redirect to the result pages).
- No personal data is logged; on failure only the provider status is logged.

### Analytics and CTA events

Off by default; no analytics script is included at all. When `PUBLIC_ANALYTICS_ENABLED=true`, Vercel Web
Analytics (cookieless) is loaded and clicks on elements with `data-cta` are sent as event `cta_click`
with `{ cta, page }` only, for example `home-hero-primary`, `header-primary` or `start-closing-primary`.
The form only sends its status (`sent`, `error`, …). Form content and email addresses are never sent.

## Design notes

- Provisional palette: warm ivory, deep forest green, muted copper/sand. Serif display font *Newsreader*,
  sans-serif *Instrument Sans*. Both are self-hosted via Fontsource, the Latin subset is preloaded, `font-display: swap`.
- The wordmark "InWardOut" is purely typographic and **not a final logo**.
- There is no photography yet. Jan's portrait is a placeholder composition (monogram and abstract forms),
  with no stock or AI-generated person. To add a real photo, place it in `src/assets/` and render it in
  `PortraitPlaceholder.astro` with `astro:assets` `<Image>` (fixed `width`/`height`, `loading="lazy"` below the fold).
- Minimal client JavaScript: mobile menu, FAQ accordion, form enhancement. Everything also works without JavaScript.
- `prefers-reduced-motion` is respected, focus is always visible, and there is a skip link.

## Origin

This code was first developed in the repository `Junalda/Anytimestarterspage` (branch `claude/elegant-gauss-20h40m`) and moved here as a clean start.
