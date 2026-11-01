#!/usr/bin/env perl
# Estrae da prompt-v3.md i blocchi ````markdown in file pronti per la radice del repo nuovo:
# CLAUDE.md e prompt/NOME.md. Il nome viene dal titolo (## o ###) che precede il blocco:
# se il titolo contiene `prompt/NOME.md` o `CLAUDE.md` vale quello, altrimenti la tabella sotto.
# Uso: perl estrai-prompt.pl prompt-v3.md CARTELLA-DI-USCITA
use strict; use warnings; use utf8;
use open qw(:std :encoding(UTF-8));
my ($src, $out) = @ARGV;
my @mappa = (
  [qr/CLAUDE\.md/, 'CLAUDE.md'],
  [qr/"smista"/, 'prompt/smista.md'],
  [qr/"consolida"/, 'prompt/consolida.md'],
  [qr/"lettera"/, 'prompt/lettera.md'],
  [qr/"ritratto"/, 'prompt/ritratto.md'],
  [qr/Progetto claude\.ai/, 'prompt/progetto.md'],
  [qr/Specchio/, 'prompt/specchio.md'],
  [qr/[Rr]icordi/, 'prompt/ti-ricordi.md'],
  [qr/Sogno/, 'prompt/sogno.md'],
  [qr/Confronto/, 'prompt/confronto.md'],
);
open my $in, '<', $src or die "$src: $!";
my ($titolo, $dentro, $buf, %scritti) = ('', 0, '');
while (my $r = <$in>) {
  if (!$dentro) {
    if ($r =~ /^#{2,3} (.*)/) { $titolo = $1; next; }
    if ($r =~ /^````markdown\s*$/) { $dentro = 1; $buf = ''; next; }
  } else {
    if ($r =~ /^````\s*$/) {
      $dentro = 0;
      my $nome;
      if ($titolo =~ m{(prompt/[a-z0-9-]+\.md|CLAUDE\.md)}) { $nome = $1; }
      else { for (@mappa) { if ($titolo =~ $_->[0]) { $nome = $_->[1]; last; } } }
      if (!$nome) { warn "ATTENZIONE: blocco senza destinazione sotto il titolo \"$titolo\"\n"; next; }
      die "destinazione doppia: $nome (titolo \"$titolo\")\n" if $scritti{$nome}++;
      my $f = "$out/$nome"; (my $d = $f) =~ s{/[^/]+$}{}; mkdir $d unless -d $d;
      open my $o, '>', $f or die "$f: $!"; print $o $buf; close $o;
      print "  $nome\n";
      next;
    }
    $buf .= $r;
  }
}
die "nessun blocco estratto\n" unless %scritti;
