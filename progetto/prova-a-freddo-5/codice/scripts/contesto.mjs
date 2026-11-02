// contesto.mjs (modello §6.1, §6.2; piano blocchi 2 e 5): contesto/recenti.md, contesto/parole.md (con in fondo la
// sezione `## Seme ✧`), la copia dell'ultimo ritratto in contesto/ritratto.md (se c'è) e di contesto/mappa.md le
// sezioni 1–5 (Stato, Nodi, Alias, Parole candidate, Conti), 8 (Correzioni) e 9 (Scarti), ciascuno con la testata
// aggiornato · fino-a · token-stimati (parole.md anche `tagliato:` se la finestra mobile taglia).
// node scripts/contesto.mjs [--radice DIR]
// Le sezioni 6, 7 e 10–17 di mappa.md arrivano al blocco 7. Una sezione senza righe resta vuota (solo il titolo).
// Nessun conto (Stato, Parole candidate, Conti) contiene l'importato né le restituzioni `eredita` (§6.2, §14 ordine).
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { frontmatter, GENERI } from './verifica.mjs';
import { chiave } from './slug.mjs';
import { iso, oggi } from './ora.mjs';

const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/;
const SOGLIA = { lettera: 2, sogno: 50, ritratto: 10, trimestre: 20, telefono: 30, chat: 5, restituzioni: 10, tetto: 80000 };
const giorno = (d) => String(d ?? '').slice(0, 10);
const giornoDaId = (id) => `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`;

function elenca(radice, cartella) {
  const fuori = [], giu = (d) => {
    for (const e of existsSync(d) ? readdirSync(d, { withFileTypes: true }) : []) {
      if (e.name.startsWith('.')) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) giu(p); else if (e.name.endsWith('.md')) fuori.push(p);
    }
  };
  giu(join(radice, cartella));
  return fuori.sort();
}

// Tutto l'archivio in memoria: Map id → {id, dati, corpo}, ordinate per id (cioè per tempo); i nodi con il genere.
export function carica(radice) {
  const mappa = (c, extra = {}) => new Map(elenca(radice, c).map((p) => {
    const id = basename(p, '.md');
    return [id, { id, ...extra, ...frontmatter(readFileSync(p, 'utf8')) }];
  }));
  const nodi = new Map();
  for (const g of GENERI) for (const [id, n] of mappa(g, { genere: g })) nodi.set(id, n);
  return { frammenti: mappa('frammenti'), letture: mappa('letture'), restituzioni: mappa('restituzioni'), nodi };
}

// Parlante (§3.3): non importato, intento non solo `niente`, e tolti i link (e le ore dei turni) almeno 3 parole sue.
const intenti = (f, lettura) => [lettura?.dati.intento ?? f.dati.intento ?? []].flat();
const treParole = (t) => (t.replace(/https?:\/\/\S+/g, ' ').replace(/^\[\d{2}:\d{2}\]/gm, ' ')
  .match(/[\p{L}\p{N}]+/gu) ?? []).length >= 3;
const conContenuto = (f, lettura) => {
  const intento = intenti(f, lettura);
  return !(intento.length && intento.every((i) => i === 'niente')) && treParole(f.corpo);
};
export function parlante(f, lettura) {
  return f.dati.canale !== 'importato' && conContenuto(f, lettura);
}

const mediana = (v) => {
  if (!v.length) return null;
  const s = [...v].sort((a, b) => a - b), m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const giorniTra = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
const lunedi = (d) => {
  const t = new Date(`${d}T00:00:00Z`);
  t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7));
  return t.toISOString().slice(0, 10);
};
const mesePrima = (m, n) => {
  const t = new Date(`${m}-01T00:00:00Z`);
  t.setUTCMonth(t.getUTCMonth() - n);
  return t.toISOString().slice(0, 7);
};

