/**
 * Production-safe public SEO normalization for the FormForge and CrateKeys Vite builds.
 * Install this in each application's scripts/ directory, then add:
 * "postbuild": "node scripts/seo-canonical-postbuild.mjs"
 * to package.json scripts. npm run build will run it after prerendering.
 * API, JavaScript bundles, auth and billing code are not modified.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const manifest = JSON.parse(await readFile('package.json','utf8'));
const hosts = {
  'planetx-formforge': ['https://planetx-formforge.vercel.app', 'https://formforge.planet-x.co'],
  'planetx-cratekeys': ['https://planetx-cratekeys.vercel.app', 'https://cratekeys.planet-x.co'],
};
const names = hosts[manifest.name];
if (!names) throw new Error('Unsupported application package: ' + manifest.name);
const [previous, canonical] = names;

let scanned = 0;
let changed = 0;
async function walk(folder) {
  for (const entry of await readdir(folder,{withFileTypes:true})) {
    const file = join(folder,entry.name);
    if(entry.isDirectory()){ await walk(file); continue; }
    // Public static SEO documents only, never application logic.
    if(!/\.(html|xml|txt)$/i.test(entry.name)) continue;
    scanned++;
    const before = await readFile(file,'utf8');
    const after = before.replaceAll(previous,canonical);
    if(after !== before){ await writeFile(file,after); changed++; }
  }
}
await walk('dist');

const home = await readFile('dist/index.html','utf8');
const robots = await readFile('dist/robots.txt','utf8');
const sitemap = await readFile('dist/sitemap.xml','utf8');
const checks = [
  ['homepage canonical', home.includes('rel="canonical" href="' + canonical + '/')],
  ['social og:url', home.includes('property="og:url" content="' + canonical + '/')],
  ['structured data product URL', home.includes('"url":"' + canonical)],
  ['robots sitemap', robots.includes(canonical + '/sitemap.xml')],
  ['sitemap public URL', sitemap.includes(canonical + '/')],
  ['old domain absent in public SEO documents', ![home,robots,sitemap].some(x=>x.includes(previous))],
];
const failed=checks.filter(([,ok])=>!ok).map(([label])=>label);
if(failed.length) throw new Error('SEO validation failed: ' + failed.join(', '));
console.log(JSON.stringify({result:'pass',product:manifest.name,canonical,scanned,changed}));
