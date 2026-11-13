import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, copyFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const source = resolve('ops/seo/seo-canonical-postbuild.mjs');
for (const [product, oldHost, newHost] of [
  ['planetx-formforge','https://planetx-formforge.vercel.app','https://formforge.planet-x.co'],
  ['planetx-cratekeys','https://planetx-cratekeys.vercel.app','https://cratekeys.planet-x.co'],
]) {
  test(product + ' generates branded canonical, OG, JSON-LD, sitemap, and robots without changing APIs', async () => {
    const folder=await mkdtemp(join(tmpdir(),'saas-seo-'));
    try {
      await mkdir(join(folder,'dist'));
      await mkdir(join(folder,'api'));
      await writeFile(join(folder,'package.json'),JSON.stringify({name:product,type:'module'}));
      await copyFile(source,join(folder,'seo.mjs'));
      await writeFile(join(folder,'dist/index.html'),'<html><head><link rel="canonical" href="'+oldHost+'/"/><meta property="og:url" content="'+oldHost+'/"/><script type="application/ld+json">{"url":"'+oldHost+'/"}</script></head></html>');
      await writeFile(join(folder,'dist/robots.txt'),'Sitemap: '+oldHost+'/sitemap.xml');
      await writeFile(join(folder,'dist/sitemap.xml'),'<loc>'+oldHost+'/</loc>');
      await writeFile(join(folder,'api/auth.js'),'const callback = "'+oldHost+'";');
      execFileSync(process.execPath,['seo.mjs'],{cwd:folder,stdio:'pipe'});
      for(const file of ['index.html','robots.txt','sitemap.xml']){
        const data=await readFile(join(folder,'dist',file),'utf8');
        assert.ok(data.includes(newHost),file+' should use branded URL');
        assert.ok(!data.includes(oldHost),file+' must not contain old URL');
      }
      assert.match(await readFile(join(folder,'api/auth.js'),'utf8'),new RegExp(oldHost.replace(/[.*+?^$\{\}()|[\]\\]/g,'\\$&')),'API should remain untouched');
    } finally { await rm(folder,{recursive:true,force:true}); }
  });
}
