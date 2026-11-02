// smista.mjs (piano blocco 5; modello §3.2, §6.2, §7.2, §7.5, §8.2).
// node scripts/smista.mjs prepara [--solo ID] [--sigilla ID] [--radice DIR]
//   1. Sigilla le chat di Specchio: con --sigilla ID quella; senza, d'ufficio, quelle ferme da prima delle 04:00 di oggi
//      (l'ultimo turno [HH:MM] prima delle ultime 04:00 passate, Europe/Rome). Sigillare = spostare ingresso/ID.md in
//      frammenti/ come gli altri; la bozza ingresso/ID.risposte.md resta dov'è ed entra nel pacchetto (la toglie applica).
//   2. Sposta in frammenti/AAAA/MM/ tutto ingresso/ (non le chat aperte, non i memo del Progetto: blocco 8), in ordine di
//      tempo, con un rename (i byte non si riscrivono), allegati compresi; la copia WebP delle foto solo se c'è cwebp;
//      gli hash nuovi in frammenti/.hash.
//   3. Per ogni frammento senza lettura (§8.2) scrive ingresso/.pacchetti/ID.json: frammento, contesto/recenti.md, alias,
//      candidati() per ogni nome, vicini, scarti (mappa.md § Scarti, se c'è), link [{url, titolo?, autore?}] (titolo
//      dall'oEmbed di Spotify o YouTube, autore dalla pagina; se fallisce, niente titolo: lo legge applica.mjs).
// node scripts/smista.mjs vicini ID [--radice DIR]
//   JSON in stdout, sola lettura: i vicini (§6.2, §7.5) del frammento ID già in frammenti/, dai nodi e dalle parole
//   della sua lettura.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, renameSync, openSync, readSync, closeSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { frontmatter, aggiornaHash } from './verifica.mjs';
import { carica, righeAlias, parlante } from './contesto.mjs';
import { candidati, chiave } from './slug.mjs';
import { linkDelTesto } from './applica.mjs';
import { ora, iso, oggi } from './ora.mjs';

