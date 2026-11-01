#!/usr/bin/env bash
# Rigenera il pacchetto dai documenti finali di progetto/v2/ di questo repo.
# Uso, da qualunque punto del repo:  bash progetto/pacchetto/aggiorna.sh
# Le note dell'Atlante NON stanno in questo repo: si leggono da tattoo-shit (pubblico) al commit fisso ATL_SHA,
# il checkpoint da cui è stato importato progetto/. I link verso contenuti di tattoo-shit che non sono in progetto/
# puntano a GitHub, al branch ATL_REF del checkpoint.
# Tocca solo i file copiati, radice/ e ORIGINE.md; LEGGIMI.md, prompt-avvio.md e questo script restano come sono.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
ATL_REF=claude/quirky-newton-qe5g9o
ATL_SHA=3a7ea794e6595c15ecdc1e6fd51de965a28841c3
GH="https://github.com/paol-imi/tattoo-shit/blob/$ATL_REF"
SRC=progetto/v2
DST=progetto/pacchetto
# sorgente:destinazione. Il prefisso numerico dà l'ordine di lettura e tiene gli slug unici nel repo.
FILES="piano:01-piano modello-v3:02-modello-v3 prompt-v3:03-prompt-v3 banco-di-prova-v2:04-banco-di-prova \
simulazione/regole-importazione:05-regole-importazione eredita:06-eredita correzioni-citazioni:07-correzioni-citazioni \
citazioni:08-citazioni identita:09-identita voce:10-voce telefono:11-telefono"
MAPPA=""
for c in $FILES; do s=${c%%:*}; MAPPA="$MAPPA $(basename "$s")=${c#*:}"; done

for c in $FILES; do
  f=${c%%:*}; b=${c#*:}
  MAPPA="$MAPPA" GH="$GH" B="$b" perl -0pe '
    BEGIN { %m = map { split /=/ } split " ", $ENV{MAPPA}; $n = join "|", map quotemeta, keys %m; }
    my $gh = $ENV{GH};
    # 1. link tra documenti del pacchetto: relativi alla cartella del pacchetto
    s{\]\(/progetto/v2/(?:simulazione/)?($n)\.md(#[^)]*)?\)}{"](./" . $m{$1} . ".md" . ($2 // "") . ")"}ge;
    # 2. ogni altro documento di progetto/: relativo, si risolve in questo repo
    s{\]\(/progetto/([^)]*)\)}{](../$1)}g;
    # 3. un link assoluto rimasto (le fonti usano già URL per le note dell Atlante): URL di GitHub
    s{\]\(/([^)]*)\)}{]($gh/$1)}g;
    # 4. riferimenti alla conversazione di progettazione
    s{senza questa conversazione}{senza la conversazione di progettazione}g;
    s{che non vede questa conversazione}{che non vede la conversazione di progettazione}g;
    s{decisione del coordinatore}{decisione di progetto}g;
    s{prompt operativi; coordinatore \|}{prompt operativi; decisione di progetto |}g;
    s{in una sessione su `tattoo-shit` con questo account,}{su `tattoo-shit`, con l account dell Atlante,}g;
    s{con l account dell Atlante}{con l\x27account dell\x27Atlante}g;
    # 5. la domanda sugli account ha la risposta nel LEGGIMI
    s{alla\n   volta \*\(da verificare\)\*; in alternativa un account claude\.ai separato\)}{alla\n   volta; qui c\x27è un solo account, vedi [LEGGIMI](./LEGGIMI.md#un-solo-account))}g;
    # 6. il primo messaggio alla sessione è ora prompt-avvio.md
    s{4\. Il primo messaggio alla sessione: "Leggi [^\n]*?"\.}{4. Il primo messaggio alla sessione: il testo di [prompt-avvio](./prompt-avvio.md).}g;
    # 7. il paragrafo 1 del piano (che cosa copiare) è superato: il progetto sta già in questo repo
    s{(## 1\. Che cosa portare nel repository nuovo \(il pacchetto\)\n)}{$1\n> **Nota del pacchetto.** Questo paragrafo è superato da [LEGGIMI](./LEGGIMI.md): il pacchetto e i documenti di\n> progetto stanno già in `progetto/` di questo repo, con i link relativi; i link alle note dell\x27Atlante puntano a GitHub.\n> Restano validi lo SHA fisso dell\x27Atlante (vedi [ORIGINE](./ORIGINE.md)) e le citazioni da correggere.\n}g;
    # 8. le regole d importazione sono superate dal paragrafo 14 del modello
    if ($ENV{B} eq "05-regole-importazione") {
      s{\A(# [^\n]*\n)}{$1\n> **Nota del pacchetto.** Superato: la sola norma dell\x27importazione è il §14 del [modello v3](./02-modello-v3.md).\n> Questo file usa nomi del v2 e vale solo come storia.\n};
    }
  ' "$SRC/$f.md" > "$DST/$b.md"
done

# CLAUDE.md e prompt/ della radice, estratti dai blocchi di prompt-v3.md.
# Nel pacchetto il CLAUDE.md si chiama claude-radice.md, perché un CLAUDE.md qui verrebbe letto come istruzione dalle
# sessioni che lavorano in questa cartella; la copia alla radice lo rinomina (vedi prompt-avvio.md).
rm -rf "$DST/radice" && mkdir -p "$DST/radice"
echo "Prompt estratti da prompt-v3.md:"
perl "$DST/estrai-prompt.pl" "$SRC/prompt-v3.md" "$DST/radice"
mv "$DST/radice/CLAUDE.md" "$DST/radice/claude-radice.md"

SHA=$(git rev-parse HEAD)
SPORCO=""
[ -n "$(git status --porcelain -- "$SRC")" ] && SPORCO=" più le modifiche non ancora committate di \`$SRC/\` (il pacchetto entra nello stesso commit delle fonti)"
cat > "$DST/ORIGINE.md" <<FINE
# Origine del pacchetto

Generato il $(date +%F) da \`aggiorna.sh\`, copiando i documenti finali di \`$SRC/\` di questo repo.

- Fonti: \`$SRC/\` al commit \`$SHA\`$SPORCO.
- Le note dell'Atlante non sono in questo repo: si leggono da [tattoo-shit](https://github.com/paol-imi/tattoo-shit)
  (pubblico) al **checkpoint** \`$ATL_SHA\` (branch \`$ATL_REF\`), mai da un branch che si muove:
  \`git clone https://github.com/paol-imi/tattoo-shit.git /tmp/atlante && git -C /tmp/atlante checkout $ATL_SHA\`.
  Lo SHA va anche in \`importa/fonte.json\`.
- I link ai documenti di \`progetto/\` sono relativi; quelli alle note dell'Atlante puntano a \`$GH/…\`.
- Estratti da \`prompt-v3.md\`: \`radice/claude-radice.md\` (il \`CLAUDE.md\` della radice) e \`radice/prompt/\`: $(cd "$DST/radice/prompt" && ls | tr '\n' ' ')
- File copiati: $(for c in $FILES; do printf '`%s.md` (da `%s.md`) ' "${c#*:}" "${c%%:*}"; done)
FINE

echo "Pacchetto rigenerato (fonti al commit $SHA${SPORCO:+, con modifiche}; Atlante al checkpoint $ATL_SHA)."
# controllo dei residui: da guardare a mano se stampa qualcosa
grep -nE 'session_[0-9A-Za-z]|questa conversazione|\]\(/' "$DST"/*.md "$DST"/radice/*.md "$DST"/radice/prompt/*.md \
  | grep -v -e "^$DST/LEGGIMI.md" -e "^$DST/prompt-avvio.md" || echo "Nessun residuo."
