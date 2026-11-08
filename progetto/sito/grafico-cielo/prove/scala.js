// prova di scala: foto, tempi, sovrapposizioni, fps durante pan e zoom
const { chromium } = require('playwright');
const OUT = '/home/user/mnemosyne/progetto/sito/grafico-cielo/foto/';
const solo = process.argv[2];
(async () => {
  const b = await chromium.launch(); const righe = [];
  for (const n of [0, 1000, 3000]) for (const [disp, vp] of [['tel', { width: 390, height: 844 }], ['desk', { width: 1440, height: 900 }]]) {
    if (solo && String(n) !== solo) continue;
    const p = await b.newPage({ viewport: vp, hasTouch: disp === 'tel' }); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.goto('file://' + OUT + '../index.html' + (n ? '?n=' + n : ''));
    await p.waitForFunction(() => window.__tempi && window.__tempi.primo, { timeout: 90000 }); await p.waitForTimeout(400);
    const nome = `scala-${n || 200}`;
    await p.screenshot({ path: `${OUT}${nome}-1-regioni-${disp}.png` });
    const misure = await p.evaluate(async () => {
      const [zoom, sCv] = __cielo.zoom(); const sovr = () => { const xs = window.__etichette || []; let k = 0; for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) { const a = xs[i], b = xs[j]; if (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y) k++; } return [k, xs.length]; };
      const out = { primo: Math.round(__tempi.primo), layout: Math.round(__tempi.layout), nodi: __cielo.NODI.length, frasi: __cielo.F.length };
      const liv = [];
      for (const z of [1, 2.3, 4.2, 7]) { const s0 = __cielo.zoom()[1]; document.querySelector(`#livelli button[data-l="${[1, 2.3, 4.2, 7].indexOf(z) + 1}"]`).click(); await new Promise((r) => setTimeout(r, 120)); __cielo.disegna(); const [k, e] = sovr(); liv.push(`${e}/${k}`); }
      out.etichette = liv.join(' ');
      // fps: 90 fotogrammi di pan e zoom, ognuno con il suo disegno
      document.querySelector('#livelli button[data-l="2"]').click(); await new Promise((r) => setTimeout(r, 100));
      const t = []; let k = 0;
      await new Promise((res) => { const passo = (ts) => { const a = performance.now(); sCv.call(zoom.translateBy, 6 / zoom.scaleExtent()[0] * 0 + 4, 2); if (k % 30 === 15) sCv.call(zoom.scaleBy, 1.15); __cielo.disegna(); t.push(performance.now() - a); if (++k < 90) requestAnimationFrame(passo); else res(); }; requestAnimationFrame(passo); });
      t.sort((a, b) => a - b); out.ms_med = Math.round(t[45] * 10) / 10; out.ms_p95 = Math.round(t[85] * 10) / 10; out.fps = Math.round(1000 / Math.max(16.7, t[45]));
      return out;
    });
    await p.click('#livelli button[data-l="2"]'); await p.waitForTimeout(300); await p.screenshot({ path: `${OUT}${nome}-2-temi-${disp}.png` });
    await p.click('#livelli button[data-l="4"]'); await p.waitForTimeout(300); await p.screenshot({ path: `${OUT}${nome}-3-frasi-${disp}.png` });
    righe.push({ n: n || 200, disp, ...misure, err: errs.length });
    await p.close();
  }
  console.table(righe); await b.close();
})();