// L'ultimo consolida (§6.2): l'ultimo commit `consolida:`; senza, la data dell'importazione (il commit `importa:` o,
// prima del commit, l'ultimo giorno importato).
const git = (radice, grep) => {
  try {
    return execFileSync('git', ['log', '-1', `--grep=${grep}`, '--format=%cI'], { cwd: radice, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch { return ''; }
};
function ultimoConsolida(a) {
  const c = git(a.radice, '^consolida:');
  if (c) return c;
  const i = git(a.radice, '^importa:') || [...a.frammenti.values()].filter((f) => f.dati.canale === 'importato')
    .map((f) => giorno(f.dati.registrato)).sort().at(-1);
  return i ? `nessuno ancora; l'importazione: ${i}` : 'nessuno ancora';
}

// 1. Stato: solo i frammenti parlanti non importati, solo le restituzioni non `eredita`.
function stato(a, oggiD) {
  const parlanti = [...a.frammenti.values()].filter((f) => parlante(f, a.letture.get(f.id)));
  const giorni = [...new Set(parlanti.map((f) => giorno(f.dati.registrato)))].sort();
  const lun = lunedi(oggiD), mese = oggiD.slice(0, 7);
  const nelMese = (m) => parlanti.filter((f) => giorno(f.dati.registrato).startsWith(m)).length;
  const restituzioni = [...a.restituzioni.values()].filter((r) => r.dati.forma !== 'eredita');
  const date = (forma) => restituzioni.filter((r) => r.dati.forma === forma).map((r) => String(r.dati.registrato)).sort();
  const lettere = date('lettera'), ritratti = date('ritratto');
  const ultimaLettera = lettere.at(-1);
  const dopoLettera = parlanti.filter((f) => !ultimaLettera || String(f.dati.registrato) > ultimaLettera).length;
  let pronte = 0;
  try { pronte = readFileSync(join(a.radice, 'riserva/pronte.md'), 'utf8').split('\n').filter((r) => /^- \S/.test(r)).length; } catch { /* nessuna */ }
  const lettera = dopoLettera >= SOGLIA.lettera || (dopoLettera >= 1 && pronte >= 1);
  const scarti = giorni.slice(1).map((g, i) => giorniTra(giorni[i], g));
  const med = mediana(scarti), ultimo = giorni.at(-1);
  const trimestre = [0, 1, 2].reduce((s, n) => s + nelMese(mesePrima(mese, n)), 0);
  return [
    `- inizio: ${giorni[0] ?? 'nessun frammento parlante ancora'}`,
    `- giorni attivi: ${giorni.length}`,
    `- frammenti parlanti: ${parlanti.length}; questa settimana (da lunedì ${lun}): ${parlanti.filter((f) => giorno(f.dati.registrato) >= lun).length}`,
    `- ultimo giorno attivo: ${ultimo ?? 'nessuno'}${ultimo ? `; silenzio: ${giorniTra(ultimo, oggiD)} giorni` : ''}; intervallo mediano: ${med === null ? 'non ancora' : `${med} giorni`}`,
    `- lettera: ${lettera ? 'sì' : 'no'} (${dopoLettera} parlanti ${ultimaLettera ? `dall'ultima lettera, ${giorno(ultimaLettera)}` : 'senza lettere ancora'}; proposte pronte: ${pronte}; soglia ≥ ${SOGLIA.lettera}, oppure ≥ 1 con una proposta pronta)`,
    `- sogno: ${parlanti.length >= SOGLIA.sogno ? 'acceso' : 'spento'} (${parlanti.length} parlanti; si accende a ${SOGLIA.sogno})`,
    `- ritratto: ${nelMese(mese)} parlanti nel mese ${mese}, ${nelMese(mesePrima(mese, 1))} nel mese ${mesePrima(mese, 1)}, ${trimestre} negli ultimi tre mesi (soglia ≥ ${SOGLIA.ritratto} nel mese, ≥ ${SOGLIA.trimestre} nel trimestre); già scritti: ${ritratti.length ? ritratti.map(giorno).join(', ') : 'nessuno'}`,
    `- ultimo consolida: ${ultimoConsolida(a)}`,
    `- fuori da questi conti: i frammenti importati, i non parlanti, le restituzioni eredita (§6.2)`,
  ];
}

// I riferimenti di un file verso i nodi, con la voce: [{slug, voce, n?}] (legami a/tra; voci rif con il loro numero).
function versoNodi(d, nodi) {
  const fuori = [], add = (s, voce, n) => { if (typeof s === 'string' && nodi.has(s)) fuori.push({ slug: s, voce, n }); };
  for (const l of Array.isArray(d.legami) ? d.legami : []) for (const s of [l?.a, ...(l?.tra ?? [])]) add(s, l?.voce);
  for (const v of Array.isArray(d.voci) ? d.voci : []) add(v?.rif, v?.voce, v?.n);
  return fuori;
}

const SEGNO = { sua: '✦', seme: '✧', proposta: '◌', mondo: '○', accolta: '●' };
const breve = (t, n = 60) => { const s = String(t).replace(/\s+/g, ' ').trim(); return s.length > n ? `${s.slice(0, n - 1)}…` : s; };

// 2. Nodi: slug · genere · nome · ✦n ◌n ●n (✧ e ○ se ci sono) · prima–ultima · vicenda. La voce è quella del legame.
function righeNodi(a) {
  // ● (§5): una voce proposta che un ritorna-su "accoglie" con il suo n, letto dalle letture successive; mai scritto.
  const accolte = new Set();
  for (const l of a.letture.values()) for (const g of Array.isArray(l.dati.legami) ? l.dati.legami : [])
    if (g?.p === 'ritorna-su' && g.come === 'accoglie' && g.n) accolte.add(`${g.a}#${g.n}`);
  const conti = new Map([...a.nodi.keys()].map((s) => [s, { segni: {}, date: [], giorniF: [] }]));
  const segna = (fonte, data, rifs, frammento) => {
    const visti = new Set();
    for (const { slug, voce, n } of rifs) {
      const s = n && accolte.has(`${fonte}#${n}`) ? 'accolta' : voce;
      const c = conti.get(slug);
      if (!visti.has(`${slug} ${s}`)) { c.segni[s] = (c.segni[s] ?? 0) + 1; visti.add(`${slug} ${s}`); }
      c.date.push(data);
      if (frammento) c.giorniF.push(data);
    }
  };
  for (const l of a.letture.values()) {
    const f = a.frammenti.get(l.id), data = giorno(f?.dati.registrato) || giornoDaId(l.id);
    const conta = f && f.dati.canale !== 'importato' && parlante(f, l);
    segna(l.id, data, versoNodi(l.dati, a.nodi), conta);
  }
  for (const r of a.restituzioni.values()) segna(r.id, giorno(r.dati.registrato), versoNodi(r.dati, a.nodi), false);
  // Vicenda (§6.2): ≥ 3 giorni distinti sullo stesso nodo entro 30 giorni attivi (solo frammenti parlanti).
  const attivi = [...new Set([...a.frammenti.values()].filter((f) => parlante(f, a.letture.get(f.id)))
    .map((f) => giorno(f.dati.registrato)))].sort();
  const pos = new Map(attivi.map((g, i) => [g, i]));
  const vicenda = (gg) => {
    const p = [...new Set(gg)].map((g) => pos.get(g)).filter((x) => x !== undefined).sort((x, y) => x - y);
    return p.some((x, i) => i + 2 < p.length && p[i + 2] - x < 30);
  };
  const nota = (n) => {
    for (const id of [n.dati['nato-da'] ?? []].flat()) { const t = a.letture.get(id)?.dati.nota; if (t) return t; }
    return null;
  };
  const ordine = (x, y) => GENERI.indexOf(x.genere) - GENERI.indexOf(y.genere) || (x.id < y.id ? -1 : 1);
  const attesa = correzioni(a).filter((c) => !c.applicata);
  return [...a.nodi.values()].sort(ordine).map((n) => {
    if (n.dati['fuso-in']) return `- ${n.id} → ${n.dati['fuso-in']} · ${n.genere} · ${n.dati.nome} · lapide`;
    const c = conti.get(n.id), s = c.segni;
    const nate = [n.dati['nato-da'] ?? []].flat().map((id) => (ID_F.test(id) ? giornoDaId(id) : giornoDaId(String(id).slice(2))));
    const date = [...c.date, ...nate].filter(Boolean).sort();
    const segni = [`✦${s.sua ?? 0}`, `◌${s.proposta ?? 0}`, `●${s.accolta ?? 0}`,
      ...(s.seme ? [`✧${s.seme}`] : []), ...(s.mondo ? [`○${s.mondo}`] : [])].join(' ');
    const parti = [n.id, n.genere, n.dati.nome, segni, date.length ? `${date[0]}–${date.at(-1)}` : '—'];
    if (vicenda(c.giorniF)) parti.push('vicenda');
    if (n.genere === 'citazioni') {
      parti.push(n.dati.esito ? `esito ${n.dati.esito}` : '⚠ senza esito');
      if (n.dati.originale) parti.push(`originale «${breve(n.dati.originale)}»`);
      if (n.dati.traduzione) parti.push(`traduzione ${breve(n.dati.traduzione)}`);
      const t = nota(n);
      if (t) parti.push(`nota: ${breve(t, 120)}`);
    }
    if (n.genere === 'raccolte' && !n.dati.scopo) parti.push('senza scopo'); // R8: lo segnala, non lo chiede
    // §4: una correzione vale subito nelle viste, sotto il nodo, finché "consolida" non aggiorna il nodo
    for (const c of attesa.filter((x) => x.nodo === n.id)) parti.push(`correzione in attesa: ${c.campo} → ${c.valore} (corregge ${c.bersaglio})`);
    return `- ${parti.join(' · ')}`;
  });
}

// 3. Alias (§3.6): una riga per ogni nome e alias di ogni nodo vivo, chiave → slug (genere, cerchia).
export function righeAlias(nodi) {
  const righe = new Set();
  for (const n of nodi.values()) {
    if (n.dati['fuso-in']) continue;
    const dove = n.dati.cerchia ? `${n.genere}, ${n.dati.cerchia}` : n.genere;
    for (const f of [n.dati.nome, ...(n.dati.alias ?? [])]) if (chiave(f)) righe.add(`- ${chiave(f)} → ${n.id} (${dove})`);
  }
  return [...righe].sort();
}

// recenti.md: ultimi 30 del telefono con la risposta, ultime 5 chat, ultime 10 restituzioni intere (non eredita).
function recenti(a) {
  const restituzioni = [...a.restituzioni.values()].filter((r) => r.dati.forma !== 'eredita')
    .sort((x, y) => (String(x.dati.registrato) < String(y.dati.registrato) ? -1 : String(x.dati.registrato) > String(y.dati.registrato) ? 1 : x.id < y.id ? -1 : 1));
  const ultime = restituzioni.slice(-SOGLIA.restituzioni), sotto = new Set(ultime.map((r) => r.id));
  const risposta = (f) => {
    const l = a.letture.get(f.id), r = l?.dati.risposta;
    if (!l) return '→ ancora senza lettura';
    if (r === 'salvato') return '→ Salvato.';
    if (r === 'ci-sono') return '→ Ci sono.';
    const id = r ?? restituzioni.find((x) => x.dati.per === f.id || (x.dati.copre ?? []).includes(f.id))?.id;
    if (!id) return '→ nessuna risposta';
    const x = a.restituzioni.get(id);
    if (!x) return `→ risposta: ${id} (file assente)`;
    return sotto.has(id) && f.dati.canale === 'chat' ? `→ risposta: ${id} (intera sotto)` : `→ risposta ${id}:\n${x.corpo.trim()}`;
  };
  const voce = (f) => `### ${f.id} · ${f.dati.registrato}\n${f.corpo.trim()}\n${risposta(f)}\n`;
  const per = (canale, n) => [...a.frammenti.values()].filter((f) => f.dati.canale === canale).slice(-n);
  const o = (l) => (l.length ? l : ['nessuno ancora\n']);
  return [
    '# Recenti\n',
    `## Telefono (ultimi ${SOGLIA.telefono})\n`, ...o(per('telefono', SOGLIA.telefono).map(voce)),
    `## Chat (ultime ${SOGLIA.chat})\n`, ...o(per('chat', SOGLIA.chat).map(voce)),
    `## Restituzioni (ultime ${SOGLIA.restituzioni}, intere; le eredita restano fuori)\n`,
    ...o(ultime.map((r) => [`### ${r.id} · ${r.dati.forma}${r.dati.per ? ` per ${r.dati.per}` : ''} · ${r.dati.registrato}`,
      ...(r.dati.voci ?? []).map((v) => `- ${v.n}. ${v.rif} (${SEGNO[v.voce] ?? v.voce} ${v.cosa}${v.turno ? `, ${v.turno}` : ''}${v.esito ? `, ${v.esito}` : ''})`),
      r.corpo.trim(), ''].join('\n'))),
  ].join('\n');
}

// Le date e le marche comuni a parole.md e alla mappa.
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre',
  'novembre', 'dicembre'];
const delicato = (l) => l?.dati.delicato === true;
const legamiDi = (x) => (Array.isArray(x?.dati.legami) ? x.dati.legami.filter(Boolean) : []);
// La data-tetto di un importato (§9.1, A4): la data di `vissuto` (≤…) se c'è, altrimenti quella di `registrato`.
const dataTetto = (f, l) => /\d{4}-\d{2}-\d{2}/.exec(String(l?.dati.vissuto ?? ''))?.[0] ?? giorno(f.dati.registrato);
const tetto = (d) => `entro il ${+d.slice(8, 10)} ${MESI[+d.slice(5, 7) - 1]}, nell'archivio d'origine`;
const oraDi = (f) => /T(\d{2}):(\d{2})/.exec(String(f.dati.registrato ?? ''));
// Un lapide rimanda al nodo in cui è fusa: i conti vanno al nodo vivo.
const vivo = (nodi, s) => {
  for (let i = 0; i < 5 && nodi.get(s)?.dati['fuso-in']; i++) s = nodi.get(s).dati['fuso-in'];
  return s;
};

// I frammenti di parole.md (§6.1): ✦ parlanti e importati ✦ con contenuto (mai il seme ✧); nella chat solo i turni
// parlanti (§6.2: almeno 3 parole, come il frammento).
function voceParole(a) {
  const fuori = [];
  for (const f of a.frammenti.values()) {
    const l = a.letture.get(f.id);
    if ((f.dati.voce ?? 'sua') !== 'sua' || !conContenuto(f, l)) continue;
    let testo = f.corpo.trim();
    if (f.dati.canale === 'chat') {
      const turni = testo.split(/\n(?=\[\d{2}:\d{2}\])/);
      testo = turni.filter((t) => !/^\[\d{2}:\d{2}\]/.test(t) || treParole(t)).join('\n').trim();
      if (!testo || !treParole(testo)) continue;
    }
    const importato = f.dati.canale === 'importato';
    const segni = [];
    if (importato && f.dati.forma === 'riportata') segni.push('trascritta da Claude nel seme');
    if (l?.dati.altrui === true) segni.push('altrui: ✦ il gesto, ○ le parole');
    if (delicato(l)) segni.push('delicato');
    fuori.push({ f, l, testo, importato, segni, giorno: importato ? dataTetto(f, l) : giorno(f.dati.registrato) });
  }
  return fuori;
}

const rigaPiena = (v) => {
  const o = oraDi(v.f);
  const quando = v.importato ? `≤${v.giorno} · importato, ${tetto(v.giorno)}` : `${v.giorno}${o ? ` ${o[1]}:${o[2]}` : ''} · ${v.f.dati.canale}`;
  return `### ${v.f.id} · ${quando}${v.segni.map((s) => ` · ${s}`).join('')}\n${v.testo}\n`;
};
const piatto = (t) => t.replace(/\s+/g, ' ').trim();
const rigaCompatta = (v) => `- ${v.importato ? `≤${v.giorno} (${tetto(v.giorno)})` : v.giorno}${v.segni.length ? ` [${v.segni.join('; ')}]` : ''} · ${piatto(v.testo)}`;

// I periodi prima della finestra (§6.1): per mese una riga di conti (frammenti, temi più frequenti) e le 3 frasi ✦ con più
// reazioni o ritorni, alla lettera (mai le delicate). Deterministico: a parità, la più vecchia.
function periodi(a, fuori, peso) {
  const mesi = new Map();
  for (const v of fuori) (mesi.get(v.giorno.slice(0, 7)) ?? mesi.set(v.giorno.slice(0, 7), []).get(v.giorno.slice(0, 7))).push(v);
  const righe = [];
  for (const [m, vs] of mesi) {
    const temi = new Map();
    for (const v of vs) for (const s of new Set(legamiDi(v.l).filter((g) => g.p === 'parla-di' && a.nodi.get(vivo(a.nodi, g.a))?.genere === 'temi').map((g) => vivo(a.nodi, g.a))))
      temi.set(s, (temi.get(s) ?? 0) + 1);
    const top = [...temi].sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : 1)).slice(0, 3).map(([s, n]) => `${s} ${n}`);
    const imp = vs.filter((v) => v.importato).length;
    righe.push(`- ${m}: ${vs.length - imp} frammenti${imp ? ` (più ${imp} importati)` : ''}${top.length ? `; temi: ${top.join(', ')}` : ''}`);
    const frasi = vs.filter((v) => !delicato(v.l)).map((v, i) => ({ v, i, p: peso(v) })).sort((x, y) => y.p - x.p || x.i - y.i).slice(0, 3);
    for (const { v } of frasi) righe.push(`  - ${rigaCompatta(v).slice(2)}`);
  }
  return righe;
}

