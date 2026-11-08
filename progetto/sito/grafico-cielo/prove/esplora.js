const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.emulateMedia({ reducedMotion: 'reduce' });
  await p.goto('file:///home/user/mnemosyne/progetto/sito/grafico-cielo/index.html?n=3000');
  await p.waitForFunction(() => window.__tempi && window.__tempi.primo, { timeout: 90000 });
  await p.click('#livelli button[data-l="2"]'); await p.waitForTimeout(200);
  const prima = await p.evaluate(() => ({ et: __etichette.filter((e) => e.nodo).map((e) => e.nodo).join(','), pos: __cielo.NODI.slice(0, 50).map((n) => n.x + ':' + n.y).join(',') }));
  await p.click('#rimescola'); await p.waitForTimeout(200);
  const dopo = await p.evaluate(() => ({ et: __etichette.filter((e) => e.nodo).map((e) => e.nodo).join(','), pos: __cielo.NODI.slice(0, 50).map((n) => n.x + ':' + n.y).join(',') }));
  const A = new Set(prima.et.split(',')), B = dopo.et.split(',');
  console.log('rimescola: nomi in comune', B.filter((x) => A.has(x)).length, 'su', B.length, '· posizioni uguali:', prima.pos === dopo.pos);
  // stabilità nel giorno: ricarico e confronto con lo stesso seme
  const quote = await p.evaluate(() => { const c = { f: 0, r: 0, c: 0 }; for (const e of __etichette) if (e.nodo) { const q = __cielo.ANTE().quota.get(e.nodo); if (q) c[q]++; } return c; });
  console.log('quote tra i nomi in evidenza:', JSON.stringify(quote));
  // cerca e vai: 2 gesti (cerca, poi scrivi + invio)
  await p.click('#apriElenco'); await p.keyboard.type('marco aur'); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  console.log('cerca → nodo:', await p.evaluate(() => __cielo.S.nodo));
  console.log('perché:', await p.evaluate(() => { document.getElementById('perche').click(); return document.getElementById('percheR').textContent; }));
  // un vicino, poi indietro
  await p.click('#foglioC .vicini [data-va]'); await p.waitForTimeout(300); const v = await p.evaluate(() => __cielo.S.nodo);
  await p.goBack(); await p.waitForTimeout(300); const tornato = await p.evaluate(() => __cielo.S.nodo);
  console.log('vicino:', v, '→ indietro:', tornato, '· filo:', await p.evaluate(() => __cielo.S.filo.join(' > ')));
  // un nodo in evidenza: «perché lo vedo?»
  await p.goto('file:///home/user/mnemosyne/progetto/sito/grafico-cielo/index.html?n=3000'); await p.waitForFunction(() => window.__tempi && window.__tempi.primo);
  await p.click('#livelli button[data-l="2"]'); await p.waitForTimeout(200);
  const scr = await p.evaluate(() => { const e = __etichette.find((x) => x.nodo && __cielo.ANTE().quota.get(x.nodo) === 'c') || __etichette.find((x) => x.nodo); return [e.nodo, e.x, e.y]; });
  await p.evaluate((id) => __cielo.apri(id), scr[0]); await p.waitForTimeout(300);
  console.log('in evidenza', scr[0], '→', await p.evaluate(() => { document.getElementById('perche').click(); return document.getElementById('percheR').textContent; }));
  await p.screenshot({ path: '/home/user/mnemosyne/progetto/sito/grafico-cielo/foto/scala-3000-4-perche-tel.png' });
  console.log('errori', errs);
  await b.close();
})();