const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/;
const GIORNO = 864e5;
const cartella = (id) => `${id.slice(0, 4)}/${id.slice(4, 6)}`;
const LINK = /https?:\/\/[^\s<>()«»"]+/g;
const FOTO = /\.(jpe?g|png)$/i;
// Parole che da sole non sono un nome (per i candidati deboli) né una parola candidata.
const VUOTE = new Set(('il lo la i gli le un una uno di a da in con su per tra fra e o ma se che chi non ne ci si mi ti vi ' +
  'del della dello dei degli delle al alla allo ai agli alle dal dalla dai dagli dalle nel nella nello nei negli nelle ' +
  'sul sulla sui sugli sulle col anche ancora come cosa così dopo dove forse loro molto poco poi quando quella quelle ' +
  'quello quelli questa queste questo questi sono sei era erano stato stata essere avere ho hai ha hanno sempre solo ' +
  'tanto tutto tutti tutta vero visto fatto credo detto diceva dice fare oggi ieri domani mio mia miei mie tuo tua suo ' +
  'sua nostro nn cmq tipo boh perché però più meno bene male the and of to').split(' '));
// La chiave di una parola (slug.chiave), senza l'ultima vocale: "padri" e "padre" si incontrano.
const radiceParola = (w) => { const k = chiave(w); return k.length >= 4 ? k.replace(/[aeiou]$/, '') : k; };
const chiaviDi = (testo) => new Set((String(testo).replace(LINK, ' ').match(/[\p{L}\p{N}]+/gu) ?? [])
  .filter((w) => !VUOTE.has(w.toLowerCase())).map(radiceParola).filter(Boolean));
// Un istante da `registrato`; un importato ha solo la data (A4): la mezzanotte di quel giorno.
const istante = (r) => Date.parse(/T/.test(String(r)) ? String(r) : `${r}T00:00:00+01:00`);
// Il giorno di calendario a Roma.
const giornoRoma = (r) => oggi(new Date(istante(r)));
const perTempo = (x, y) => (x.quando - y.quando) || (x.id < y.id ? -1 : x.id > y.id ? 1 : 0);

// L'ultima attività di una chat: l'ultimo turno [HH:MM] contato dal `registrato` (un'ora più piccola = il giorno dopo).
export function ultimoTurno(dati, corpo) {
  const r = String(dati.registrato ?? ''), m = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.exec(r);
  if (!m) return istante(r);
  let t = istante(r), prima = Number(m[2]) * 60 + Number(m[3]), giorno = Date.parse(`${m[1]}T00:00:00${m[4]}`);
  for (const [, hh, mm] of String(corpo).matchAll(/^\[(\d{2}):(\d{2})\]/gm)) {
    const min = Number(hh) * 60 + Number(mm);
    if (min < prima) giorno += GIORNO;
    prima = min;
    t = Math.max(t, giorno + min * 60000);
  }
  return t;
}
// Le ultime 04:00 di Roma già passate.
export function soglia04(adesso = ora()) {
  const scarto = iso(adesso).slice(-6);
  let s = Date.parse(`${oggi(adesso)}T04:00:00${scarto}`);
  if (adesso.getTime() < s) s = Date.parse(`${oggi(new Date(s - GIORNO))}T04:00:00${scarto}`);
  return s;
}

// Dimensioni di un JPEG o PNG (per il lato lungo della copia WebP), senza dipendenze.
function dimensioni(file) {
  const b = Buffer.alloc(1 << 16), fd = openSync(file, 'r'), n = readSync(fd, b, 0, b.length, 0);
  closeSync(fd);
  if (b.readUInt32BE(0) === 0x89504e47) return { l: b.readUInt32BE(16), a: b.readUInt32BE(20) };
  for (let i = 2; i + 9 < n;) {
    if (b[i] !== 0xff) { i++; continue; }
    const tipo = b[i + 1];
    if (tipo >= 0xc0 && tipo <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(tipo)) return { a: b.readUInt16BE(i + 5), l: b.readUInt16BE(i + 7) };
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}
const haCwebp = () => { try { execFileSync('cwebp', ['-version'], { stdio: 'ignore' }); return true; } catch { return false; } };
// La copia ridotta (§3.2, I14): lato lungo 2000 px, WebP qualità 85, accanto all'originale, che non si tocca.
function copiaWebp(origine, avvisi) {
  const dest = origine.replace(FOTO, '.webp');
  if (existsSync(dest)) return;
  const d = dimensioni(origine), giu = d && Math.max(d.l, d.a) > 2000 ? (d.l >= d.a ? ['-resize', '2000', '0'] : ['-resize', '0', '2000']) : [];
  try { execFileSync('cwebp', ['-quiet', '-q', '85', ...giu, origine, '-o', dest], { stdio: 'ignore' }); }
  catch { avvisi.push(`${origine}: cwebp non è riuscito, c'è solo l'originale`); }
}

// 1–2. Il sigillo e lo spostamento.
export function sposta(radice, { sigilla = null } = {}) {
  const dir = join(radice, 'ingresso'), spostati = [], sigillate = [], errori = [], avvisi = [];
  if (!existsSync(dir)) return { spostati, sigillate, errori, avvisi };
  const tutti = readdirSync(dir).filter((x) => !x.startsWith('.'));
  const memo = [], soglia = soglia04();
  let chatSigilla = false;
  for (const f of tutti.filter((x) => x.endsWith('.md') && !x.endsWith('.risposte.md'))) {
    const id = f.slice(0, -3);
    if (!ID_F.test(id)) { avvisi.push(`ingresso/${f}: nome che non è un id di frammento, resta dov'è`); continue; }
    let testo = '', dati, corpo;
    try { testo = readFileSync(join(dir, f), 'utf8'); ({ dati, corpo } = frontmatter(testo)); }
    catch (e) {
      if (/^\s*memo:\s*chat\b/m.test(testo)) { dati = {}; corpo = testo; }
      else { errori.push(`ingresso/${f}: ${e.message}, resta in ingresso/`); continue; }
    }
    if (/^\s*memo:\s*chat\b/.test(corpo)) {
      avvisi.push(`ingresso/${f}: memo del Progetto (memo: chat): non si separa ancora (blocco 8, modello §7.3), resta in ingresso/`);
      continue;
    }
    if (dati.canale === 'chat') {
      if (sigilla ? id !== sigilla : ultimoTurno(dati, corpo) >= soglia) continue; // chat aperta
      if (id === sigilla) chatSigilla = true;
      sigillate.push(id);
    }
    memo.push({ id, f, quando: istante(dati.registrato) });
  }
  if (sigilla && !chatSigilla) {
    if (existsSync(join(radice, 'frammenti', cartella(sigilla), `${sigilla}.md`))) avvisi.push(`--sigilla ${sigilla}: già sigillata`);
    else errori.push(`--sigilla ${sigilla}: nessuna chat ingresso/${sigilla}.md con canale: chat`);
  }
  memo.sort(perTempo);
  const cwebp = haCwebp(), foto = [];
  for (const { id, f } of memo) {
    const dest = join(radice, 'frammenti', cartella(id));
    const con = [f, ...tutti.filter((x) => x.startsWith(`${id}.`) && x !== f && !x.endsWith('.md'))];
    const gia = con.filter((x) => existsSync(join(dest, x)));
    if (gia.length) { errori.push(`ingresso/${f}: c'è già frammenti/${cartella(id)}/${gia[0]}, resta in ingresso/`); continue; }
    mkdirSync(dest, { recursive: true });
    for (const x of con) { renameSync(join(dir, x), join(dest, x)); if (FOTO.test(x)) foto.push(join(dest, x)); }
    spostati.push(id);
  }
  // un allegato arrivato dopo il suo memo (un PUT più lento) va accanto al frammento già spostato
  for (const x of readdirSync(dir).filter((y) => !y.startsWith('.') && !y.endsWith('.md'))) {
    const id = x.split('.')[0], dest = join(radice, 'frammenti', cartella(id));
    if (!ID_F.test(id)) continue;
    if (existsSync(join(dest, `${id}.md`)) && !existsSync(join(dest, x))) {
      renameSync(join(dir, x), join(dest, x)); spostati.includes(id) || spostati.push(id);
      if (FOTO.test(x)) foto.push(join(dest, x));
    } else if (!existsSync(join(dir, `${id}.md`))) avvisi.push(`ingresso/${x}: allegato senza il suo memo, resta in ingresso/`);
  }
  if (foto.length && cwebp) for (const p of foto) copiaWebp(p, avvisi);
  else if (foto.length) avvisi.push(`foto (${foto.length}): cwebp non c'è, la copia ridotta WebP non è fatta; resta l'originale`);
  if (spostati.length) aggiornaHash(radice);
  return { spostati: spostati.filter((id) => !sigillate.includes(id)), sigillate: sigillate.filter((id) => spostati.includes(id)), errori, avvisi };
}

// La tabella degli alias: le righe di mappa.md § Alias, più quelle dei nodi che mappa.md non ha ancora (nati dopo).
export function tabellaAlias(radice, nodi) {
  const righe = [...new Set([...sezione(radice, 'Alias'), ...righeAlias(nodi)])].sort();
  const voci = righe.map((r) => /^- (.+?) → (\S+) \(([^,)]+)(?:, ([^)]+))?\)$/.exec(r)).filter(Boolean)
    .map(([, k, slug, genere, cerchia]) => ({ chiave: k, slug, genere, ...(cerchia ? { cerchia } : {}) }));
  return { righe, voci };
}
function sezione(radice, titolo) {
  try {
    const m = new RegExp(`^## (?:\\d+\\. )?${titolo}[ \\t]*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm')
      .exec(readFileSync(join(radice, 'contesto/mappa.md'), 'utf8'));
    return m ? m[1].split('\n').filter((r) => r.startsWith('- ')) : [];
  } catch { return []; }
}
// Scarti (§4, mappa.md § Scarti): le righe della sezione se c'è, senza il "- "; altrimenti nessuno.
export const scarti = (radice) => sezione(radice, 'Scarti').map((r) => r.slice(2));

// I nomi del testo: ogni sequenza di 1–4 parole dentro una frase (senza link né ore dei turni). Una corrispondenza
// esatta conta sempre; le deboli solo per una sequenza che non comincia né finisce con una parola vuota (e da sola di
// almeno 4 lettere). Ogni slug resta sotto la sua forma migliore; una forma dentro una esatta più lunga cade.
export function nomi(testo, voci, nodi) {
  const pulito = String(testo).replace(LINK, ' ').replace(/^\[\d{2}:\d{2}\]/gm, ' ');
  const trovate = [];
  let pos = 0;
  for (const frase of pulito.split(/[.,;:!?()«»"“”\n\[\]—–]+/)) {
    const parole = frase.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)*/gu) ?? [];
    for (let i = 0; i < parole.length; i++) for (let n = 1; n <= 4 && i + n <= parole.length; n++) {
      const pp = parole.slice(i, i + n), forma = pp.join(' '), basse = pp.map((w) => w.toLowerCase());
      if (basse.every((w) => VUOTE.has(w))) continue;
      const forte = !VUOTE.has(basse[0]) && !VUOTE.has(basse.at(-1)) && (n > 1 || basse[0].length >= 4);
      const c = candidati(forma, voci).filter((x) => !x.debole || forte);
      if (c.length) trovate.push({ forma, inizio: pos + i, fine: pos + i + n, c });
    }
    pos += parole.length + 1;
  }
  const esatte = trovate.filter((t) => t.c.some((x) => !x.debole));
  const dentro = (t) => esatte.some((e) => e !== t && e.inizio <= t.inizio && t.fine <= e.fine && e.fine - e.inizio > t.fine - t.inizio);
  const migliore = new Map(); // slug → {t, debole, lung}
  for (const t of trovate.filter((x) => !dentro(x))) for (const x of t.c) {
    const p = migliore.get(x.slug), lung = t.fine - t.inizio;
    if (!p || (p.debole && !x.debole) || (p.debole === x.debole && lung > p.lung)) migliore.set(x.slug, { t, debole: x.debole, lung });
  }
  const fuori = new Map();
  for (const t of trovate) {
    const c = t.c.filter((x) => migliore.get(x.slug)?.t === t).map((x) => {
      const nodo = nodi.get(x.slug), v = voci.find((y) => y.slug === x.slug);
      return { ...x, nome: nodo?.dati.nome ?? null, genere: nodo?.genere ?? v?.genere, ...(v?.cerchia ? { cerchia: v.cerchia } : {}) };
    });
    if (!c.length) continue;
    const k = chiave(t.forma), prima = fuori.get(k);
    if (prima) prima.candidati.push(...c.filter((x) => !prima.candidati.some((y) => y.slug === x.slug)));
    else fuori.set(k, { nome: t.forma, candidati: c });
  }
  return [...fuori.values()];
}

// I nodi di una lettura (legami: a e tra), con le lapidi risolte.
function nodiDi(lettura, nodi) {
  const vivo = (s) => { for (let i = 0; i < 5 && nodi.get(s)?.dati['fuso-in']; i++) s = nodi.get(s).dati['fuso-in']; return s; };
  return [...new Set((lettura?.dati.legami ?? []).flatMap((l) => [l?.a, ...(Array.isArray(l?.tra) ? l.tra : [])])
    .filter((s) => typeof s === 'string' && nodi.has(s)).map(vivo))];
}
const paroleDi = (lettura) => [lettura?.dati.parole ?? []].flat().filter((p) => typeof p === 'string' && p.trim());

// Il primo giorno (Roma) dei frammenti non importati; ID è "dei primi 3 giorni" se il suo giorno ne dista meno di 3.
function primiTreGiorni(a, f) {
  if (f.dati.canale === 'importato') return false;
  const giorni = [...a.frammenti.values()].filter((g) => g.dati.canale !== 'importato').map((g) => giornoRoma(g.dati.registrato)).sort();
  const inizio = giorni[0] ?? giornoRoma(f.dati.registrato);
  return (Date.parse(giornoRoma(f.dati.registrato)) - Date.parse(inizio)) / GIORNO < 3;
}

// Vicini (§6.2, §7.5): fino a 10 frammenti ✦ con lettura (mai il seme ✧), non delicati, più vecchi di 7 giorni rispetto a `f`, che
// condividono un nodo (`nodi`) o una parola (`chiavi`: le chiavi delle parole; una parola candidata di più parole conta
// se ci sono tutte); prima i più ricchi di cose in comune, a pari merito i più vecchi. Nei primi 3 giorni in più tutti
// gli importati `voce: sua` non delicati, oltre il tetto.
export function viciniDi(a, f, nodi, chiavi) {
  const quando = istante(f.dati.registrato), trovati = [];
  const scheda = (g, l, comune) => {
    const tetto = /^≤?(\d{4}-\d{2}-\d{2})$/.exec(String(l?.dati.vissuto ?? ''))?.[1] ?? null; // §6.2: con ≤ o senza
    return { id: g.id, data: String(g.dati.registrato), ...(g.dati.canale === 'importato' ? { 'data-tetto': tetto ?? String(g.dati.registrato) } : {}),
      canale: g.dati.canale, voce: g.dati.voce ?? 'sua', segno: g.dati.voce === 'seme' ? '✧' : '✦',
      ...(g.dati.forma ? { forma: g.dati.forma } : {}), ...(l?.dati.altrui ? { altrui: true } : {}), testo: g.corpo, comune };
  };
  for (const [id, l] of a.letture) {
    const g = a.frammenti.get(id);
    if (!g || id === f.id || l.dati.delicato) continue;
    if (g.dati.canale === 'importato' ? g.dati.voce !== 'sua' : !parlante(g, l)) continue; // mai il seme ✧ (§6.2, §7.5)
    if (!(quando - istante(g.dati.registrato) > 7 * GIORNO)) continue;
    const parole = paroleDi(l).filter((p) => { const k = chiaviDi(p); return k.size && [...k].every((x) => chiavi.has(x)); });
    const comune = [...new Set([...nodiDi(l, a.nodi).filter((s) => nodi.has(s)), ...parole])];
    if (comune.length) trovati.push({ s: scheda(g, l, comune), quando: istante(g.dati.registrato), id });
  }
  trovati.sort((x, y) => y.s.comune.length - x.s.comune.length || perTempo(x, y));
  const scelti = trovati.slice(0, 10).map((x) => x.s), primi = primiTreGiorni(a, f);
  if (primi) {
    const importati = [...a.frammenti.values()].filter((g) => g.dati.canale === 'importato' && g.dati.voce === 'sua' &&
      !a.letture.get(g.id)?.dati.delicato && !scelti.some((v) => v.id === g.id)).map((g) => ({ g, id: g.id, quando: istante(g.dati.registrato) })).sort(perTempo);
    for (const { g } of importati) scelti.push({ ...scheda(g, a.letture.get(g.id), []), perche: 'primi 3 giorni: tutti gli importati ✦ (modello §7.5)' });
  }
  return { 'primi-3-giorni': primi, vicini: scelti };
}

// `vicini ID`: dal frammento già in frammenti/ e dalla sua lettura (senza lettura: dai candidati del testo, con avviso).
export function vicini(radice, id) {
  const a = carica(radice), f = a.frammenti.get(id);
  if (!f) throw new Error(`${id}: non è in frammenti/`);
  const l = a.letture.get(id);
  if (l) {
    const chiavi = new Set(paroleDi(l).flatMap((p) => [...chiaviDi(p)]));
    return { id, 'nodi-da': 'lettura', ...viciniDi(a, f, new Set(nodiDi(l, a.nodi)), chiavi) };
  }
  const { voci } = tabellaAlias(radice, a.nodi);
  return { id, 'nodi-da': 'testo (senza lettura)', ...viciniDi(a, f, nodiDelTesto(nomi(f.corpo, voci, a.nodi)), chiaviDi(f.corpo)) };
}
const nodiDelTesto = (cand) => new Set(cand.flatMap((n) => n.candidati).filter((x) => x.via !== 'nome').map((x) => x.slug));

// I link: titolo dall'oEmbed (Spotify, YouTube), autore dalla pagina (o, se la pagina non risponde, dall'oEmbed).
const curl = (url) => {
  if (process.env.MEMO_SENZA_RETE) return null;
  try { return execFileSync('curl', ['-sSLf', '-m', '8', '-A', 'Mozilla/5.0', url], { encoding: 'utf8', maxBuffer: 1 << 24, stdio: ['ignore', 'pipe', 'ignore'] }); }
  catch { return null; }
};
const entita = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
export function descriviLink(url, chiedi = curl) {
  let host;
  try { host = new URL(url).hostname.replace(/^www\.|^m\./, ''); } catch { return { url }; }
  const oembed = host === 'open.spotify.com' ? `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`
    : ['youtube.com', 'youtu.be', 'music.youtube.com'].includes(host) ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}` : null;
  if (!oembed) return { url };
  let o = null;
  try { o = JSON.parse(chiedi(oembed) ?? 'null'); } catch { o = null; }
  const titolo = typeof o?.title === 'string' && o.title.trim() ? o.title.trim() : null;
  const pagina = chiedi(url) ?? '', meta = (re) => { const m = re.exec(pagina); return m ? entita(m[1]) : null; };
  const autore = meta(/<meta\s+name="music:musician_description"\s+content="([^"]+)"/i)
    ?? meta(/<link\s+itemprop="name"\s+content="([^"]+)"/i)
    ?? meta(/<meta\s+name="author"\s+content="([^"]+)"/i)
    ?? (typeof o?.author_name === 'string' && o.author_name.trim() ? o.author_name.trim() : null);
  return titolo ? { url, titolo, ...(autore ? { autore } : {}) } : { url };
}

