# ShieldPlusEGY — Project Guide

## 1. Purpose

A bilingual (English / Egyptian Arabic) customer-facing **lead-generation website** for
ShieldPlusEGY, a paint protection film and detailing studio in Dokki, Giza.

The site exists to let a customer:

- explore the six paint protection films and compare them honestly;
- understand thermal insulation, graphene, polishing and washing;
- see real prices and warranties before they call;
- reach the business on WhatsApp in one tap.

### Hard scope boundary

This is the **PROFESSIONAL package**. The following do **not** exist and must not be added:

| Not present | Not present |
|---|---|
| Payment gateway / checkout | Admin dashboard or panel |
| Payment processing / webhooks | Admin authentication |
| Database | Customer accounts or login |
| CRM | Real-time availability / calendar |
| Booking management | Automatic booking confirmation |
| Inventory / analytics dashboards | Backend API routes |

**There are no API routes and no server-side form handling.** `src/app/api/` does not
exist and must not be created. If a future feature seems to need one, it is out of
package scope — raise it rather than building it.

## 2. Technology stack

- **Next.js 16** (App Router, Turbopack) — `src/app/`
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** — configured in CSS via `@theme`, not a JS config file
- **next/font** — Oswald, Inter, Cairo, self-hosted at build time
- **Deployment target:** Vercel

Every page is statically prerendered for both locales (`● SSG` in the build output).
No runtime server work happens on a page request.

## 3. Project structure

```
src/
  app/
    [locale]/                  ← the root layout lives here (html/body/dir)
      layout.tsx               fonts, metadata, LocalBusiness JSON-LD, chrome
      page.tsx                 home
      ppf/page.tsx             six films + comparison + request form
      thermal-insulation/      Eagle CM8060+
      graphene/                Adams Graphene Advance (quote-only)
      polishing/               2,500 EGP surface treatment
      washing/                 wash tiers + products used
      contact/                 contact details + request form
      not-found.tsx            bilingual 404
    globals.css                design tokens, motion, RTL exceptions
    sitemap.ts  robots.ts
  components/                  presentational + 3 client components
  lib/
    business.ts                ← contact details SOURCE OF TRUTH
    catalog.ts                 ← products & prices SOURCE OF TRUTH
    i18n.ts                    ← all UI copy, both languages
    whatsapp.ts                deep-link builders
    routes.ts                  site map (drives nav, footer, sitemap)
    seo.ts                     per-page metadata helper
public/media/                  client's own photos and studio footage
```

Client components (everything else is a server component):
`Header`, `Reveal`, `FilmComparison`, `AppointmentForm`.

## 4. Design system

Dark, technical, premium-automotive. Carried over from the client-approved demo.

| Token | Value | Use |
|---|---|---|
| `bg` | `#0A0C10` | page background |
| `surface` | `#12151B` | alternating section bands |
| `card` / `card-hi` | `#161A22` / `#1C212B` | cards, nested panels |
| `border` | `rgba(255,255,255,.08)` | hairlines |
| `fg` / `muted` | `#F5F6F8` / `#98A2B3` | text |
| `accent` | `#3B76F0` | brand blue, primary actions |
| `sun` | `#F2A63B` | heat / thermal insulation |
| `whatsapp` | `#25D366` | every WhatsApp CTA |

**Type:** Oswald (Latin display, uppercase, tracked) + Inter (Latin body).
Arabic uses **Cairo for both roles** — Oswald has no Arabic glyphs. This swap happens
automatically in `globals.css` under `[dir="rtl"]`.

### Design rules

- **Do not** introduce glassmorphism, heavy gradients, floating decorations, or large
  animations. The client brief prohibits them.
- **Do not** add fake trust badges, certification logos, awards or star ratings.
- Icons are inline SVG from `components/Icons.tsx`. **Never use emoji as icons.**
- Motion is opacity + transform only, ~700ms, and fully disabled under
  `prefers-reduced-motion`.
- Every interactive element needs a visible focus state and a ≥44px touch target.

## 5. Business information — source of truth

**`src/lib/business.ts`.** Nothing else should hardcode a phone number or address.

- Primary line / WhatsApp: **+20 115 090 4009**
- Second line (voice only, not confirmed as WhatsApp): **+20 128 122 0433**
- Address: **16 Tehran St., off Mossadak St., Dokki, Giza**
- Instagram + TikTok: `@shieldplusegy`

`siteUrl` is currently `https://shieldplusegy.com` — **a placeholder**. It drives
canonical URLs, Open Graph and the sitemap, so update it the moment the real domain
is known.

## 6. Product catalog — source of truth

**`src/lib/catalog.ts`.** Prices, warranties, thicknesses and specifications live
here and nowhere else.

