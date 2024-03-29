import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import * as React from "react";
import { Hotel } from "../types";
import Currency from "./Currency";
import { capitalizeFirstLetter } from "../utils/helpers/stringTransform";
import Link from "next/link";
import { dayDifference } from "../utils/helpers/daysCalcul";
import { useSelector } from "react-redux";
import { selectDatesState } from "../store/travelSlice";
import { stringToDate } from "../utils/helpers/transformToDate";

interface IStaysCardProps {
  property: Hotel;
}

const StaysCard: React.FunctionComponent<IStaysCardProps> = ({ property }) => {
  const asterisks = [];

  for (let i = 0; i < property.rating; i++) {
    asterisks.push(
      <StarIcon className="mr-1 !h-4 !w-4 text-orangeMain" key={`stars-${i}`} />
    );
  }

  const datesState = useSelector(selectDatesState);
  const { startDate, endDate } = stringToDate(datesState);

  const days = dayDifference(endDate, startDate);
  return (
    <Link href={`/hotel/${property.slug}`}>
      <div
        className="mb-4 h-auto w-full cursor-pointer 
      space-x-4 rounded-lg bg-grayCard pb-4  xl:grid xl:h-[15rem] xl:grid-cols-3 xl:px-6 
      xl:pb-0"
      >
        <div className="relative xl:flex xl:flex-1 xl:items-center">
          <Image
            src={property.photos[0]?.url}
            alt={`photo ${property.name}`}
            fill
            sizes="100vw"
            className="!relative !h-52 w-full rounded-lg !object-cover xl:!flex-1"
          />
        </div>
        <div className="col-span-2 mt-3 pr-4 xl:pr-0">
          <div className="flex justify-between">
            <div className="mr-4">
              <h1 className="title2">{property.name}</h1>
              <div className="mt-1 flex">{asterisks}</div>
              <div className="text-base font-medium text-white/60">
                {capitalizeFirstLetter(property.city)}
              </div>
            </div>
            <div>
              <Currency
                price={property.cheapestPrice}
                currency="usd"
                className="font-semibold"
              />
              <p className="includesTaxes">Per night</p>
            </div>
          </div>
          <p className="mt-2 text-justify line-clamp-4">{property.desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default StaysCard;
