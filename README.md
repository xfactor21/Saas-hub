# planet.X SaaS Hub

Dedicated source for the public SaaS directory at https://saas.planet-x.co. This repository is **not** the company website (`xfactor21/Planetx`).

Seven products: Client Console, DispatchLoop, Ledgerloop, FormForge, CrateKeys, RelayDesk, StatusPost. Source of truth: `src/data/products.json` (business descriptions/prices checked against public deployments on 2026-11-13).

`npm install`, `npm test`, `npm run build` — Astro static export in `dist/`; no API endpoints or secrets used here. Vercel project: `planetx-saas-hub`, domain `saas.planet-x.co`.

RelayDesk and StatusPost currently use their verified `vercel.app` domains. Their branded subdomains are not configured yet. Do not invent branded URLs or change product app source/billing from this repository.

SEO: canonical HTML, Organization/CollectionPage/ItemList/SoftwareApplication/FAQ JSON-LD, public sitemap, robots, LLMS text and social media metadata. All product auth and payment links lead to the individual app.