### The `null` rule

A field the client never supplied is `null`, and renders as an em dash (**—**).

> **Never replace a `null` with a guess, an estimate, or an "industry typical" value.**
> Royal has no supplied warranty. Adams Graphene Advance has no supplied price.
> Those gaps are deliberate and must stay visible.

`priceEGP: null` also switches that product's CTA from *Request an Appointment* to
*Request a Quote*, and omits its `offers` block from structured data — so no invented
figure can leak into search results.

### How to update

| Task | Where |
|---|---|
| Change a film price | `FILMS[].priceEGP` |
| Change a warranty | `FILMS[].warrantyYears` (or `THERMAL` / `GRAPHENE`) |
| Change a thickness | `FILMS[].thickness` |
| Add a film spec bullet | `FILMS[].notes` — needs both `en` and `ar` |
| Add a new film | append to `FILMS`; cards, comparison table, form dropdown and JSON-LD all pick it up automatically |
| Change polishing / washing prices | `POLISHING`, `WASHING` |
| Change wash products | `WASHING.products` |
| Add a new page | add to `ROUTES` in `lib/routes.ts` — nav, footer and sitemap follow |
| Change any UI text | `lib/i18n.ts`, both `en` and `ar` |

Adding a locale key to one language and not the other is a TypeScript error.

## 7. Images and video

`public/media/` holds **only the client's own photography and studio footage**. No stock
imagery is used anywhere on the site.

Media is placed by what it actually shows — a clip is never dropped onto a page just to
fill space:

| File | Shows | Used on |
|---|---|---|
| `ppf-application.mp4` | Film sheet being laid over a Škoda | **Home hero** + PPF page |
| `hero-poster.jpeg` | Still lifted from the frame above | Hero poster / LCP image |
| `ppf-squeegee.mp4` | Film squeegeed down over the bumper | PPF page |
| `tint-windscreen.jpeg` | Film being squeegeed onto a windscreen | Thermal insulation page |
| `washing-rinse.mp4` | Car being rinsed down | Washing page |
| `washing-microfibre.jpeg` | Microfibre drying a wet window | Washing page |
| `polishing-machine.jpeg` | Rotary polisher on a bonnet | Polishing page |
| `finish-walkaround.mp4` | Finished, reflective paintwork | Polishing page |
| `studio-bmw-x7.mp4`, `studio-1/2.mp4` | Studio B-roll | Gallery |
| `work-*.jpeg` | Six finished cars | Gallery |

All the client's footage is shot vertically on a phone. `MediaTile` renders every clip
and photo in the same 3/4 portrait frame with `object-cover` so mixed rows stay even.

Clips are `muted loop playsInline` with no controls — they are ambient B-roll, not a
player. The hero's poster is a frame taken from the hero clip itself, so there is no
visual jump when playback starts. If you swap the hero video, **regenerate the poster
from the new clip.**

> Frame extraction note: these MP4s carry rotation metadata. Browsers apply it;
> GStreamer/`ffmpeg` frame dumps do not. Rotate an extracted frame −90° before using it
> as a poster, or it will be sideways.

**Film product cards are deliberately image-free.** No verified manufacturer photography
was supplied for IKON, Pro Tech, Royal, Hexis, Dino Stek, Eagle or Adams. Rather than
pass a generic automotive photo off as a named product's image, the cards are
typographic and spec-led.

If the client supplies real product images later, add them per-product and keep the
alt text specific. **Do not** attach a generic car photo to a named product.

## 8. How appointment and quote requests work

**Everything is a WhatsApp deep link. Nothing is stored. Nothing is auto-confirmed.**

```
Website → customer taps CTA (or fills the request form)
        → wa.me opens with the message pre-filled
        → customer presses send
        → owner reads it and confirms manually in WhatsApp
```

- `lib/whatsapp.ts` builds every link. `waInterest(subject, locale, isQuote)` produces
  the product-specific openers; `waAppointment(draft, locale)` composes the form.
- `AppointmentForm` **posts nowhere**. It is not even a `<form>` element. Its submit
  control is a real `<a href="wa.me/...">` kept in sync with the fields, so a valid
  click is an ordinary link navigation that popup blockers leave alone. Validation
  runs on click and cancels navigation when it fails.
- Copy must never say an appointment is *confirmed* — only that the request was
  opened/sent and the business will reply. This wording is in `i18n.ts` under
  `form.disclaimer` and `form.opened`.

Quote-only products (currently Adams Graphene Advance) use *Request a Quote*.

## 9. Environment variables

**None.** The site has no secrets, no API keys and no external services. If a future
change appears to need an env var, that is a signal it may be outside package scope.

