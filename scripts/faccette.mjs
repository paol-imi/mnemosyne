// faccette.mjs: le dimensioni dello schema 4 (progetto/sito/dimensioni.md §1, §2, §3.4), funzioni pure sull'archivio
// in memoria di `carica()` (contesto.mjs, che le riesporta: il sito le importa da lì, tecnica.md).
// - faccette(a): per ogni frase ✦ i valori dei sei assi, ciascuno con la voce del legame che lo dà (per la lente);
// - gesti(a, id): i gesti di una frase (§1.6), calcolati, nessun campo nuovo;
// - righeDaClassificare(a): la sezione «Da classificare» di mappa.md, la coda di "consolida" (§3.4).
// Un passo di legame, più l'autore; l'unica eccezione è la catena dell'`in` (§1.2, §2.5), che dà l'opera e il tipo, mai il
// campo. Un frammento delicato non ripreso non dà valori (§2.10); le persone `vita` non sono valori (§2.11).
import { parlante } from './contesto.mjs';

export const ASSI = ['cose', 'persone', 'temi', 'campo', 'gesto', 'tempo'];
export const GESTI = ['penso', 'sento', 'chiedo', 'ricordo', 'voglio-fare', 'trascrivo', 'per'];
// La voce più forte vince quando lo stesso valore arriva da più legami.
const FORZA = ['sua', 'accolta', 'seme', 'proposta', 'mondo'];
const ID_F = /^\d{8}-\d{4}-[a-z0-9]{3,4}$/;
const legamiDi = (x) => (Array.isArray(x?.dati?.legami) ? x.dati.legami.filter(Boolean) : []);

// Lo slug vivo (una lapide porta al nodo in cui è fusa; al più 5 salti).
function vivo(a, s) {
  for (let i = 0; i < 5 && typeof s === 'string'; i++) {
    const n = a.nodi.get(s);
    if (!n?.dati['fuso-in']) return n ? s : null;
    s = n.dati['fuso-in'];
  }
  return null;
}

// Un frammento delicato è ripreso quando un altro frammento mio ci torna sopra (`ritorna-su` con `a` il suo id).
export function ripreso(a, id) {
  for (const l of a.letture.values()) if (l.id !== id && legamiDi(l).some((g) => g.p === 'ritorna-su' && g.a === id)) return true;
  return false;
}
export const fuori = (a, id) => a.letture.get(id)?.dati.delicato === true && !ripreso(a, id);

// Le frasi ✦ (§2.1): un frammento parlante, o un importato di voce `sua`; mai il seme, mai un delicato non ripreso.
export function frase(a, id) {
  const f = a.frammenti.get(id), l = a.letture.get(id);
  if (!f || fuori(a, id)) return false;
  return f.dati.canale === 'importato' ? f.dati.voce === 'sua' : parlante(f, l);
}

// ● e rifiuti delle voci ◌ (§5 del modello): una voce `n` di una restituzione accolta o rifiutata da un mio `ritorna-su`.
function esiti(a) {
  const e = new Map();
  for (const l of a.letture.values()) for (const g of legamiDi(l))
    if (g.p === 'ritorna-su' && ['accoglie', 'rifiuta'].includes(g.come) && g.n) e.set(`${g.a}#${g.n}`, g.come);
  return e;
}
// La voce di un legame ◌ dal frammento `id` verso `rif`: accolta o rifiutata se una restituzione per quel frammento lo
// propone in una voce che io accolgo o rifiuto; altrimenti com'è.
function voceDi(a, es, id, voce, rif) {
  if (voce !== 'proposta') return voce;
  for (const r of a.restituzioni.values()) {
    const d = r.dati, per = [d.per, ...(d.copre ?? []), d.aggancio?.a];
    if (!per.includes(id)) continue;
    for (const v of Array.isArray(d.voci) ? d.voci : []) {
      if (v?.rif !== rif) continue;
      const x = es.get(`${r.id}#${v.n}`);
      if (x === 'accoglie') return 'accolta';
      if (x === 'rifiuta') return null;
    }
  }
  return voce;
}

