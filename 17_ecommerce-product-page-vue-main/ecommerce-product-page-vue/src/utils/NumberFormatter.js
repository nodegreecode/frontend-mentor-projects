export const formatCurrency = ({ locales, currency, amount }) => {
  const formatter = new Intl.NumberFormat(locales, {
    style: "currency",
    currency: currency,
  });
  return formatter.format(amount);
};

export const formatToPercent = ({ locales, amount }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "percent",
  });
  return formatter.format(amount);
};
