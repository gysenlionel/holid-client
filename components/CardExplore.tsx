import Image from "next/image";
import * as React from "react";
import { Hotel } from "../types";
import { StarIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import Currency from "./Currency";

interface ICardExploreProps {
  caribbeanHotel: Hotel;
}

const CardExplore: React.FunctionComponent<ICardExploreProps> = ({
  caribbeanHotel,
}) => {
  const asterisks = [];

  for (let i = 0; i < caribbeanHotel.rating; i++) {
    asterisks.push(
      <StarIcon className="!h-4 !w-4 text-orangeMain" key={`stars-${i}`} />
    );
  }

  return (
    <div
      className="w-[calc(10rem + 15vw)] relative flex h-[24rem]  
    items-center rounded-lg bg-grayCard"
    >
      <Image
        src={caribbeanHotel.photos[0]?.url}
        alt={`photo ${caribbeanHotel.name}`}
        fill
        className="!w-[calc(7rem + 10vw) !h-[13rem] rounded-lg object-cover"
      />
      <div className="relative z-10 mx-6 mt-40 flex-1">
        <div className="absolute -top-10">
          <h2 className="title2 mb-1">{caribbeanHotel?.name}</h2>
          <div className="flex">{asterisks}</div>
        </div>
        <div className="absolute -bottom-24 flex w-full items-center justify-between">
          <div className="flex flex-row space-x-4">
            <p className="text-white/50">From</p>
            <Currency
              price={caribbeanHotel.cheapestPrice}
              currency="usd"
              className="font-semibold"
            />
          </div>
          <div
            className="flex h-12 w-12 items-center 
          justify-center rounded-full bg-orangeMain"
          >
            <PlusIcon className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardExplore;
