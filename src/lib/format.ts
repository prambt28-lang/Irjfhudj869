/**
 * Persian number formatting.
 *
 * Every figure on the site (prices, areas, years, counts) is written with Persian
 * digits and Persian separators so it reads naturally in the RTL layout. The
 * underlying values are never changed — only how they are displayed.
 */
const faInteger = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 })
const faDecimal = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 })

/** 3650 → «۳٬۶۵۰» */
export function faInt(value: number): string {
  return faInteger.format(value)
}

/** Keeps a Latin-formatted value but swaps in Persian digits (e.g. a year or a count). */
export function faDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)])
}

/** 2_350_000 → «۲٫۳۵ میلیون دلار» — the headline price used across the site. */
export function faPrice(price: number): string {
  if (price >= 1_000_000) {
    return `${faDecimal.format(price / 1_000_000)} میلیون دلار`
  }
  return `${faInteger.format(price)} دلار`
}

/** 3650 → «۳٬۶۵۰ فوت مربع» */
export function faArea(sqft: number): string {
  return `${faInteger.format(sqft)} فوت مربع`
}