// `## Seme ✧` (§6.1): in fondo a parole.md, mai tra le righe ✦, i passi di s01, s03, s04 alla lettera, con il passo e la
// data-tetto. Un passo è un capoverso del corpo; la sua etichetta viene dai `passo` dei legami della lettura il cui
// «estratto» sta nel capoverso, altrimenti dalla `fonte` della lettura (file senza cartella né .md, righe) e dal numero
// del capoverso. Un capoverso che contiene le parole di un importato `voce: sua` lo dice ("copia di u03").
const SEME = ['s01', 's03', 's04'];
function righeSeme(a) {
  const semi = [...a.frammenti.values()].filter((f) => f.dati.voce === 'seme' && SEME.includes(f.id.split('-').at(-1)));
  if (!semi.length) return [];
  const righe = ['## Seme ✧\n', 'Non sono parole tue: è lo sguardo che Claude scrisse nell\'Atlante e tu validasti (✧). Non si mescola alle righe ✦.\n'];
  const sue = [...a.frammenti.values()].filter((f) => f.dati.canale === 'importato' && f.dati.voce === 'sua')
    .map((f) => ({ id: f.id.split('-').at(-1), t: piatto(f.corpo).toLowerCase() })).filter((x) => x.t.length >= 20);
  for (const f of semi) {
    const l = a.letture.get(f.id), d = dataTetto(f, l);
    const fonte = [l?.dati.fonte ?? []].flat()[0];
    const diFonte = fonte ? String(fonte).replace(/@.*$/, '').replace(/^(?:.*\/)?([^/:]+?)(?:\.md)?:/, '$1:') : f.id;
    righe.push(`### ${f.id} · ✧ seme · ≤${d} · ${tetto(d)}\n`);
    f.corpo.trim().split(/\n\s*\n/).forEach((capo, i) => {
      const piano = piatto(capo), passi = [];
      for (const g of legamiDi(l)) {
        if (!g.passo || passi.includes(g.passo)) continue;
        const pezzi = [...String(g.perche ?? '').matchAll(/«([^»]+)»/g)].map((m) => piatto(m[1]));
        if (pezzi.some((p) => p && piano.includes(p))) passi.push(String(g.passo));
      }
      const copie = sue.filter((x) => piano.toLowerCase().includes(x.t)).map((x) => x.id);
      righe.push(`passo ${passi.length ? passi.join(', ') : `${diFonte}, capoverso ${i + 1}`} · ≤${d}${copie.length ? ` · copia di ${copie.join(', ')} (parole tue)` : ''}\n${capo.trim()}\n`);
    });
  }
  return righe;
}

