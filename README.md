# ShieldPlusEGY

Bilingual (EN / AR) lead-generation website for ShieldPlusEGY — paint protection film,
thermal insulation, graphene protection, polishing and detailing in Dokki, Giza.

Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4. Every page is
statically prerendered for both locales.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # production build
npm run lint
```

## Where things live

| I want to change… | Edit |
|---|---|
| A phone number, the address, social links | `src/lib/business.ts` |
| A price, warranty, thickness or product spec | `src/lib/catalog.ts` |
| Any text on the site (English or Arabic) | `src/lib/i18n.ts` |
| The pages in the nav / footer / sitemap | `src/lib/routes.ts` |
| Colours, fonts, motion | `src/app/globals.css` |
| Photos and video | `public/media/` |

## Important

This site has **no backend, no database and no admin panel**. Every appointment and
quote request is a WhatsApp deep link with a pre-filled message — the customer sends
it, and the business owner confirms manually.

A specification the client never supplied is stored as `null` and renders as an em
dash (—). **Never fill one in with a guess.**

See [CLAUDE.md](CLAUDE.md) for the full project guide, scope boundaries, content rules
and the deployment checklist.
