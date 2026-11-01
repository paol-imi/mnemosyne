// slug.mjs: slug, chiave, scheletro e candidati (modello §3.6). Nessuna dipendenza.
const LEGATURE = { 'ß': 'ss', 'æ': 'ae', 'œ': 'oe', 'Æ': 'ae', 'Œ': 'oe', 'ø': 'o', 'Ø': 'o', 'đ': 'd', 'ł': 'l' };
const ARTICOLI = new Set(['il', 'lo', 'la', 'i', 'gli', 'le', 'l', 'un', 'uno', 'una', 'the']);

// Passi 1–3 di slug(): parole [a-z0-9] separate da `sep`.
function parole(nome) {
  const s = String(nome ?? '').replace(/[ßæœÆŒøØđł]/g, (c) => LEGATURE[c])
    .normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
  return s.split(/[^a-z0-9]+/).filter(Boolean);
}

export function slug(nome) {
  let s = parole(nome).join('-');
  if (s.length > 60) {
    const taglio = s.lastIndexOf('-', 60);
    s = taglio > 0 ? s.slice(0, taglio) : s.slice(0, 60);
  }
  return s || 'senza-nome';
}

// Chiave di confronto: passi 1–3 con lo spazio; via gli articoli in testa (piano, blocco 1).
export function chiave(nome) {
  const p = parole(nome);
  while (p.length > 1 && ARTICOLI.has(p[0])) p.shift();
  return p.join(' ');
}

// Scheletro: chiave senza vocali, senza h, senza spazi, doppie ridotte ("chioran" e "cioran" → "crn").
export function scheletro(nome) {
  return chiave(nome).replace(/[aeiouh ]/g, '').replace(/(.)\1+/g, '$1');
}

export function levenshtein(a, b) {
  let prec = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const riga = [i];
    for (let j = 1; j <= b.length; j++)
      riga[j] = Math.min(prec[j] + 1, riga[j - 1] + 1, prec[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prec = riga;
  }
  return prec[b.length];
}

// Forza decrescente: 0 esatta (certa), poi deboli: 1 cognome, 2 levenshtein, 3 scheletro, 4 nome di battesimo.
const VIE = ['esatta', 'cognome', 'levenshtein', 'scheletro', 'nome'];

// candidati(nome, indice): indice = [{slug, nome, alias: [], cerchia?}]. Propone, non decide (l'AI sceglie o dice "nuovo").
// Ritorna [{slug, via, debole}] ordinato: prima le esatte (cerchia vita in testa, B06), poi le deboli.
export function candidati(nome, indice = []) {
  const k = chiave(nome), sk = scheletro(nome), trovati = new Map();
  const segna = (n, via) => {
    const forza = VIE.indexOf(via), vita = n.cerchia === 'vita' ? 0 : 1, prima = trovati.get(n.slug);
    if (!prima || forza < prima.forza) trovati.set(n.slug, { slug: n.slug, via, forza, vita });
  };
  for (const n of indice) for (const forma of [n.nome, n.slug, ...(n.alias ?? [])]) {
    const c = chiave(forma);
    if (!c || !k) continue;
    if (c === k) segna(n, 'esatta');
    else if (c.endsWith(' ' + k)) segna(n, 'cognome');
    else if (k.length >= 5 && c.length >= 5 && levenshtein(c, k) <= 2) segna(n, 'levenshtein');
    else if (sk.length >= 3 && scheletro(forma) === sk) segna(n, 'scheletro');
    else if (c.startsWith(k + ' ')) segna(n, 'nome');
  }
  return [...trovati.values()]
    .sort((a, b) => a.forza - b.forza || a.vita - b.vita || a.slug.localeCompare(b.slug))
    .map(({ slug, via }) => ({ slug, via, debole: via !== 'esatta' }));
}
