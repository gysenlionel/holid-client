import Image from "next/image";
import React from "react";
import Button from "./Button";

interface IHeroProps {}

const Hero: React.FunctionComponent<IHeroProps> = (props) => {
  return (
    <div className="flex items-center justify-center space-x-10">
      <div className="flex flex-col">
        <h1 className="title1 !mb-2">Offers</h1>
        <h2 className="title2Hero mt-4">
          Promotions, Discounts And <br /> Offers Especially For You
        </h2>
        <p className="mt-4 text-left lg:text-center">
          Find inspiration, then compare and book your holiday <br /> with more
          flexibility and enjoyment.
        </p>
        <Button size="lg" children="RESERVE" className="mt-8 self-center" />
      </div>
      <div className="relative hidden h-[310px] w-[420px] md:block">
        <Image
          src="/assets/hero/heroimg.webp"
          alt="Hero image offer"
          fill
          sizes="(max-width: 420px) 100vw"
          className="rounded-xl object-cover "
        />
      </div>
    </div>
  );
};

export default Hero;