## 10. Deployment

```bash
npm run dev     # local, http://localhost:3000
npm run build   # static export into out/ — must pass before deploying
npm run lint    # must be clean
```

The site is a **static export** (`output: "export"` in `next.config.ts`). It has no
backend, so nothing is lost by exporting — every page was already prerendered. The
build writes plain HTML/CSS/JS to `out/`, which any static host can serve.

### Live on GitHub Pages

Pushing to `main` runs `.github/workflows/deploy.yml`, which lints, builds, sanity-
checks the export and publishes it. Pages must be set to **Source: GitHub Actions**
(Settings → Pages) — the default "Deploy from a branch" will not work.

Two environment variables drive the build; the workflow sets both from
`actions/configure-pages`, so they are correct automatically:

| Variable | Purpose | Project Pages | Custom domain |
|---|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | URL prefix | `/ShieldPlusEgyLive` | *(empty)* |
| `NEXT_PUBLIC_SITE_URL` | canonicals, OG, sitemap | `https://<user>.github.io/ShieldPlusEgyLive` | `https://theirdomain.com` |

#### Two traps this build already works around

1. **`_next/` and Jekyll.** GitHub Pages runs Jekyll by default, which silently drops
   any directory starting with `_` — that is the entire JS/CSS bundle. `public/.nojekyll`
   disables it. **Never delete that file.**
2. **basePath and raw asset URLs.** Next rewrites `<Link href>` for the base path, but
   it does *not* rewrite `<video src>`, `poster`, or — because `images.unoptimized` is
   on — `next/image` sources either. Every one of those goes through `asset()` in
   `src/lib/asset.ts`. **Use `asset()` for any new reference to a file in `public/`,**
   or it will 404 on Pages while working fine locally.

#### The "/" → "/en/" hop exists twice, on purpose

No route owns `/`, so it needs redirecting — but each mechanism only covers one
environment. **Keep both:**

- **`redirects()` in `next.config.ts`** — covers `next dev` and any Node host.
  Delete it and `localhost:3000` 404s.
- **`public/index.html`** — covers the static export, where there is no server to
  redirect. It picks a locale from `navigator.language` with a `<meta refresh>`
  fallback, using relative paths so it works at a domain root or in a subfolder.

`next build` prints *"Specified redirects will not automatically work with output:
export"* three times. **That warning is expected** — the export uses the HTML file
instead. Do not "fix" it by deleting the redirect.

#### Custom domain

1. Settings → Pages → Custom domain, enter it. This writes a `CNAME` file.
2. Point DNS at GitHub (`A` records to their four IPs, or a `CNAME` to
   `<user>.github.io`).
3. Tick **Enforce HTTPS** once the certificate is issued.
4. Set `NEXT_PUBLIC_BASE_PATH` to empty in the workflow and update the
   `BUSINESS.siteUrl` fallback in `src/lib/business.ts`.
5. Submit `/sitemap.xml` to Google Search Console.

Do not describe the domain as connected until it actually resolves over HTTPS.

### Vercel

Still supported — a static export deploys there unchanged. Import the repo, framework
preset **Next.js**, and leave both environment variables unset so the site builds at
the domain root.

## 11. Security

There is no backend, no database and no user input leaving the browser, so the attack
surface is close to zero. Keep it that way:

- Every external link uses `target="_blank"` **with `rel="noopener noreferrer"`**.
- `dangerouslySetInnerHTML` is used only for JSON-LD built from local constants —
  never pass user input or remote data through it.
- Do not add analytics, chat widgets or third-party embeds without asking; each one
  reintroduces a privacy and performance cost this build deliberately avoids.

## 12. Content integrity

The client brief forbids inventing content. Specifically, never add:

reviews · testimonials · star ratings · awards · certifications · authorised-dealer
claims · years of experience · customer counts · partnerships · opening hours ·
prices · warranties · thicknesses · IR/UV/VLT/heat-rejection percentages · coating
thickness · hydrophobic percentages · paint-correction stages · machine or compound
brands · appointment availability

If a value is unknown, render **—** and tell the client it is outstanding.

## 13. Still outstanding from the client

- [ ] Real domain name (`BUSINESS.siteUrl` is a placeholder)
- [ ] Opening hours (the contact page currently says to ask on WhatsApp)
- [ ] Confirmation that **+20 128 122 0433** is voice-only or also WhatsApp
- [ ] Exact Google Maps pin (the current link is a search query, not a place ID)
- [ ] Verified product photography for the six films, Eagle and Adams
- [ ] A price for Adams Graphene Advance, if it should be published
- [ ] Royal's warranty period, if one exists
- [ ] Real customer reviews, if the client wants a reviews section