function aggiungi(lista, v) {
  const k = (x) => `${x.asse} ${x.valore} ${x.nodo ?? ''} ${x.raccolta ?? ''}`;
  const i = lista.findIndex((x) => k(x) === k(v));
  if (i < 0) lista.push(v);
  else if (FORZA.indexOf(v.voce) < FORZA.indexOf(lista[i].voce)) lista[i] = v;
}

// I gesti di una frase (§1.6): [{valore, voce, raccolta?}].
export function gesti(a, id, es = esiti(a)) {
  const f = a.frammenti.get(id), l = a.letture.get(id), out = [];
  if (!f || fuori(a, id)) return out;
  const g = (valore, voce, extra = {}) => aggiungi(out, { asse: 'gesto', valore, voce, ...extra });
  const altrui = l?.dati.altrui === true;
  // penso: un capo di un `contraddice` di voce sua, o proposto (◌, solo con la lente) o accolto (●); mai su un altrui.
  if (!altrui) for (const x of a.letture.values()) for (const c of legamiDi(x)) {
    if (c.p !== 'contraddice' || !ID_F.test(String(c.a)) || (x.id !== id && c.a !== id)) continue;
    const altro = x.id === id ? c.a : x.id, voce = voceDi(a, es, x.id, c.voce, altro);
    if (voce && voce !== 'mondo') g('penso', voce);
  }
  for (const c of legamiDi(l)) {
    if (c.p === 'parla-di' && c.come === 'stato') { const v = voceDi(a, es, id, c.voce, c.a); if (v) g('sento', v); }
    if (c.p === 'serve-a') { const s = vivo(a, c.a), v = voceDi(a, es, id, c.voce, c.a); if (s && v) g('per', v, { raccolta: s }); }
    if (c.p === 'nomina' && ['da-fare', 'in-corso'].includes(c.fruizione)) {
      const fatta = [...a.letture.values()].some((x) => x.id > id && legamiDi(x).some((y) => y.p === 'nomina' && y.a === c.a && y.fruizione === 'fatta'));
      if (!fatta) g('voglio-fare', c.voce);
    }
  }
  if ([l?.dati.intento ?? f.dati.intento ?? []].flat().includes('chiedi')) g('chiedo', 'sua');
  // ricordo: solo un `vissuto` detto dalle mie parole; la data-tetto di un importato («≤2026-10-04») non lo è.
  const vissuto = String(l?.dati.vissuto ?? '');
  if (vissuto && !/^≤?\d{4}-\d{2}-\d{2}$/.test(vissuto)) g('ricordo', 'sua');
  if (altrui) g('trascrivo', 'sua');
  return out.sort((x, y) => GESTI.indexOf(x.valore) - GESTI.indexOf(y.valore));
}

