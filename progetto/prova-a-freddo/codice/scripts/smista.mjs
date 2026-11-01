// smista.mjs prepara [--solo ID] [--radice DIR]: il grezzo in frammenti/ e un pacchetto per frammento (piano blocco 5,
// modello §6.2, §7.2). Sposta ingresso/<id>.md (e gli allegati <id>*.webp|m4a…) in frammenti/AAAA/MM/, in ordine di tempo,
// senza riscriverli; aggiorna frammenti/.hash; scrive ingresso/.pacchetti/<id>.json per ogni frammento senza lettura.
// Provvisorio, non ancora fatto: riduzione delle foto, memo del Progetto (`memo: chat`), sigillo delle chat ferme da
// prima delle 04:00, titoli oEmbed; "nei primi 3 giorni tutti gli importati" tra i vicini. Le chat aperte restano in ingresso/.
// `applica` (piano blocco 5) è scripts/applica.mjs, come vuole prompt/formato-piano.md.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { frontmatter } from './schema.mjs';
import { aggiornaHash } from './verifica.mjs';
import { candidati, chiave } from './slug.mjs';
import { linkDelTesto } from './applica.mjs';
import { carica, indice, tabellaAlias, cartella, ID_F, ID_R } from './archivio.mjs';

const VUOTE = new Set(('alla allo agli alle anche ancora come con cosa così dalla dalle degli delle dello dopo dove forse ' +
  'loro molto nella nelle negli nostro perché però poco poi quando quella quelle quello questa queste questo sono stato ' +
  'sempre solo sulla tanto tutto tutti vero visto fatto credo detto diceva').split(' '));
const giorni = (id) => Date.UTC(+id.slice(0, 4), +id.slice(4, 6) - 1, +id.slice(6, 8)) / 864e5;
const senzaLink = (t) => String(t).replace(/https?:\/\/\S+/g, ' ');

// 1. Lo spostamento: niente chat aperte, niente bozze (<id>.risposte.md), niente file nascosti.
export function sposta(radice) {
  const dir = join(radice, 'ingresso'), spostati = [], errori = [];
  if (!existsSync(dir)) return { spostati, errori };
  const tutti = readdirSync(dir);
  for (const f of tutti.filter((x) => /^\d{8}-\d{4}-[a-z0-9]{3,4}\.md$/.test(x)).sort()) {
    const id = f.slice(0, -3);
    let canale;
    try { canale = frontmatter(readFileSync(join(dir, f), 'utf8')).dati.canale; } catch (e) { errori.push(`${f}: ${e.message}`); continue; }
    if (canale === 'chat') continue;
    const dest = join(radice, 'frammenti', cartella(id));
    const con = tutti.filter((x) => x === f || (x.startsWith(id) && !x.endsWith('.md')));
    if (con.some((x) => existsSync(join(dest, x)))) { errori.push(`${f}: c'è già in frammenti/${cartella(id)}/`); continue; }
    mkdirSync(dest, { recursive: true });
    for (const x of con) renameSync(join(dir, x), join(dest, x));
    spostati.push(id);
  }
  if (spostati.length) aggiornaHash(radice);
  return { spostati, errori };
}

