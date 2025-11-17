export function formatPrice(amount: number): string {
  if (!Number.isFinite(amount)) {
    return "0,00 ₾";
  }

  const isNegative = amount < 0;
  const absolute = Math.abs(amount);

  const fixed = absolute.toFixed(2); // always "1234.56"
  const [integerPart, fractionalPart] = fixed.split(".");

  const withGroupSeparators = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " ",
  );

  const formatted = `${withGroupSeparators},${fractionalPart}`;

  return `${isNegative ? "-" : ""}${formatted} ₾`;
}


