import * as React from "react";

interface ICurrencyProps {
  price: number;
  currency: "usd" | "eu" | undefined;
  className?: string;
}

const Currency: React.FunctionComponent<ICurrencyProps> = ({
  price,
  currency,
  className,
}) => {
  const numberWithCommas = (x: number | string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <span className={`font-body ${className}`}>
      {currency === "usd" && "$"}
      {price % 1 === 0
        ? `${numberWithCommas(price)}.00`
        : numberWithCommas(price.toFixed(2))}
      {currency === "eu" && "€"}
    </span>
  );
};

export default Currency;