// Le faccette di tutte le frasi ✦: Map id → {id, importato, valori: [{asse, valore, voce, nodo?, esito?, specie?, raccolta?}]}.
// cose: `valore` è il tipo dell'opera (null se non ancora classificata) o "citazione" con `esito` ("⚠" senza);
// persone e temi: `valore` è lo slug; campo: `valore` è la voce del vocabolario e `nodo` il nodo che la porta;
// tempo: "AAAA-MM", o "archivio" per l'importato. Il campo è sempre ◌ come scaffale: `voce` qui è quella del legame.
export function faccette(a) {
  const es = esiti(a), tutte = new Map();
  for (const id of a.frammenti.keys()) {
    if (!frase(a, id)) continue;
    const f = a.frammenti.get(id), importato = f.dati.canale === 'importato', valori = [];
    const v = (asse, valore, voce, extra = {}) => aggiungi(valori, { asse, valore, voce, ...extra });
    const nodo = (s) => { const k = vivo(a, s); return k ? { s: k, n: a.nodi.get(k) } : null; };
    const campo = (x, voce) => { for (const c of [x.n.dati.campo ?? []].flat()) v('campo', c, voce, { nodo: x.s }); };
    const persona = (x, voce, conCampo = true) => {
      if (!x || x.n.genere !== 'persone' || x.n.dati.cerchia === 'vita') return;
      v('persone', x.s, voce);
      if (conCampo) campo(x, voce);
    };
    const opera = (x, voce, conCampo = true) => {
      v('cose', x.n.dati.tipo ?? null, voce, { nodo: x.s });
      if (!conCampo) return;
      campo(x, voce);
      persona(nodo(x.n.dati.autore), voce); // l'autore: il solo secondo passo
    };
    // la catena dell'`in`: da un personaggio alla sua opera, solo opera e tipo
    const catena = (x, voce) => {
      const o = x?.n.dati.cerchia === 'finzione' && nodo(x.n.dati.in);
      if (o && o.n.genere === 'opere') opera(o, voce, false);
    };
    for (const g of legamiDi(a.letture.get(id))) {
      const x = typeof g.a === 'string' && nodo(g.a);
      if (!x) continue;
      const voce = voceDi(a, es, id, g.voce, g.a);
      if (!voce) continue;
      if (g.p === 'nomina') {
        if (x.n.genere === 'persone') { persona(x, voce); if (x.n.dati.cerchia !== 'vita') catena(x, voce); }
        if (x.n.genere === 'opere') opera(x, voce);
        if (x.n.genere === 'citazioni') {
          v('cose', 'citazione', voce, { nodo: x.s, esito: x.n.dati.esito ?? '⚠' });
          // l'autore c'è solo se verificato: dà persona e campo; la mia attribuzione dà la persona (e la catena), mai il campo
          persona(nodo(x.n.dati.autore), voce);
          for (const s of [x.n.dati['attribuita-a'] ?? []].flat()) { const p = nodo(s); persona(p, voce, false); catena(p, voce); }
        }
      }
      if (g.p === 'parla-di' && x.n.genere === 'temi') {
        v('temi', x.s, voce, x.n.dati.specie ? { specie: x.n.dati.specie } : {});
        if (x.n.dati.specie === 'corrente') campo(x, voce);
      }
    }
    for (const x of gesti(a, id, es)) aggiungi(valori, x);
    v('tempo', importato ? 'archivio' : String(f.dati.registrato).slice(0, 7), 'sua');
    valori.sort((x, y) => ASSI.indexOf(x.asse) - ASSI.indexOf(y.asse));
    tutte.set(id, { id, importato, valori });
  }
  return tutte;
}

// mappa.md, «Da classificare»: i nodi vivi senza `tipo` (opere), senza `specie` (temi), senza `campo` (persone `mondo` e
// `finzione`, opere, correnti). Un nodo nato solo da frammenti delicati non ripresi aspetta.
export function righeDaClassificare(a) {
  const righe = [];
  for (const n of [...a.nodi.values()].sort((x, y) => (x.genere + x.id < y.genere + y.id ? -1 : 1))) {
    const d = n.dati;
    if (d['fuso-in']) continue;
    const manca = [];
    if (n.genere === 'opere' && !d.tipo) manca.push('tipo');
    if (n.genere === 'temi' && !d.specie) manca.push('specie');
    if (!d.campo && ((n.genere === 'persone' && d.cerchia !== 'vita') || n.genere === 'opere' || (n.genere === 'temi' && d.specie === 'corrente')))
      manca.push('campo');
    if (!manca.length) continue;
    const nati = [d['nato-da'] ?? []].flat().filter((x) => ID_F.test(String(x)));
    const aspetta = nati.length > 0 && nati.every((x) => fuori(a, x));
    righe.push(`- ${n.id} · ${n.genere} · ${d.nome} · senza ${manca.join(', ')}${aspetta ? ' · aspetta (nato da un delicato)' : ''}`);
  }
  return righe;
}