// parole.md: tutto per intero se ci sta; altrimenti la finestra mobile compatta dalla più recente all'indietro, finché
// contesto/ resta sotto il tetto meno il 10% (§6.1), con i periodi prima e `tagliato:` nella testata.
function parole(a, fino, altri) {
  const vs = voceParole(a);
  const reazioni = (v) => (Array.isArray(v.l?.dati.reazione) ? v.l.dati.reazione.length : 0);
  const ritorni = new Map();
  for (const l of a.letture.values()) for (const g of legamiDi(l)) if (g.p === 'ritorna-su' && typeof g.a === 'string') ritorni.set(g.a, (ritorni.get(g.a) ?? 0) + 1);
  const peso = (v) => reazioni(v) + (ritorni.get(v.f.id) ?? 0);
  const budget = SOGLIA.tetto * 0.9 - altri;
  const tok = (t) => Math.round(t.length / 3.5);
  const seme = righeSeme(a);
  const piena = testata(fino, ['# Parole\n', ...(vs.length ? vs.map(rigaPiena) : ['nessuna ancora\n']), ...seme].join('\n'));
  if (tok(piena) <= budget) return piena;
  const righe = vs.map(rigaCompatta);
  const prova = (c) => {
    const ext = c ? { tagliato: `le parole prima del ${vs[c].giorno} non sono qui` } : {};
    const corpo = ['# Parole\n', ...(c ? ['## Periodi (prima della finestra, alla lettera)\n', ...periodi(a, vs.slice(0, c), peso), ''] : []),
      '## Finestra\n', ...righe.slice(c), '', ...seme].join('\n');
    return testata(fino, corpo, ext);
  };
  // Il taglio cade a inizio giorno, perché "prima del" sia vero; il primo che ci sta (ricerca binaria, poi a passi).
  const inizi = vs.map((v, i) => i).filter((i) => i > 0 && vs[i].giorno !== vs[i - 1].giorno);
  if (tok(prova(0)) <= budget || !inizi.length) return prova(0);
  let lo = 0, hi = inizi.length - 1;
  while (lo < hi) { const m = (lo + hi) >> 1; if (tok(prova(inizi[m])) <= budget) hi = m; else lo = m + 1; }
  while (lo < inizi.length - 1 && tok(prova(inizi[lo])) > budget) lo++;
  return prova(inizi[lo]);
}

