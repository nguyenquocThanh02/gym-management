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
