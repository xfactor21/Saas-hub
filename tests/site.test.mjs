import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');const products=JSON.parse(read('../src/data/products.json'));const page=read('../src/pages/index.astro');test('seven distinct, HTTPS product destinations',()=>{assert.equal(products.length,7);assert.equal(new Set(products.map(p=>p.id)).size,7);products.forEach(p=>{assert.match(p.home,/^https:\/\//);assert.match(p.pricing,/^https:\/\//);assert.match(p.app,/^https:\/\//)})});test('canonical, social sharing, accessibility, JSON-LD and response metadata',()=>{for(const x of ['rel="canonical"','application/ld+json','CollectionPage','SoftwareApplication','FAQPage','og:image','twitter:card','focus-visible','prefers-reduced-motion'])assert.ok(page.includes(x),x)});test('app entrypoints and plan terms are present',()=>{for(const p of products)assert.ok(p.features.length>=3&&p.monthly>=0&&p.annual>=p.monthly)})

test('seven official planet.X SaaS product domains, no Vercel app card links',()=>{
  const expected = new Map([
    ['client-console','console.planet-x.co'],['dispatchloop','dispatchloop.planet-x.co'],
    ['ledgerloop','ledgerloop.planet-x.co'],['formforge','formforge.planet-x.co'],
    ['cratekeys','cratekeys.planet-x.co'],['relaydesk','relaydesk.planet-x.co'],
    ['statuspost','statuspost.planet-x.co']
  ]);
  for (const p of products) for (const key of ['home','app','pricing']) {
    const destination = new URL(p[key]);
    assert.equal(destination.hostname, expected.get(p.id),p.id+' '+key);
  }
});