// --- Seconda parte (piano blocco 5): le sezioni 4, 5, 8 e 9 di mappa.md. ---

// I frammenti che contano (§6.2): parlanti, quindi non importati; le domande (`intento: chiedi`) a parte. Un frammento
// che salva e chiede (B11) sta in tutti e due; uno che chiede soltanto, solo tra le domande.
function contati(a) {
  const tutti = [...a.frammenti.values()].map((f) => ({ f, l: a.letture.get(f.id) })).filter(({ f, l }) => parlante(f, l));
  const chiede = (x) => intenti(x.f, x.l).includes('chiedi');
  const soloChiede = (x) => { const i = intenti(x.f, x.l); return i.length > 0 && i.every((v) => v === 'chiedi'); };
  return { tutti, conti: tutti.filter((x) => !soloChiede(x)), domande: tutti.filter(chiede) };
}

// 4. Parole candidate (D24): `parola · date · giorni distinti`, dalle `parole` delle letture dei frammenti parlanti
// (gli importati no). Prima le parole di più giorni, poi le più recenti, poi in ordine alfabetico.
function righeParole(a) {
  const date = new Map();
  for (const { f, l } of contati(a).tutti) {
    for (const p of new Set([l?.dati.parole ?? []].flat().map((x) => String(x).trim().toLowerCase()).filter(Boolean)))
      (date.get(p) ?? date.set(p, new Set()).get(p)).add(giorno(f.dati.registrato) || giornoDaId(f.id));
  }
  return [...date].map(([p, ds]) => ({ p, gg: [...ds].sort() }))
    .sort((x, y) => y.gg.length - x.gg.length || (x.gg.at(-1) > y.gg.at(-1) ? -1 : x.gg.at(-1) < y.gg.at(-1) ? 1 : x.p < y.p ? -1 : 1))
    .map(({ p, gg }) => `- ${p} · ${gg.join(', ')} · ${gg.length}`);
}

