import Image from "next/image";
import * as React from "react";
import { Booking, Hotel } from "../types";
import { StarIcon } from "@heroicons/react/24/solid";
import { capitalizeFirstLetter } from "../utils/helpers/stringTransform";
import { format } from "date-fns";
import Currency from "./Currency";

interface ICardHolidaysProps {
  hotels: Hotel[];
  booking: Booking;
  index: number;
}

const CardHolidays: React.FunctionComponent<ICardHolidaysProps> = ({
  hotels,
  booking,
  index,
}) => {
  const asterisks = [];

  for (let i = 0; i < hotels[index].rating; i++) {
    asterisks.push(
      <StarIcon className="mr-1 !h-4 !w-4 text-orangeMain" key={`stars-${i}`} />
    );
  }

  const StatusBadge = () => {
    return (
      <div
        className={`w-32 rounded-md bg-orangeMain py-1 text-center text-base font-semibold lg:py-2`}
      >
        {bookingStatus()}
      </div>
    );
  };

  const FamilyComp = () => {
    return (
      <div className="leading-5 lg:leading-normal">
        <p>
          Adult{booking.adult > 1 ? "s" : ""}: {booking.adult}
        </p>
        <p>children: {booking.children}</p>
      </div>
    );
  };

  const bookingStatus = () => {
    if (new Date(booking.dates.startDate) > new Date()) {
      return <p>Comming Soon</p>;
    } else if (
      new Date(booking.dates.startDate) <= new Date() &&
      new Date(booking.dates.endDate) >= new Date()
    ) {
      return <p>On Holiday</p>;
    } else {
      return <p>Past</p>;
    }
  };
  return (
    <div
      className="mb-4 h-auto w-full max-w-6xl 
      rounded-lg bg-grayCard pb-4 lg:grid lg:grid-cols-5 
     lg:pb-0"
    >
      <div className="relative lg:col-span-2 lg:flex lg:flex-1 lg:items-center lg:py-3 lg:pl-4 lg:pr-8">
        <Image
          src={hotels[index].photos[0].url}
          alt={`photo ${hotels[index].name}`}
          fill
          sizes="50vw"
          className="!relative !h-[200px] !w-full rounded-lg !object-cover"
        />
      </div>
      <div className="mt-3 mb-1 px-4 pr-4 lg:col-span-2 lg:mb-0 lg:grid lg:grid-rows-3 lg:px-0 lg:pr-0">
        <div className="mr-4">
          <h1 className="title2">{hotels[index].name}</h1>
          <div className="mt-1 flex">{asterisks}</div>
        </div>
        <div className="hidden font-heading text-sm font-semibold lg:flex lg:flex-col lg:justify-center lg:text-base">
          <FamilyComp />
        </div>
      </div>
      <div className="flex h-full flex-col justify-between px-4 pb-3 pt-3 pr-4 lg:px-0 lg:pr-0 lg:pl-4">
        <div className="mb-4 flex justify-between font-heading text-sm font-thin lg:mr-4 lg:mb-0 lg:block lg:text-base">
          <div>
            <p>
              From{" "}
              <span className="font-semibold">
                {format(new Date(booking.dates.startDate), "dd/MM/yyyy")}
              </span>
            </p>
            <p>
              To{" "}
              <span className="font-semibold">
                {format(new Date(booking.dates.endDate), "dd/MM/yyyy")}
              </span>
            </p>
          </div>
          <div className="block lg:hidden">
            <StatusBadge />
          </div>
        </div>
        <div className="flex justify-between lg:block">
          <div className="block lg:hidden">
            <FamilyComp />
          </div>
          <div>
            <Currency
              price={booking.price}
              currency="usd"
              className="font-semibold"
            />
            <p className="includesTaxes">Includes taxes</p>
          </div>
        </div>
        <div className="hidden lg:block">
          <StatusBadge />
        </div>
      </div>
    </div>
  );
};

export default CardHolidays;
