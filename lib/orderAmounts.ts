// Bedragen uit een WooCommerce-order omrekenen naar wat de klant betaalt.
//
// De WooCommerce REST API geeft regel-, verzend- en kortingsbedragen **altijd
// exclusief btw** terug, ook als de winkel met bruto prijzen werkt
// (prices_include_tax = true). De btw staat in aparte velden ernaast:
//
//   line_item.total 12.36  +  line_item.total_tax 2.59  =  14.95
//   shipping_total   4.09  +  shipping_tax        0.86  =   4.95
//   order.total                                            19.90
//
// Wie item.price of shipping_total rechtstreeks toont, laat de klant dus een
// bedrag zonder btw zien. Daar is dit bestand voor: alles wat een klant te
// zien krijgt, rekent hiermee.
//
// Belangrijk: nooit delen door 1,21. Dat gaat mis zodra er een product met 9%
// btw bij komt, bij meerdere tarieven in één order en bij btw-vrije orders.
// De btw die WooCommerce per order heeft vastgelegd is de enige juiste bron.
//
// De factuur-PDF gebruikt dit bewust niet: op een factuur hoort de splitsing
// van bedrag exclusief btw, het btw-bedrag en het totaal.

const num = (v: unknown): number => {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
  return Number.isFinite(n) ? n : 0;
};

interface OrderRegel {
  quantity?: number;
  total?: string | number;
  total_tax?: string | number;
  subtotal?: string | number;
  subtotal_tax?: string | number;
}

interface Order {
  line_items?: OrderRegel[];
  shipping_total?: string | number;
  shipping_tax?: string | number;
  discount_total?: string | number;
  discount_tax?: string | number;
  total?: string | number;
  total_tax?: string | number;
}

/** Wat deze regel de klant kost, inclusief btw. */
export function brutoRegel(item: OrderRegel): number {
  return num(item.total) + num(item.total_tax);
}

/** Stukprijs inclusief btw. */
export function brutoStukprijs(item: OrderRegel): number {
  const aantal = num(item.quantity) || 1;
  return brutoRegel(item) / aantal;
}

/**
 * Subtotaal inclusief btw, vóór korting. Gebruikt subtotal (= vóór korting)
 * en valt terug op total voor orders waar subtotal ontbreekt.
 */
export function brutoSubtotaal(order: Order): number {
  return (order.line_items ?? []).reduce((som, item) => {
    const heeftSubtotaal = item.subtotal !== undefined && item.subtotal !== null;
    return som + (heeftSubtotaal
      ? num(item.subtotal) + num(item.subtotal_tax)
      : brutoRegel(item));
  }, 0);
}

/** Verzendkosten inclusief btw. */
export function brutoVerzending(order: Order): number {
  return num(order.shipping_total) + num(order.shipping_tax);
}

/** Korting inclusief btw. 0 als er geen korting is. */
export function brutoKorting(order: Order): number {
  return num(order.discount_total) + num(order.discount_tax);
}

/** Het btw-bedrag van de hele order. */
export function btwBedrag(order: Order): number {
  return num(order.total_tax);
}

/** Het ordertotaal zoals WooCommerce het heeft vastgelegd. */
export function orderTotaal(order: Order): number {
  return num(order.total);
}

/** "12,36" -> "€12,36". Met een komma, zoals het hoort in het Nederlands. */
export function euro(bedrag: number): string {
  return '€' + bedrag.toFixed(2).replace('.', ',');
}

/**
 * Controle: subtotaal - korting + verzending hoort gelijk te zijn aan het
 * ordertotaal. Wijkt het af, dan klopt er iets niet aan de order en kunnen we
 * dat loggen in plaats van de klant een onlogisch overzicht voorschotelen.
 */
export function totalenKloppen(order: Order, marge = 0.02): boolean {
  const berekend = brutoSubtotaal(order) - brutoKorting(order) + brutoVerzending(order);
  return Math.abs(berekend - orderTotaal(order)) < marge;
}