// 5. Conti (§6.2; C15d, Q22): per mese, righe `- AAAA-MM · <tema o voce> · ✦n`, dove n è il numero di frammenti ✦
// parlanti; il totale del mese è `- AAAA-MM · frammenti parlanti · N · dopo le 22: K`, i delicati `- AAAA-MM · delicati · N`; i delicati sono contati (nel totale, nelle voci e in `delicati`) ma mai
// nominati: non entrano nelle righe per tema. La voce è quella dei legami del frammento (`voce proposta · ✦2` = due tuoi
// frammenti portano un legame proposto dall'AI). Le domande a parte, con i loro temi. Importati ed eredita esclusi.
function righeConti(a) {
  const { conti, domande } = contati(a);
  const mese = (x) => (giorno(x.f.dati.registrato) || giornoDaId(x.f.id)).slice(0, 7);
  const temi = (x) => new Set(legamiDi(x.l).filter((g) => g.p === 'parla-di' && typeof g.a === 'string')
    .map((g) => vivo(a.nodi, g.a)).filter((s) => a.nodi.get(s)?.genere === 'temi'));
  const voci = (x) => new Set(legamiDi(x.l).map((g) => g.voce).filter((v) => typeof v === 'string'));
  const conta = (xs, chiavi) => {
    const m = new Map();
    for (const x of xs) for (const k of chiavi(x)) m.set(k, (m.get(k) ?? 0) + 1);
    return [...m].sort((p, q) => q[1] - p[1] || (p[0] < q[0] ? -1 : 1));
  };
  const ORDINE_VOCI = ['sua', 'proposta', 'accolta', 'mondo', 'seme'];
  const mesi = [...new Set([...conti, ...domande].map(mese))].sort();
  const righe = [];
  for (const m of mesi) {
    const c = conti.filter((x) => mese(x) === m), d = domande.filter((x) => mese(x) === m);
    const r = (k, n) => righe.push(`- ${m} · ${k} · ✦${n}`);
    // il totale e i delicati senza ✦, come negli esempi del modello §6.1 (e "dopo le 22": banco D3)
    // l'ora di Roma (ora.mjs), non quella scritta nel `registrato`: un memo in Z o da un altro fuso conta per l'ora di Roma
    const oraRoma = (r) => /T/.test(String(r)) && !isNaN(Date.parse(r)) ? Number(iso(new Date(r)).slice(11, 13)) : NaN;
    const tardi = c.filter((x) => (Number.isNaN(oraRoma(x.f.dati.registrato)) ? Number(x.f.id.slice(9, 11)) : oraRoma(x.f.dati.registrato)) >= 22).length;
    if (c.length) righe.push(`- ${m} · frammenti parlanti · ${c.length} · dopo le 22: ${tardi}`);
    const del = c.filter((x) => delicato(x.l)).length;
    if (del) righe.push(`- ${m} · delicati · ${del}`);
    for (const [t, n] of conta(c.filter((x) => !delicato(x.l)), temi)) r(t, n);
    for (const [v, n] of conta(c, voci).sort((p, q) => ORDINE_VOCI.indexOf(p[0]) - ORDINE_VOCI.indexOf(q[0]))) r(`voce ${v}`, n);
    if (d.length) r('domande', d.length);
    for (const [t, n] of conta(d.filter((x) => !delicato(x.l)), temi)) r(`domande su ${t}`, n);
  }
  return righe;
}

