// smista.mjs prepara [--solo ID] [--radice DIR] (piano blocco 5; modello §2.2, §2.3, §3.1–§3.2, §6.2, §7.2, §7.5, §8.2).
// 1. Sposta in frammenti/AAAA/MM/ ogni ingresso/<id>.md con i suoi allegati (<id>.jpg, .webp, .m4a…), in ordine di
//    tempo, con un rename (i byte non si riscrivono); aggiunge gli hash nuovi a frammenti/.hash.
//    Restano in ingresso/: le chat (canale: chat, con la bozza <id>.risposte.md), i nascosti (.in-corso, .pacchetti).
// 2. Per ogni frammento senza lettura (la coda, §8.2) scrive ingresso/.pacchetti/<id>.json: il frammento, i suoi allegati,
//    contesto/recenti.md, gli alias (mappa.md § Alias), i candidati per ogni nome del testo, fino a 10 vicini (§6.2; nei
//    primi 3 giorni anche tutti gli importati ✦, §7.5), gli scarti, i link.
// Non ancora (lo dice con ERRORE o AVVISO, non indovina): la separazione dei memo del Progetto (`memo: chat`, §7.3: il
// memo resta in ingresso/), il sigillo delle chat ferme (§3.2), la copia ridotta delle foto (I14: servirebbe una
// dipendenza nuova), i titoli oEmbed dei link (I13).
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { frontmatter, aggiornaHash } from './verifica.mjs';
import { carica, righeAlias } from './contesto.mjs';
import { candidati, chiave } from './slug.mjs';
import { iso, oggi } from './ora.mjs';

