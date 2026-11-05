# La ruota e le tavole

**L'idea.** Una ruota ad anelli, uno per asse. Si gira col dito, e ciò che si ferma sulla linea di mezzogiorno si
allinea. Il foglio mostra la tua frase ✦ che tiene insieme quelle cose, e un segno d'oro la indica sulla linea. Toccando
un nodo, l'anello lo porta a mezzogiorno e si apre la sua Tavola: biglietti con le frasi, opere, persone e citazioni ○
disposti su un piano scuro alla Warburg, con i fili tra loro. Il file è uno solo (`index.html`), senza librerie: SVG fatto
a mano e font da Google Fonts. I dati sono sintetici: 228 nodi e 431 frammenti, nessun delicato, nessuna persona `vita`. Le frasi sono tutte
inventate. Sono confrontate con `frammenti/`, `CLAUDE.md` e il resto del repository: nessuna sequenza di 5 parole in comune,
e quelle di 4 sono titoli o modi di dire.

## I gesti
- **Trascinare un anello**: lo gira. Lasciato, ha un po' d'inerzia e poi si ferma con un nodo esattamente a mezzogiorno.
- **Toccare il centro (gira)**: le ruote girano in versi alterni e si fermano su una frase tua vera, con almeno due
  anelli forti allineati.
- **Toccare un nodo**: il nodo arriva a mezzogiorno e si apre la Tavola. Il Filo, in alto, tiene gli ultimi 8 passi.
  Chiusa la Tavola, i fili sulla ruota restano a mostrare con che cosa il nodo sta nelle tue frasi.
- **Pizzico, rotella, + e −**: zoom semantico.
  - Da lontano si legge solo la riga di mezzogiorno: a sinistra il nome dell'anello, a destra la cosa allineata.
  - In ogni anello si leggono anche i 3 nomi più forti.
  - Avvicinandosi compaiono gli altri nomi, se ci stanno senza toccarsi.
  - Sul telefono la ruota si apre già vicina sulla metà alta. «◎ tutta» la mostra intera.
- **Il nome di un anello** (nei chip o sulla riga di mezzogiorno) apre il suo vassoio. Dentro un anello le scelte si
  sommano (O), tra anelli diversi si incrociano (E). Ogni valore porta il numero di frasi che resterebbero.
- **Il tempo**:
  - Ogni barra è un mese: toccarla restringe la ruota a quel mese.
  - Il cursore mostra la ruota com'era fino a un certo mese.
  - ▶ la fa crescere dall'inizio: i nodi nascono quando li nomini la prima volta.
- **Tastiera**: su e giù scelgono l'anello, le frecce lo girano, Invio apre, spazio gira, Esc chiude la Tavola.

## Come ogni asse diventa visivo
| asse | posizione | forma | colore | luce |
|---|---|---|---|---|
| gesto | 1° anello, archi | arco | indaco | opacità = frasi |
| sentimenti | 2° | punto | malva | grandezza = frasi ✦ |
| temi (idee, simboli, domande, correnti, stili) | 3°, per specie, il più forte al centro del gruppo | punto | ocra | grandezza |
| campo ◌ | 4°, sottile e quieto | arco | grigio salvia, al 50% | — |
| persone | 5°, per campo (stanno fuori dal loro campo) | punto | verde acqua | grandezza |
| cose | 6°, per tipo | 5 forme: ● suono, ■ pagina, ▲ schermo, ◆ altro, ❞ citazione; ⚠ triangolo ambra | blu inchiostro | grandezza |
| tempo | anello esterno, i mesi | arco | seppia | opacità = frasi del mese |

- La grandezza dice quante frasi tue ✦ e accolte ● toccano un nodo. L'alone dorato va solo ai pochissimi più forti e a
  ciò che sta allineato.
- Ciò che non passa un filtro resta al suo posto, colorato al 22%. Le posizioni non saltano mai.
- Le proposte ◌ sono spente di default. Accese, sono cerchi tratteggiati e grigi, e i loro fili sono tratteggiati.
- Il rosso non c'è.
- Il ○ compare solo nella Tavola, sempre con opera e passo.

## Che cosa hanno fatto cambiare i giudici
- **L'utente**: la ruota sul telefono era schiacciata, il filtro la «spegneva», i punti erano anonimi. Andando indietro
  nel tempo si finiva in un vicolo cieco, «Niente si aggancia ancora».
  - Ora la ruota sul telefono si apre ingrandita e il conto con i filtri attivi sta in una barra sopra la ruota.
  - Ciò che non passa il filtro resta colorato al 22%, e il foglio mostra «le frasi che restano».
  - Ogni anello mostra sempre i 3 nomi più forti.
  - Se niente si aggancia, le ruote vanno da sole alla tua frase più recente che passa.
  - La Tavola sul telefono è un piano largo da trascinare ed entra con una dissolvenza.
- **Il designer**:
  - Bersagli: si tocca sempre l'anello più vicino e il nodo più vicino entro 34 px.
  - Le proposte erano i segni più forti: ora sono fili sottili, grigi e tratteggiati.
  - Grandezza e alone dicevano la stessa cosa: l'alone ora resta ai pochissimi più forti e a ciò che è allineato.
  - L'anello del campo è più sottile e più quieto.
  - Le etichette di mezzogiorno stanno su una pillola, e la linea d'oro è più sottile.
  - Le forme sono passate da 11 a 5, con una legenda di 5 voci.

## Che cosa resta debole
- **I bersagli sul telefono.** A ruota intera i nodi sono distanti 12–15 px: si sceglie il più vicino, ma i 44 px veri si
  hanno solo da vicino. La «fisarmonica» proposta dal designer (l'anello toccato che si allarga) non è fatta.
- **La Tavola sul telefono** richiede di trascinare per vedere le cose ai lati, e niente lo dice.
- **Le frasi generate da modelli** (sono il 70% dei dati) si riconoscono. Con i frammenti veri la ruota sarà più rada nei
  mesi vecchi.
- **Accessibilità.** Il canvas non ha ancora un'alternativa testuale completa: c'è il foglio, ma non un elenco di tutti i
  nodi.
- **Una seconda riga di giudizio non c'è stata.** Le foto in `foto/` sono quelle corrette dopo il primo giro.