// 3. Il pacchetto.
export function prepara(radice, { solo = null, sigilla = null, chiedi = curl } = {}) {
  const s = sposta(radice, { sigilla }), a = carica(radice), { righe, voci } = tabellaAlias(radice, a.nodi), sc = scarti(radice);
  let recenti = null;
  try {
    const t = readFileSync(join(radice, 'contesto/recenti.md'), 'utf8');
    recenti = { file: 'contesto/recenti.md', 'fino-a': /^fino-a: (\S+)/m.exec(t)?.[1] ?? null, testo: t };
  } catch { s.avvisi.push('contesto/recenti.md assente: lancia node scripts/contesto.mjs'); }
  const coda = [...a.frammenti.values()].filter((f) => f.dati.canale !== 'importato' && !a.letture.has(f.id))
    .map((f) => ({ f, id: f.id, quando: istante(f.dati.registrato) })).sort(perTempo).map((x) => x.f);
  if (solo && !coda.some((f) => f.id === solo)) s.errori.push(`--solo ${solo}: non è un frammento senza lettura in frammenti/`);
  const pacchetti = [], dir = join(radice, 'ingresso/.pacchetti');
  for (const f of coda.filter((x) => !solo || x.id === solo || x.id === sigilla)) {
    const base = `frammenti/${cartella(f.id)}`;
    const allegati = readdirSync(join(radice, base)).filter((x) => x.startsWith(`${f.id}.`) && x !== `${f.id}.md`);
    for (const x of [f.dati.allegati ?? []].flat()) if (!allegati.includes(x)) s.avvisi.push(`${base}/${f.id}.md: allegato ${x} dichiarato ma assente`);
    const cand = nomi(f.corpo, voci, a.nodi), bozza = join(radice, 'ingresso', `${f.id}.risposte.md`);
    const p = {
      preparato: iso(),
      frammento: { id: f.id, percorso: `${base}/${f.id}.md`, ...f.dati, testo: f.corpo,
        allegati: allegati.map((x) => ({ file: x, percorso: `${base}/${x}` })) },
      ...(f.dati.canale === 'chat' && existsSync(bozza) ? { bozza: { file: `ingresso/${f.id}.risposte.md`, testo: readFileSync(bozza, 'utf8') } } : {}),
      recenti,
      alias: righe,
      candidati: cand,
      vicini: viciniDi(a, f, nodiDelTesto(cand), chiaviDi(f.corpo)).vicini,
      scarti: sc,
      link: linkDelTesto(f.corpo).map((u) => descriviLink(u, chiedi)),
    };
    if (f.dati.canale === 'chat' && !p.bozza) s.avvisi.push(`${f.id}: chat senza bozza ingresso/${f.id}.risposte.md`);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${f.id}.json`), JSON.stringify(p, null, 2) + '\n');
    pacchetti.push(f.id);
  }
  return { ...s, pacchetti };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [azione, ...argv] = process.argv.slice(2), o = { radice: process.cwd() };
  const uso = 'uso: node scripts/smista.mjs prepara [--solo ID] [--sigilla ID] | vicini ID  [--radice DIR]';
  for (let i = 0; i < argv.length; i++) {
    if (['--solo', '--sigilla'].includes(argv[i]) && ID_F.test(argv[i + 1] ?? '')) o[argv[i].slice(2)] = argv[++i];
    else if (argv[i] === '--radice' && argv[i + 1]) o.radice = argv[++i];
    else if (azione === 'vicini' && !o.id && ID_F.test(argv[i])) o.id = argv[i];
    else { console.log(`ERRORE argomento sconosciuto: ${argv[i]}\n${uso}`); process.exit(1); }
  }
  try {
    if (azione === 'vicini' && o.id) { console.log(JSON.stringify(vicini(o.radice, o.id), null, 2)); process.exit(0); }
    if (azione !== 'prepara') { console.log(uso); process.exit(1); }
    const e = prepara(o.radice, o);
    for (const m of e.errori) console.log(`ERRORE ${m}`);
    for (const m of e.avvisi) console.log(`AVVISO ${m}`);
    console.log(`spostati: ${e.spostati.length}; chat sigillate: ${e.sigillate.join(', ') || 'nessuna'}; pacchetti: ${e.pacchetti.map((id) => `ingresso/.pacchetti/${id}.json`).join(', ') || 'nessuno'}`);
    process.exit(e.errori.length ? 1 : 0);
  } catch (err) { console.log(`ERRORE smista: ${err.message}`); process.exit(1); }
}
