export const calculatePrice = (
  price: string | number,
  percent: string | number
): number => {
  const thePrice = typeof price === "string" ? parseFloat(price) : price;
  const thePercent =
    typeof percent === "string" ? parseFloat(percent) : percent;
  const discountedPrice = (thePrice * (100 - thePercent)) / 100;
  return parseFloat(discountedPrice.toFixed(1));
};

export const renderVND = (price: string | number) => {
  const currencyConfig = {
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const { currency, minimumFractionDigits, maximumFractionDigits } =
    currencyConfig;

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  });

  return formatter.format(Number(price));
};
