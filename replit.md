# AL MURTAZA INTERNATIONAL PHARMA

A landing page for a Mumbai-based pharmaceutical export company — showcasing products, certifications, global markets, and a contact inquiry form.

## Run & Operate

- `pnpm --filter @workspace/almurtaza-pharma run dev` — run the landing page (port 18779)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, framer-motion, shadcn/ui
- API: Express 5 (contact form endpoint)
- Fonts: Plus Jakarta Sans + Playfair Display

## Where things live

- `artifacts/almurtaza-pharma/src/pages/home.tsx` — the entire landing page
- `artifacts/almurtaza-pharma/src/index.css` — pharma theme (navy/teal palette)
- `artifacts/almurtaza-pharma/public/` — hero-globe.png, pharma-lab.png, shipping-logistics.png, logos
- `attached_assets/` — product images imported via `@assets/` alias
- `artifacts/api-server/src/routes/contact.ts` — POST /api/contact endpoint

## Architecture decisions

- Single-page landing site, no database needed — contact form POSTs to Express API and logs the inquiry
- Images split between `public/` (background/branding) and `attached_assets/` (product photos) with `@assets` Vite alias
- Certification marquee uses framer-motion drag + `useAnimationFrame` for seamless auto-scroll
- WhatsApp deep-link used as primary CTA (`wa.me/918169789848`)

## Product

- Hero with globe background + WHO-GMP/EU-GMP/USFDA certification badges
- Animated certification strip (IEC, WDL, FSSAI, GST, MSME, CDSCO) with draggable marquee
- Trust pillars, stats counter, about section
- 8 product categories with image modal viewer
- Global markets (Gulf, Africa, Western countries)
- Contact inquiry form (name, company, email, country, message)
- Footer with quick links and legal

## User preferences

- Exported from previous Replit project — rebuild to match original exactly

## Gotchas

- `@assets` alias resolves to workspace root `attached_assets/` (set in vite.config.ts)
- Public images referenced as `/hero-globe.png` (served from artifact's `public/` folder)
- WhatsApp number: +91 81697 89848
- Contact email: almurtazapharma@gmail.com
