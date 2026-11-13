# planet.X SaaS Hub

Dedicated source for the public SaaS directory at https://saas.planet-x.co. This repository is **not** the company website (`xfactor21/Planetx`).

Seven products: Client Console, DispatchLoop, Ledgerloop, FormForge, CrateKeys, RelayDesk, StatusPost. Source of truth: `src/data/products.json` (business descriptions/prices checked against public deployments on 2026-11-13).

`npm install`, `npm test`, `npm run build` — Astro static export in `dist/`; no API endpoints or secrets used here. Vercel project: `planetx-saas-hub`, domain `saas.planet-x.co`.

RelayDesk and StatusPost now have verified, Vercel-assigned branded domains: `relaydesk.planet-x.co` and `statuspost.planet-x.co`. All seven directory links on `main` use branded `planet-x.co` domains. Changes to the individual SaaS apps, including billing and authentication, remain outside this repository.

SEO cleanup for FormForge and CrateKeys is staged and tested under `ops/seo/` but **is not deployed** to their application production. Their Vite build source and separate Vercel deployments must be patched and preview-tested after the Vercel deployment API quota resets. Production of the Hub may also lag behind `main` while quota is exhausted; verify the live deployment before declaring a change live.

SEO: canonical HTML, Organization/CollectionPage/ItemList/SoftwareApplication/FAQ JSON-LD, public sitemap, robots, LLMS text and social media metadata. All product auth and payment links lead to the individual app.
