# FormForge / CrateKeys canonical-domain repair

**Scope:** This is a tested portable patch for each *independent* application, not application source code. It is deliberately stored in the SaaS Hub operations folder and is not imported into the Hub's Astro build.

Both apps have working branded domains but their Vite prerender builds originally generate `planetx-*.vercel.app` in public page canonical URLs, Open Graph tags, JSON-LD, robots and sitemaps. Google may prefer the alias instead of the branded address.

## Implementation per app

1. Open that application's **original, complete** project source (not an exported `dist` alone). Do not modify server/API/auth or billing code.
2. Copy `seo-canonical-postbuild.mjs` to `scripts/seo-canonical-postbuild.mjs`.
3. Add to its `package.json` scripts: `"postbuild": "node scripts/seo-canonical-postbuild.mjs"`. Keep the existing build: `node scripts/assert-production-ready.mjs && tsc --noEmit && vite build && node scripts/prerender.mjs`.
4. Run `npm ci`, `npm test` and `npm run build`. The script refuses unknown package names and validates generated `dist/index.html`, `dist/robots.txt` and `dist/sitemap.xml`.
5. Publish a **preview** with the full unchanged application source plus this two-file change. Inspect pricing and all public marketing pages, robots, sitemap, canonical and JSON-LD; check keyboard/mobile navigation, public form or license flow, sign-in, password reset, Stripe webhook routes and plan entitlements. Do not conduct real transactions without owner approval.
6. Only after preview QA, publish production and verify raw HTML responses on the branded URLs; do not remove the old Vercel hostnames until dependency callbacks/embeds have been audited.

## Product scope

- FormForge: https://formforge.planet-x.co/
- CrateKeys: https://cratekeys.planet-x.co/
- Their source repositories are not in the connected GitHub installation; do not move entire apps into `xfactor21/Planetx` or this Hub repo.

## Deployment blocker

The Vercel API rejected a preview deployment with `402 api-deployments-free-per-day` and a 24-hour retry restriction. This is a platform quota, not a passing build. Reattempt deployment from each application's own source once quota is lifted. Do **not** claim the fix is live until tested against the real production page.

## Search visibility

Search Console's connected GSC Wizard service currently reports `subscription_required`, so Google's selected canonicals and sitemap indexing status were not verified. SEO deployment is not the same as search-engine indexing. Once account access is available, submit branded public sitemaps; avoid indexing login, API and private workspace paths.
