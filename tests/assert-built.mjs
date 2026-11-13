import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
const html=readFileSync('dist/index.html','utf8');
const products=JSON.parse(readFileSync('src/data/products.json','utf8'));
const required=['rel="canonical"','href="https://saas.planet-x.co/"','name="description"','name="robots"','property="og:image"','name="twitter:card"','application/ld+json','CollectionPage','ItemList','SoftwareApplication','FAQPage'];
for(const value of required) assert.ok(html.includes(value), 'missing rendered SEO/metadata: '+value);
assert.equal(products.length,7);
for(const p of products){assert.ok(html.includes(p.name),'missing card '+p.name);assert.ok(html.includes(p.home),'missing link '+p.home)}
for(const name of ['robots.txt','sitemap.xml','llms.txt','llms-full.txt','og.svg','favicon.svg'])assert.ok(existsSync('dist/'+name),'missing static output '+name);
assert.match(readFileSync('dist/robots.txt','utf8'),/Sitemap: https:\/\/saas\.planet-x\.co\/sitemap\.xml/);
console.log('Rendered HTML SEO, 7 cards, static assets and canonical: PASS');
