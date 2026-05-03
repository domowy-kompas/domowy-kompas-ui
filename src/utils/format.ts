export function formatCurrency(value: number, locale = 'pl-PL', currency = 'PLN'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}

export function formatCurrencySigned(value: number, locale = 'pl-PL', currency = 'PLN'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, signDisplay: 'always' }).format(value)
}
