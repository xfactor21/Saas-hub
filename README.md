# planet.X SaaS Hub

The standalone SaaS directory at **https://saas.planet-x.co/**.

This repository is dedicated to the SaaS Hub. It is **not** the planet.X company website repository (`xfactor21/Planetx`). Do not share deployment configuration or source trees between them.

## Source status

The full audited Astro source package is `PlanetXSaaS-11.12-v2-seo-geo.zip` (provided as a downloadable conversation artifact). The source package has not yet been imported to this repository; **this README is not deployable**. The existing production site remains served by the independent Vercel project `planetx-saas-hub`.

After importing the complete archive's root contents, run `npm install && npm test && npm run build`. Configure Vercel framework **Astro**, output directory `dist`, production branch `main`, and compare the generated site against https://saas.planet-x.co/ before enabling Git-connected production deployments.

The SaaS services retain independent auth, billing and repositories: Client Console, DispatchLoop, Ledgerloop, FormForge and CrateKeys. Do not migrate their source or secrets into this directory.