const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/, ID_R = /^r-\d{8}-\d{4}-[a-z0-9-]+$/;
const cartella = (id) => `${id.slice(0, 4)}/${id.slice(4, 6)}`;
const LINK = /https?:\/\/[^\s<>()«»"]+/g;
// Parole che da sole non sono un nome (per i candidati deboli e per le parole candidate).
const VUOTE = new Set(('il lo la i gli le un una uno di a da in con su per tra fra e o ma se che chi non ne ci si mi ti vi ' +
  'del della dello dei degli delle al alla allo ai agli alle dal dalla dai dagli dalle nel nella nello nei negli nelle ' +
  'sul sulla sui sugli sulle col anche ancora come cosa così dopo dove forse loro molto poco poi quando quella quelle ' +
  'quello quelli questa queste questo questi sono sei era erano stato stata essere avere ho hai ha hanno sempre solo ' +
  'tanto tutto tutti tutta vero visto fatto credo detto diceva dice fare oggi ieri domani mio mia miei mie tuo tua suo ' +
  'sua nostro nn cmq tipo boh perché però più meno bene male the and of to').split(' '));
const sigla = (w) => (w.length >= 4 ? w.replace(/[aeiou]$/, '') : w); // "padri" e "padre" → "padr"
const istante = (r) => Date.parse(/T/.test(String(r)) ? String(r) : `${r}T00:00:00+01:00`);

// 1. Lo spostamento.
export function sposta(radice) {
  const dir = join(radice, 'ingresso'), spostati = [], errori = [], avvisi = [];
  if (!existsSync(dir)) return { spostati, errori, avvisi };
  const tutti = readdirSync(dir).filter((x) => !x.startsWith('.'));
  const memo = [];
  for (const f of tutti.filter((x) => /\.md$/.test(x) && !x.endsWith('.risposte.md'))) {
    const id = f.slice(0, -3);
    if (!ID_F.test(id)) { avvisi.push(`ingresso/${f}: nome che non è un id di frammento, resta dov'è`); continue; }
    let testo, dati, corpo;
    try { testo = readFileSync(join(dir, f), 'utf8'); ({ dati, corpo } = frontmatter(testo)); }
    catch (e) {
      if (/^\s*memo:\s*chat\b/.test(testo ?? '')) { dati = {}; corpo = testo; }
      else { errori.push(`ingresso/${f}: ${e.message}, resta in ingresso/`); continue; }
    }
    if (/^\s*memo:\s*chat\b/.test(corpo)) {
      errori.push(`ingresso/${f}: memo del Progetto (memo: chat): la separazione in frammento di chat e restituzione non è ancora fatta (modello §7.3), resta in ingresso/`);
      continue;
    }
    if (dati.canale === 'chat') {
      const ferma = String(dati.registrato ?? '').slice(0, 10) < oggi() && iso().slice(11, 13) >= '04';
      if (ferma) avvisi.push(`ingresso/${f}: chat ferma da prima delle 04:00 di oggi; il sigillo non è ancora fatto (modello §3.2, §8.2), resta in ingresso/`);
      continue;
    }
    memo.push({ id, f, quando: istante(dati.registrato) });
  }
  memo.sort((a, b) => (a.quando - b.quando) || (a.id < b.id ? -1 : 1));
  for (const { id, f } of memo) {
    const dest = join(radice, 'frammenti', cartella(id));
    const con = [f, ...tutti.filter((x) => x.startsWith(`${id}.`) && x !== f && !x.endsWith('.md'))];
    const gia = con.filter((x) => existsSync(join(dest, x)));
    if (gia.length) { errori.push(`ingresso/${f}: c'è già frammenti/${cartella(id)}/${gia[0]}, resta in ingresso/`); continue; }
    mkdirSync(dest, { recursive: true });
    for (const x of con) renameSync(join(dir, x), join(dest, x));
    spostati.push(id);
  }
  let tardivi = 0; // un allegato arrivato dopo il suo memo (un PUT più lento) va accanto al frammento già spostato
  for (const x of readdirSync(dir).filter((y) => !y.startsWith('.') && !y.endsWith('.md'))) {
    const id = x.split('.')[0], dest = join(radice, 'frammenti', cartella(id));
    if (!ID_F.test(id)) continue;
    if (existsSync(join(dest, `${id}.md`)) && !existsSync(join(dest, x))) { renameSync(join(dir, x), join(dest, x)); tardivi++; }
    else if (!existsSync(join(dir, `${id}.md`))) avvisi.push(`ingresso/${x}: allegato senza il suo memo, resta in ingresso/`);
  }
  if (spostati.length || tardivi) aggiornaHash(radice);
  return { spostati, errori, avvisi };
}

// La tabella degli alias: le righe di mappa.md § Alias, più quelle dei nodi che mappa.md non ha ancora (nati dopo).
export function tabellaAlias(radice, nodi) {
  let righe = [];
  try {
    const m = /^## (?:\d+\. )?Alias[ \t]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(readFileSync(join(radice, 'contesto/mappa.md'), 'utf8'));
    righe = m ? m[1].split('\n').filter((r) => r.startsWith('- ')) : [];
  } catch { /* mappa.md assente: bastano i nodi */ }
  righe = [...new Set([...righe, ...righeAlias(nodi)])].sort();
  const voci = righe.map((r) => /^- (.+?) → (\S+) \(([^,)]+)(?:, ([^)]+))?\)$/.exec(r)).filter(Boolean)
    .map(([, k, slug, genere, cerchia]) => ({ chiave: k, slug, genere, ...(cerchia ? { cerchia } : {}) }));
  return { righe, voci };
}

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

// I capi-nodo di una lettura (legami a e tra), con le lapidi risolte.
function nodiDi(lettura, nodi) {
  const vivo = (s) => { for (let i = 0; i < 5 && nodi.get(s)?.dati['fuso-in']; i++) s = nodi.get(s).dati['fuso-in']; return s; };
  return [...new Set((lettura?.dati.legami ?? []).flatMap((l) => [l?.a, ...(l?.tra ?? [])])
    .filter((s) => typeof s === 'string' && nodi.has(s)).map(vivo))];
}

