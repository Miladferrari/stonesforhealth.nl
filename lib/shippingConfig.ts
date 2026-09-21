// Eén plek voor de verzendvoorwaarden. Alles wat een bedrag of een land toont
// hoort hiervandaan te komen, anders lopen teksten uit elkaar — dat is eerder
// gebeurd: een herstelmail noemde €25 en de FAQ noemde €3,95 en landen waar we
// niet naartoe verzenden.

/** Vanaf dit bedrag is de verzending gratis. */
export const GRATIS_VANAF = 30;

/** Verzendkosten onder dat bedrag, inclusief btw. */
export const VERZENDKOSTEN = 4.95;

/** De landen waar we naartoe verzenden. Staat ook zo in WooCommerce. */
export const VERZENDLANDEN: Record<string, string> = {
  NL: 'Nederland',
  BE: 'België',
};

/** Levertijd per land, zoals we die op de site noemen. */
export const LEVERTIJD: Record<string, string> = {
  NL: '1-2 werkdagen',
  BE: '2-3 werkdagen',
};

/** "€4,95" — met een komma, zoals het hoort in het Nederlands. */
export const bedrag = (n: number): string =>
  '€' + n.toFixed(2).replace('.', ',');

/** "€30" voor ronde bedragen, anders "€29,95". */
export const bedragKort = (n: number): string =>
  Number.isInteger(n) ? `€${n}` : bedrag(n);

/** De zin die op de site en in e-mails wordt gebruikt. */
export const GRATIS_VANAF_TEKST = `Gratis verzending vanaf ${bedragKort(GRATIS_VANAF)}`;

/** Kost deze bestelling verzendkosten? */
export const isGratisVerzending = (totaal: number): boolean => totaal >= GRATIS_VANAF;

/** Wat er nog bij moet voor gratis verzending; 0 als het al gratis is. */
export const restTotGratis = (totaal: number): number =>
  Math.max(0, GRATIS_VANAF - totaal);
