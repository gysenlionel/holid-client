import React, { useRef, useState } from "react";
import appartements from "../public/assets/type/appartements.webp";
import resorts from "../public/assets/type/resorts.webp";
import hotels from "../public/assets/type/hotels.webp";
import cabbins from "../public/assets/type/cabbins.webp";
import villa from "../public/assets/type/villa.webp";
import Image from "next/image";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import { PropertyTypes } from "../types";
import Link from "next/link";

interface IPropertyTypeProps {
  propertyTypes: PropertyTypes[];
}

const PropertyType: React.FunctionComponent<IPropertyTypeProps> = ({
  propertyTypes,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const photos = [hotels, appartements, resorts, villa, cabbins];
  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div
      className="left-0 flex items-center gap-2 overflow-x-scroll scrollbar-hide"
      ref={rowRef}
    >
      <div
        className={`absolute -left-4 top-24 z-40 hidden h-10 w-10 items-center justify-center rounded-full
        bg-white md:flex ${!isMoved && "!hidden"}`}
        onClick={() => handleClick("left")}
      >
        <ChevronLeftIcon className={`h-9 w-9 cursor-pointer text-background`} />
      </div>
      {photos.map((photo, index) => (
        <Link
          href={{
            pathname: "/stays",
            query: { type: propertyTypes[index].type.slice(0, -1) },
          }}
        >
          <div
            className="relative mb-20 h-48 min-w-[220px] cursor-pointer select-none lg:h-60 lg:min-w-[345px]"
            key={index}
          >
            <Image
              alt="type"
              src={photo.src}
              fill
              sizes="(min-width: 260px) 100vw"
              className="object-cover"
            />
            <div className="absolute top-52 w-full cursor-default text-center lg:top-64">
              <h2 className="title2 !font-normal first-letter:uppercase">
                {propertyTypes[index].type}
              </h2>
              <p className="text-white/50">
                {propertyTypes[index].count} {propertyTypes[index].type}
              </p>
            </div>
          </div>
        </Link>
      ))}
      <div
        className="absolute right-0 top-24 z-40 m-auto hidden h-10 w-10 translate-x-2/4
        items-center justify-center rounded-full bg-white md:flex"
      >
        <ChevronRightIcon
          className={`h-9 w-9 cursor-pointer text-background`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default PropertyType;
