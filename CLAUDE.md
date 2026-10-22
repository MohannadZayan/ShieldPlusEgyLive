# ShieldPlusEGY — Project Guide

## 1. Purpose

A bilingual (English / Egyptian Arabic) customer-facing **lead-generation website** for
ShieldPlusEGY, a paint protection film and detailing studio with branches in Dokki,
Giza and Nasr City, Cairo. Live at **https://shieldplusegy.com**.

The site exists to let a customer:

- explore the eight paint protection films and compare them honestly;
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
- **Deployment:** static export, published to GitHub Pages at shieldplusegy.com

Every page is statically prerendered for both locales (`● SSG` in the build output).
No runtime server work happens on a page request.

## 3. Project structure

```
src/
  app/
    [locale]/                  ← the root layout lives here (html/body/dir)
      layout.tsx               fonts, metadata, LocalBusiness JSON-LD, chrome
      page.tsx                 home
      ppf/page.tsx             eight films + comparison + request form
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
- **Two branches**, in `BUSINESS.branches` (first is treated as primary for
  metadata and structured data):
  - **Dokki** — 16 Tehran St., off Mossadak St., Dokki, Giza
  - **Nasr City** — Shinzo Abe Axis, opposite the Jetour dealership, Nasr City, Cairo
- Socials: Instagram, TikTok, Facebook, YouTube, X — all in `BUSINESS.social`,
  rendered from one shared list in `components/SocialLinks.tsx`

Adding a branch to `BUSINESS.branches` automatically updates the footer, the contact
page and the LocalBusiness structured data (one entry per branch). Neither branch has
supplied opening hours — do not invent any.

`siteUrl` is `https://shieldplusegy.com`, the live domain. It drives canonical URLs,
Open Graph and the sitemap.

## 6. Product catalog — source of truth

**`src/lib/catalog.ts`.** Prices, warranties, thicknesses and specifications live
here and nowhere else.

### Eight films

`FILMS` holds eight products: Pro Tech 5 Year, Pro Tech 7 Year, Royal, Shield Pro
Prime, Shield Pro Ultra, Dino Stek, Scotch Guard and Hexis.

Shield Pro Prime and Shield Pro Ultra are both American, Gulf-specification and
nano-ceramic, both with a 10-year warranty — Ultra additionally has self-healing;
Prime does not. Neither has a client-supplied thickness, so `thickness` stays `null`
for both. Neither has a confirmed anti-yellowing claim, so `antiYellowing` stays
`false` for both — do not set it `true` without client confirmation.

**Scotch Guard is the one entry with manufacturer-sourced data rather than
client-supplied data.** Its thickness (200 µm / 8 mil), self-healing and
anti-yellowing come from 3M's published specs for Scotchgard™ PPF Pro Series, and the
reasoning is documented inline on the entry. Two fields are deliberately left unset:

- `nanoCeramic: false` — 3M Scotchgard uses a urethane clear coat, **not** a ceramic
  topcoat. 3M sells ceramic coating separately, to go *over* the film. Setting this
  true would be a fabricated technical claim.
- `warrantyYears: null` — 3M's 10-year warranty requires a **3M Certified Installer**.
  That has not been confirmed for this business, so publishing it could promise cover
  the client cannot honour.

It also assumes the client stocks the Pro Series variant; other Scotchgard variants
differ in thickness. Confirm with the client and correct `thickness` if not.

Because Scotch Guard is not nano-ceramic, site copy must not claim that *every* film
is self-healing/nano-ceramic/anti-yellowing, or that every film carries a warranty.
That wording was removed for exactly this reason; do not reintroduce it.

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
| `ppf-slip-solution.mp4` | Slip solution on a black MG during install | PPF page |
| `ppf-squeegee-mg.mp4` | Red squeegee drawing film down | PPF page |
| `ppf-squeegee-fender.mp4` | Yellow squeegee working slip solution across a fender during film install | PPF page |
| `ppf-slip-solution-bonnet.mp4` | Film draped over a bonnet, slip solution bubbles, showroom reflections | PPF page |
| `graphene-bottle.mp4` | Graphene coating bottle in hand | Graphene page |
| `wax-application.mp4` | Coating worked across a dark blue bonnet | Washing page (wax) |
| `washing-rinse.mp4` | Car being rinsed down | Gallery |
| `tint-windscreen.jpeg` | Film being squeegeed onto a windscreen | Thermal insulation page |
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
was supplied for Pro Tech, Royal, Shield Pro, Hexis, Dino Stek, Eagle or Adams. Rather than
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

**Live at `https://shieldplusegy.com` — served at the domain ROOT.**

Two environment variables drive the build, set explicitly in the workflow:

| Variable | Value | Purpose |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | *(empty)* | URL prefix. Empty = domain root. |
| `NEXT_PUBLIC_SITE_URL` | `https://shieldplusegy.com` | canonicals, Open Graph, sitemap |

> **Do not set `NEXT_PUBLIC_BASE_PATH` to `/ShieldPlusEgyLive`.** These were once
> derived from `actions/configure-pages`, which kept reporting the repo path
> `/ShieldPlusEgyLive` after the custom domain went live. Every asset URL was then
> prefixed with a folder that does not exist at the domain root, so the CSS, JS,
> fonts and images all 404'd and the site rendered as unstyled HTML. The values are
> now declared explicitly, and the deploy workflow fails the build if the repo name
> ever reappears in an asset URL.
>
> A base path is only needed if the custom domain is removed and the site goes back
> to `https://<user>.github.io/ShieldPlusEgyLive/`. While the domain is configured,
> that old URL simply 301s to it.

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

#### Custom domain — already done

`shieldplusegy.com` is configured in Settings → Pages, DNS is live at Namecheap, and
HTTPS is issued. Nothing here needs redoing. The remaining SEO step is submitting
`https://shieldplusegy.com/sitemap.xml` to Google Search Console.

The custom domain is stored in the Pages **settings**, not as a `CNAME` file in the
repo — that is normal for Actions-based deploys. If the domain is ever cleared from
settings after a deploy, re-enter it there rather than adding a `CNAME` file to
`public/`.

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

- [x] ~~Real domain~~ — shieldplusegy.com is live
- [ ] Opening hours for **both branches** (the contact page says to ask on WhatsApp)
- [ ] Confirmation that **+20 128 122 0433** is voice-only or also WhatsApp
- [ ] Exact Google Maps pin for the **Dokki** branch (its link is still a search query,
      not a place ID). Nasr City has a real pin.
- [ ] Verified product photography for the eight films, Eagle and Adams
- [ ] A price for Adams Graphene Advance, if it should be published
- [ ] Royal's warranty period, if one exists
- [ ] Scotch Guard's warranty, thickness and film features — currently all em dashes
- [ ] Shield Pro Prime / Ultra thickness, and whether either carries an
      anti-yellowing warranty — currently all em dashes / unset
- [ ] Confirm whether `wax-application.mp4` shows waxing or graphene being applied:
      it was filmed on the same car, in the same session, as `graphene-bottle.mp4`
- [ ] Real customer reviews, if the client wants a reviews section
