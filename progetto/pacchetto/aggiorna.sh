#!/usr/bin/env bash
# Rigenera il pacchetto dai documenti finali di _progetto/v2/.
# Uso, dalla radice di tattoo-shit:  bash _progetto/pacchetto/aggiorna.sh [REF]
# REF è il branch (o lo SHA) di tattoo-shit a cui puntano i link verso i documenti NON copiati
# e da cui lo script di importazione legge le note. Default: claude/quirky-newton-qe5g9o
# (dove stanno le correzioni delle citazioni); dopo l'unione a main: bash ... aggiorna.sh main
# Tocca solo i file copiati, radice/ e ORIGINE.md; LEGGIMI.md, prompt-avvio.md e questo script restano come sono.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
REF="${1:-claude/quirky-newton-qe5g9o}"
GH="https://github.com/paol-imi/tattoo-shit/blob/$REF"
SRC=_progetto/v2
DST=_progetto/pacchetto
# sorgente:destinazione. Il prefisso numerico dà l'ordine di lettura e tiene gli slug unici nel repo.
FILES="piano:01-piano modello-v3:02-modello-v3 prompt-v3:03-prompt-v3 banco-di-prova-v2:04-banco-di-prova \
simulazione/regole-importazione:05-regole-importazione eredita:06-eredita correzioni-citazioni:07-correzioni-citazioni \
citazioni:08-citazioni identita:09-identita voce:10-voce telefono:11-telefono"
MAPPA=""
for c in $FILES; do s=${c%%:*}; MAPPA="$MAPPA $(basename "$s")=${c#*:}"; done

for c in $FILES; do
  f=${c%%:*}; b=${c#*:}
  MAPPA="$MAPPA" GH="$GH" perl -0pe '
    BEGIN { %m = map { split /=/ } split " ", $ENV{MAPPA}; $n = join "|", map quotemeta, keys %m; }
    my $gh = $ENV{GH};
    # 1. link tra documenti del pacchetto: relativi, validi ovunque si copi la cartella
    s{\]\(/_progetto/v2/(?:simulazione/)?($n)\.md(#[^)]*)?\)}{"](./" . $m{$1} . ".md" . ($2 // "") . ")"}ge;
    # 2. ogni altro link assoluto (ricerca, note dell Atlante): URL di GitHub, leggibile senza credenziali
    s{\]\(/([^)]*)\)}{]($gh/$1)}g;
    # 3. riferimenti alla conversazione di progettazione
    s{senza questa conversazione}{senza la conversazione di progettazione}g;
    s{che non vede questa conversazione}{che non vede la conversazione di progettazione}g;
    s{decisione del coordinatore}{decisione di progetto}g;
    s{prompt operativi; coordinatore \|}{prompt operativi; decisione di progetto |}g;
    s{in una sessione su `tattoo-shit` con questo account,}{su `tattoo-shit`, con l account dell Atlante,}g;
    s{con l account dell Atlante}{con l\x27account dell\x27Atlante}g;
    # 4. il paragrafo 1 del piano (che cosa copiare) è superato dal pacchetto
    # 6. la domanda sui due account ha la risposta nel LEGGIMI
    s{alla\n   volta \*\(da verificare\)\*}{alla\n   volta, verificato in [LEGGIMI](./LEGGIMI.md#due-account)}g;
    # 5. il primo messaggio alla sessione è ora prompt-avvio.md
    s{4\. Il primo messaggio alla sessione: "Leggi [^\n]*?"\.}{4. Il primo messaggio alla sessione: il testo di [prompt-avvio](./prompt-avvio.md).}g;
    s{(## 1\. Che cosa portare nel repository nuovo \(il pacchetto\)\n)}{$1\n> **Nota del pacchetto.** Questo paragrafo è superato da [LEGGIMI](./LEGGIMI.md): il pacchetto contiene già i documenti\n> necessari, con i link riscritti; i link ai documenti di ricerca puntano a GitHub. Restano validi lo SHA fisso\n> (vedi [ORIGINE](./ORIGINE.md)) e le citazioni da correggere.\n}g;
  ' "$SRC/$f.md" > "$DST/$b.md"
done

# CLAUDE.md e prompt/ del repo nuovo, estratti dai blocchi di prompt-v3.md.
# Nel pacchetto il CLAUDE.md si chiama claude-radice.md, perché un CLAUDE.md qui verrebbe letto dalle sessioni su
# tattoo-shit; la copia nel repo nuovo lo rinomina (vedi prompt-avvio.md).
rm -rf "$DST/radice" && mkdir -p "$DST/radice"
echo "Prompt estratti da prompt-v3.md:"
perl "$DST/estrai-prompt.pl" "$SRC/prompt-v3.md" "$DST/radice"
mv "$DST/radice/CLAUDE.md" "$DST/radice/claude-radice.md"

SHA=$(git rev-parse --verify -q "origin/$REF" 2>/dev/null || git rev-parse --verify -q "$REF" 2>/dev/null || echo "da-fissare")
cat > "$DST/ORIGINE.md" <<FINE
# Origine del pacchetto

Generato il $(date +%F) da \`aggiorna.sh\`, copiando i documenti finali di \`_progetto/v2/\` di
[tattoo-shit](https://github.com/paol-imi/tattoo-shit) (pubblico).

- Ref di lettura: \`$REF\`, commit \`$SHA\`.
- Le note dell'Atlante da importare si leggono da quel commit, mai da un branch che si muove:
  \`git clone https://github.com/paol-imi/tattoo-shit.git /tmp/atlante && git -C /tmp/atlante checkout $SHA\`.
  Lo SHA va anche in \`importa/fonte.json\`.
- I link verso documenti non copiati (ricerca, simulazioni, note) puntano a \`$GH/…\`.
- Estratti da \`prompt-v3.md\`: \`radice/claude-radice.md\` (il \`CLAUDE.md\` del repo nuovo) e \`radice/prompt/\`: $(cd "$DST/radice/prompt" && ls | tr '\n' ' ')
- File copiati: $(for c in $FILES; do printf '`%s.md` (da `%s.md`) ' "${c#*:}" "${c%%:*}"; done)
FINE

echo "Pacchetto rigenerato (ref $REF, commit $SHA)."
# controllo dei residui: da guardare a mano se stampa qualcosa
grep -nE 'session_[0-9A-Za-z]|questa conversazione|\]\(/_progetto' "$DST"/*.md | grep -v -e '^_progetto/pacchetto/LEGGIMI.md' -e '^_progetto/pacchetto/prompt-avvio.md' || echo "Nessun residuo."
