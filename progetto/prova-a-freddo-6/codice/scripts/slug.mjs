// slug.mjs: slug, chiave, scheletro e candidati (modello §3.6, piano blocco 1). ESM, nessuna dipendenza.
const LEGATURE = { 'ß': 'ss', 'æ': 'ae', 'œ': 'oe', 'Æ': 'ae', 'Œ': 'oe', 'ø': 'o', 'Ø': 'o', 'đ': 'd', 'ł': 'l' };
// Articoli in testa da togliere nella chiave: esattamente l'elenco del modello §3.6 (R11); "l'" diventa "l".
const ARTICOLI = new Set(['il', 'lo', 'la', 'i', 'gli', 'le', 'l', 'un', 'una', 'the']);

// Passi 1–3 di slug(): NFKD senza diacritici, legature, minuscolo, parole [a-z0-9].
function parole(nome) {
  const s = String(nome ?? '').replace(/[ßæœÆŒøØđł]/g, (c) => LEGATURE[c])
    .normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
  return s.split(/[^a-z0-9]+/).filter(Boolean);
}

export function slug(nome) {
  let s = parole(nome).join('-');
  if (s.length > 60) {
    const taglio = s.lastIndexOf('-', 60); // ultimo trattino entro il sessantesimo carattere
    s = taglio > 0 ? s.slice(0, taglio) : s.slice(0, 60);
  }
  return s || 'senza-nome';
}

// Chiave di confronto: passi 1–3 con lo spazio, senza gli articoli in testa (ne resta almeno una parola).
export function chiave(nome) {
  const p = parole(nome);
  while (p.length > 1 && ARTICOLI.has(p[0])) p.shift();
  return p.join(' ');
}

// Scheletro: chiave senza vocali, senza h, senza spazi, doppie ridotte ("chioran", "cioran" → "crn").
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

// Forza decrescente: 'esatta' è la sola certa; le altre sono candidati deboli (§3.6 passo 2).
const VIE = ['esatta', 'cognome', 'levenshtein', 'scheletro', 'nome'];

// candidati(nome, alias): alias = voci esistenti, una per nodo ({slug, nome, alias: [], genere?, cerchia?})
// o una per riga della tabella degli alias ({chiave, slug, genere?, cerchia?}).
// Ritorna [{slug, via, debole}] ordinato: esatte prima (cerchia vita in testa, B06), poi le deboli.
// Propone, non decide: sceglie l'AI o dice "nuovo".
export function candidati(nome, alias = []) {
  const k = chiave(nome), sk = scheletro(nome), trovati = new Map();
  if (!k) return [];
  const segna = (v, via) => {
    const forza = VIE.indexOf(via), vita = v.cerchia === 'vita' ? 0 : 1, prima = trovati.get(v.slug);
    if (!prima || forza < prima.forza) trovati.set(v.slug, { slug: v.slug, via, forza, vita });
  };
  for (const v of alias) {
    const persona = !v.genere || v.genere === 'persone'; // cognome e nome valgono per le persone (R10)
    const forme = v.chiave !== undefined ? [v.chiave] : [v.nome, v.slug, ...(v.alias ?? [])];
    for (const forma of forme) {
      const c = chiave(forma);
      if (!c) continue;
      if (c === k) segna(v, 'esatta');
      else if (persona && c.endsWith(' ' + k)) segna(v, 'cognome');
      else if (k.length >= 5 && c.length >= 5 && levenshtein(c, k) <= 2) segna(v, 'levenshtein');
      else if (sk.length >= 3 && scheletro(forma) === sk) segna(v, 'scheletro');
      else if (persona && c.startsWith(k + ' ')) segna(v, 'nome');
    }
  }
  return [...trovati.values()]
    .sort((a, b) => a.forza - b.forza || a.vita - b.vita || a.slug.localeCompare(b.slug))
    .map(({ slug, via }) => ({ slug, via, debole: via !== 'esatta' }));
}