// Vicini (§6.2): frammenti ✦ o ✧ con lettura, più vecchi di 7 giorni, non delicati, che condividono con il testo un nodo
// (i candidati, tranne la sola regola "nome": B06) o una parola candidata (le `parole` delle letture). Più comuni prima,
// a pari merito il più vecchio (il ponte inatteso); al più 10. Nei primi 3 giorni (§7.5) in più tutti gli importati ✦.
function vicini(f, cand, a, primiGiorni) {
  const miei = new Set(cand.flatMap((n) => n.candidati).filter((x) => x.via !== 'nome').map((x) => x.slug));
  const sigle = new Set((f.corpo.replace(LINK, ' ').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map(sigla));
  const quando = istante(f.dati.registrato), scheda = (g, l, comuni) => ({
    id: g.id, registrato: g.dati.registrato, canale: g.dati.canale, voce: g.dati.voce ?? 'sua', segno: g.dati.voce === 'seme' ? '✧' : '✦',
    ...(g.dati.forma ? { forma: g.dati.forma } : {}), testo: g.corpo.trim(), comuni,
    ...(l.dati.risposta ? { risposta: l.dati.risposta } : {}) });
  const fuori = [];
  for (const [id, l] of a.letture) {
    const g = a.frammenti.get(id);
    if (!g || id === f.id || l.dati.delicato || !(quando - istante(g.dati.registrato) > 7 * 864e5)) continue;
    if (g.dati.canale === 'importato' && !['sua', 'seme'].includes(g.dati.voce)) continue;
    const parole = [l.dati.parole ?? []].flat().filter((p) => typeof p === 'string' && p.toLowerCase().split(/\s+/).every((w) => sigle.has(sigla(w))));
    const comuni = [...new Set([...nodiDi(l, a.nodi).filter((s) => miei.has(s)), ...parole])];
    if (comuni.length) fuori.push(scheda(g, l, comuni));
  }
  fuori.sort((x, y) => y.comuni.length - x.comuni.length || istante(x.registrato) - istante(y.registrato) || (x.id < y.id ? -1 : 1));
  const scelti = fuori.slice(0, 10);
  if (primiGiorni) for (const [id, g] of a.frammenti) {
    const l = a.letture.get(id);
    if (g.dati.canale === 'importato' && g.dati.voce === 'sua' && !l?.dati.delicato && !scelti.some((v) => v.id === id))
      scelti.push({ ...scheda(g, l ?? { dati: {} }, []), perche: 'primi 3 giorni: tutti gli importati ✦ (modello §7.5)' });
  }
  return scelti;
}

// Scarti (§4, mappa.md §9): la sezione di mappa.md se c'è già (blocco 7); se no, dai `ritorna-su` `come: rifiuta`.
// chiave = lo slug, o chiave() di ~Nome; contesto = i parla-di del frammento a cui la restituzione rispondeva;
// portata = "legame" per una voce rifiutata (r-…#n), "entità" per un rifiuto rivolto al nodo stesso.
export function scarti(radice, a) {
  try {
    const m = /^## (?:\d+\. )?Scarti[ \t]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(readFileSync(join(radice, 'contesto/mappa.md'), 'utf8'));
    if (m) return m[1].split('\n').filter((r) => r.startsWith('- ')).map((r) => r.slice(2));
  } catch { /* nessuna mappa */ }
  const fuori = [], temi = (l) => (l?.dati.legami ?? []).filter((y) => y?.p === 'parla-di' && typeof y.a === 'string').map((y) => y.a);
  for (const [id, l] of a.letture) for (const x of l.dati.legami ?? []) {
    if (x?.p !== 'ritorna-su' || x.come !== 'rifiuta' || typeof x.a !== 'string') continue;
    const [rid, n] = x.a.split('#'), num = Number(n ?? x.n), r = ID_R.test(rid) ? a.restituzioni.get(rid) : null;
    const voce = r && num ? r.dati.voci?.find((v) => v.n === num) : null, rif = voce?.rif ?? x.a;
    fuori.push({ chiave: String(rif).startsWith('~') ? chiave(rif.slice(1)) : rif,
      contesto: temi(a.letture.get(r?.dati.per)).length ? temi(a.letture.get(r?.dati.per)) : temi(l),
      portata: voce ? 'legame' : 'entità', data: `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`, parole: x.perche ?? null });
  }
  return fuori;
}

export function prepara(radice, solo) {
  const s = sposta(radice), a = carica(radice), { righe, voci } = tabellaAlias(radice, a.nodi), sc = scarti(radice, a);
  let recenti = null;
  try {
    const t = readFileSync(join(radice, 'contesto/recenti.md'), 'utf8');
    recenti = { file: 'contesto/recenti.md', 'fino-a': /^fino-a: (\S+)/m.exec(t)?.[1] ?? null, testo: t };
  } catch { s.avvisi.push('contesto/recenti.md assente: lancia node scripts/contesto.mjs (prompt/smista.md, "Se qualcosa manca")'); }
  const nostri = [...a.frammenti.values()].filter((f) => f.dati.canale !== 'importato');
  const inizio = nostri.map((f) => String(f.dati.registrato).slice(0, 10)).sort()[0];
  const coda = nostri.filter((f) => !a.letture.has(f.id)).sort((x, y) => istante(x.dati.registrato) - istante(y.dati.registrato) || (x.id < y.id ? -1 : 1));
  if (solo && !coda.some((f) => f.id === solo)) s.errori.push(`--solo ${solo}: non è un frammento senza lettura`);
  const pacchetti = [], dir = join(radice, 'ingresso/.pacchetti');
  for (const f of coda.filter((x) => !solo || x.id === solo)) {
    const giorno = String(f.dati.registrato).slice(0, 10), base = `frammenti/${cartella(f.id)}`;
    const allegati = existsSync(join(radice, base)) ? readdirSync(join(radice, base)).filter((x) => x.startsWith(`${f.id}.`) && x !== `${f.id}.md`) : [];
    for (const x of [f.dati.allegati ?? []].flat()) if (!allegati.includes(x)) s.avvisi.push(`${base}/${f.id}.md: allegato ${x} dichiarato ma assente`);
    const cand = nomi(f.corpo, voci, a.nodi);
    const p = {
      preparato: iso(),
      frammento: { id: f.id, percorso: `${base}/${f.id}.md`, ...f.dati, testo: f.corpo,
        allegati: allegati.map((x) => ({ file: x, percorso: `${base}/${x}`, ridotta: null })) },
      // gli altri memo della coda fino a questo, dai 3 giorni di calendario prima (le raffiche: "ah e…"; recenti.md non li ha ancora letti)
      coda: coda.filter((x) => x.id !== f.id && istante(x.dati.registrato) <= istante(f.dati.registrato) &&
        istante(f.dati.registrato) - istante(x.dati.registrato) <= 4 * 864e5).map((x) => ({ id: x.id, registrato: x.dati.registrato, testo: x.corpo })),
      recenti,
      alias: righe,
      candidati: cand,
      vicini: vicini(f, cand, a, inizio && (Date.parse(giorno) - Date.parse(inizio)) / 864e5 < 3),
      scarti: sc,
      link: f.corpo.match(LINK) ?? [],
      'non-ancora': ['copia ridotta delle foto (I14)', 'titoli oEmbed dei link (I13)'],
    };
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${f.id}.json`), JSON.stringify(p, null, 2) + '\n');
    pacchetti.push(f.id);
  }
  if (pacchetti.some((id) => readdirSync(join(radice, 'frammenti', cartella(id))).some((x) => /\.(jpe?g|png|heic|webp)$/i.test(x) && x.startsWith(id))))
    s.avvisi.push('foto: la copia ridotta (lato lungo 2000 px, WebP 85) non è fatta, servirebbe una dipendenza nuova; c\'è solo l\'originale');
  return { ...s, pacchetti };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [azione, ...argv] = process.argv.slice(2), o = { radice: process.cwd() };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--solo' && ID_F.test(argv[i + 1] ?? '')) o.solo = argv[++i];
    else if (argv[i] === '--radice' && argv[i + 1]) o.radice = argv[++i];
    else { console.log(`ERRORE argomento sconosciuto: ${argv[i]}`); process.exit(1); }
  }
  if (azione !== 'prepara') { console.log('uso: node scripts/smista.mjs prepara [--solo ID] [--radice DIR]'); process.exit(1); }
  try {
    const e = prepara(o.radice, o.solo);
    for (const m of e.errori) console.log(`ERRORE ${m}`);
    for (const m of e.avvisi) console.log(`AVVISO ${m}`);
    console.log(`spostati: ${e.spostati.length}; pacchetti: ${e.pacchetti.map((id) => `ingresso/.pacchetti/${id}.json`).join(', ') || 'nessuno'}`);
    process.exit(e.errori.length ? 1 : 0);
  } catch (err) { console.log(`ERRORE smista: ${err.message}`); process.exit(1); }
}
