export const formatters = {
  currencyFormatter: (
    value: number,
    locale: string,
    currency: string,
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
  },
};