// Le correzioni (§4, V8): ogni `ritorna-su` `come: corregge` con `nodo` e `campo`. È applicata quando il nodo porta già
// il `valore` (per `@Nome`, un nodo con quel nome); allora la data è quella dell'ultimo commit del file del nodo.
function correzioni(a) {
  const fuori = [];
  for (const l of a.letture.values()) for (const g of legamiDi(l)) {
    if (g.p !== 'ritorna-su' || g.come !== 'corregge' || !g.nodo || !g.campo) continue;
    const n = a.nodi.get(g.nodo), v = String(g.valore ?? '');
    const ora = [n?.dati[g.campo] ?? []].flat().map(String);
    const applicata = !!n && (ora.includes(v) || (v.startsWith('@') && ora.some((s) => chiave(a.nodi.get(s)?.dati.nome ?? s) === chiave(v.slice(1)))));
    fuori.push({ nodo: g.nodo, genere: n?.genere, campo: g.campo, valore: v, bersaglio: String(g.a), da: l.id, applicata });
  }
  return fuori;
}
const dataCommit = (radice, percorso) => {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', percorso], { cwd: radice, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch { return ''; }
};

// 8. Correzioni: prima quelle in attesa di "consolida", poi le applicate con la data.
function righeCorrezioni(a) {
  const cs = correzioni(a);
  const riga = (c) => {
    const quando = c.applicata ? (() => { const d = dataCommit(a.radice, `${c.genere}/${c.nodo}.md`); return d ? `applicata il ${d}` : 'applicata'; })() : 'in attesa';
    return `- ${c.nodo} · ${c.campo} → ${c.valore} (corregge ${c.bersaglio}, ${quando})`;
  };
  return [...cs.filter((c) => !c.applicata), ...cs.filter((c) => c.applicata)].map(riga);
}