// I nomi del testo: sequenze con la maiuscola (tutti i candidati), e parole o coppie minuscole (senza i soli nomi di battesimo).
function nomi(testo, idx) {
  const t = senzaLink(testo), fuori = {};
  for (const m of t.match(/\p{Lu}[\p{L}'’-]*(?:\s+\p{Lu}[\p{L}'’-]*)*/gu) ?? []) {
    const c = candidati(m, idx);
    if (c.length) fuori[m] = c;
  }
  const parole = t.toLowerCase().match(/\p{L}[\p{L}'’]*/gu) ?? [];
  const forme = [...parole.filter((p) => p.length >= 4 && !VUOTE.has(p)), ...parole.slice(1).map((p, i) => [parole[i], p]).filter((c) => c.every((w) => w.length >= 3 && !VUOTE.has(w))).map((c) => c.join(' '))];
  for (const f of new Set(forme)) {
    if (Object.keys(fuori).some((k) => chiave(k) === chiave(f))) continue;
    const gia = new Set(Object.values(fuori).flat().map((x) => x.slug));
    const c = candidati(f, idx).filter((x) => x.via !== 'nome' && !gia.has(x.slug));
    if (c.length) fuori[f] = c;
  }
  return fuori;
}

// Vicini (§6.2, in modo semplice): frammenti con lettura, più vecchi di 7 giorni, che condividono un nodo (i legami
// della loro lettura contro i candidati certi di questo testo) o una parola candidata (le `parole` contro le parole del testo).
function vicini(id, testo, cand, a) {
  const certi = new Set(Object.values(cand).flat().filter((c) => !c.debole || c.via === 'cognome').map((c) => c.slug));
  const mie = new Set(senzaLink(testo).toLowerCase().match(/\p{L}+/gu) ?? []);
  const fuori = [];
  for (const [fid, l] of a.letture) {
    const f = a.frammenti.get(fid);
    if (!f || fid === id || giorni(id) - giorni(fid) <= 7) continue;
    const capi = (l.dati.legami ?? []).flatMap((x) => [x.a, ...(x.tra ?? [])]).filter((s) => typeof s === 'string' && a.nodi.has(s));
    const comuni = [...new Set([...capi.filter((s) => certi.has(s)), ...(l.dati.parole ?? []).filter((p) => p.split(' ').every((w) => mie.has(w)))])];
    if (comuni.length) fuori.push({ id: fid, voce: f.dati.voce ?? 'sua', testo: f.corpo.trim(), comuni });
  }
  return fuori.sort((x, y) => y.comuni.length - x.comuni.length || y.id.localeCompare(x.id)).slice(0, 10);
}

// Scarti (§4): i rifiuti, con chiave (lo slug o il rif della voce rifiutata), contesto (i parla-di), data, parole.
export function scarti(a) {
  const fuori = [];
  for (const [id, l] of a.letture) for (const x of l.dati.legami ?? []) {
    if (x.p !== 'ritorna-su' || x.come !== 'rifiuta') continue;
    const [rid, n] = String(x.a).split('#'), num = Number(n ?? x.n);
    const voce = ID_R.test(rid) && num ? a.restituzioni.get(rid)?.dati.voci?.find((v) => v.n === num) : null;
    fuori.push({ chiave: voce ? (voce.rif.startsWith('~') ? chiave(voce.rif.slice(1)) : voce.rif) : x.a,
      contesto: (l.dati.legami ?? []).filter((y) => y.p === 'parla-di').map((y) => y.a), data: id.slice(0, 8), parole: x.perche });
  }
  return fuori;
}

export function prepara(radice, solo) {
  const s = sposta(radice), a = carica(radice), idx = indice(a.nodi), alias = tabellaAlias(a.nodi), sc = scarti(a);
  const nostri = [...a.frammenti.values()].filter((f) => f.dati.canale !== 'importato');
  const pacchetti = [];
  for (const f of nostri.filter((f) => !a.letture.has(f.id) && (!solo || f.id === solo))) {
    const cand = nomi(f.corpo, idx);
    const p = {
      frammento: { id: f.id, percorso: `frammenti/${cartella(f.id)}/${f.id}.md`, ...f.dati, testo: f.corpo },
      link: linkDelTesto(f.corpo),
      recenti: nostri.filter((x) => x.id < f.id).slice(-30).map((x) => ({ id: x.id, testo: x.corpo.trim(), risposta: a.letture.get(x.id)?.dati.risposta })),
      alias, candidati: cand, vicini: vicini(f.id, f.corpo, cand, a), scarti: sc,
    };
    const dir = join(radice, 'ingresso/.pacchetti');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${f.id}.json`), JSON.stringify(p, null, 2) + '\n');
    pacchetti.push(f.id);
  }
  return { ...s, pacchetti };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [azione, ...argv] = process.argv.slice(2), o = { radice: fileURLToPath(new URL('..', import.meta.url)) };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--solo' && ID_F.test(argv[i + 1] ?? '')) o.solo = argv[++i];
    else if (argv[i] === '--radice') o.radice = argv[++i];
    else { console.log(`ERRORE argomento sconosciuto: ${argv[i]}`); process.exit(1); }
  }
  if (azione !== 'prepara') { console.log('uso: node scripts/smista.mjs prepara [--solo ID] (applica: scripts/applica.mjs)'); process.exit(1); }
  const e = prepara(o.radice, o.solo);
  for (const m of e.errori) console.log(`ERRORE ${m}`);
  console.log(`spostati: ${e.spostati.length}; pacchetti: ${e.pacchetti.map((id) => `ingresso/.pacchetti/${id}.json`).join(', ') || 'nessuno'}`);
  process.exit(e.errori.length ? 1 : 0);
}