// 9. Scarti (§4, Q4, Q17): ogni `ritorna-su` `come: rifiuta`, `chiave · contesto · portata · data · parole tue`.
// chiave = il `rif` della voce `n` della restituzione rifiutata (uno slug, o la chiave() di `~Nome`), altrimenti il
// bersaglio; contesto = i temi `parla-di` del frammento che aveva chiesto (il `per` della restituzione; senza, il
// frammento che rifiuta); portata = `entità` se le tue parole tra «» nominano l'entità (nome o alias), altrimenti `legame`.
function righeScarti(a) {
  const righe = [];
  const temiDi = (id) => [...new Set(legamiDi(a.letture.get(id)).filter((g) => g.p === 'parla-di' && typeof g.a === 'string')
    .map((g) => vivo(a.nodi, g.a)).filter((s) => a.nodi.get(s)?.genere === 'temi'))];
  for (const l of a.letture.values()) for (const g of legamiDi(l)) {
    if (g.p !== 'ritorna-su' || g.come !== 'rifiuta' || typeof g.a !== 'string') continue;
    const r = a.restituzioni.get(g.a);
    const rif = g.n !== undefined ? (r?.dati.voci ?? []).find((v) => String(v?.n) === String(g.n))?.rif : undefined;
    const k = typeof rif === 'string' ? (rif.startsWith('~') ? chiave(rif.slice(1)) : vivo(a.nodi, rif)) : g.a;
    const chiesto = typeof r?.dati.per === 'string' ? r.dati.per : a.frammenti.has(g.a) ? g.a : l.id;
    const temi = temiDi(chiesto).length ? temiDi(chiesto) : temiDi(l.id);
    const n = a.nodi.get(k), nomi = [n?.dati.nome, ...(n?.dati.alias ?? []), typeof rif === 'string' && rif.startsWith('~') ? rif.slice(1) : null]
      .map((x) => chiave(String(x ?? ''))).filter((x) => x && x.length >= 3);
    const sue = [...String(g.perche ?? '').matchAll(/«([^»]+)»/g)].map((m) => chiave(m[1])).join(' ');
    const entita = nomi.some((x) => ` ${sue} `.includes(` ${x} `));
    const f = a.frammenti.get(l.id);
    righe.push(`- ${k} · ${temi.length ? temi.join(', ') : '—'} · ${entita ? 'entità' : 'legame'} · ${giorno(f?.dati.registrato) || giornoDaId(l.id)} · ${piatto(String(g.perche ?? ''))}`);
  }
  return righe;
}

const testata = (fino, corpo, extra = {}) =>
  `---\naggiornato: ${iso()}\nfino-a: ${fino ?? 'nessuno'}\ntoken-stimati: ${Math.round(corpo.length / 3.5)}\n${Object.entries(extra).map(([k, v]) => `${k}: ${v}\n`).join('')}---\n${corpo}`;

export function contesto(radice = process.cwd()) {
  const a = { ...carica(radice), radice };
  const fino = [...a.frammenti.keys()].sort().at(-1);
  const mappa = testata(fino, ['# Mappa\n', '## 1. Stato\n', ...stato(a, oggi()), '', '## 2. Nodi\n', ...righeNodi(a), '',
    '## 3. Alias\n', ...righeAlias(a.nodi), '', '## 4. Parole candidate\n', ...righeParole(a), '',
    '## 5. Conti\n', ...righeConti(a), '', '## 8. Correzioni\n', ...righeCorrezioni(a), '',
    '## 9. Scarti\n', ...righeScarti(a), ''].join('\n'));
  const rec = testata(fino, recenti(a));
  // ritratto.md: la copia dell'ultimo ritratto, senza il suo frontmatter ([S] la copia, non la riscrive)
  const ultimo = [...a.restituzioni.values()].filter((r) => r.dati.forma === 'ritratto')
    .sort((x, y) => (String(x.dati.registrato) < String(y.dati.registrato) ? -1 : 1)).at(-1);
  const ritratto = ultimo ? testata(fino, `# Ritratto\n\nda: ${ultimo.id} · ${ultimo.dati.registrato}\n\n${ultimo.corpo.trim()}\n`) : '';
  const par = parole(a, fino, (mappa.length + rec.length + ritratto.length) / 3.5);
  mkdirSync(join(radice, 'contesto'), { recursive: true });
  if (ritratto) writeFileSync(join(radice, 'contesto/ritratto.md'), ritratto);
  writeFileSync(join(radice, 'contesto/recenti.md'), rec);
  writeFileSync(join(radice, 'contesto/parole.md'), par);
  writeFileSync(join(radice, 'contesto/mappa.md'), mappa);
  return { fino, nodi: a.nodi.size, frammenti: a.frammenti.size, ritratto: ultimo?.id ?? null };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argv = process.argv.slice(2), o = { radice: process.cwd() };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--radice' && argv[i + 1]) o.radice = argv[++i];
    else { console.log(`ERRORE argomento sconosciuto: ${argv[i]} (uso: [--radice DIR])`); process.exit(1); }
  }
  try {
    const e = contesto(o.radice);
    console.log(`contesto: fino a ${e.fino ?? 'nessuno'}; ${e.frammenti} frammenti, ${e.nodi} nodi (recenti.md, parole.md, mappa.md §1–5, §8–9${e.ritratto ? ', ritratto.md' : ''})`);
  } catch (err) {
    console.log(`ERRORE contesto: ${err.message}`);
    process.exit(1);
  }
}
