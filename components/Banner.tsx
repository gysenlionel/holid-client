import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import banner from "../public/assets/banners/banner.webp";
import banner2 from "../public/assets/banners/banner2.webp";
import BookingBar from "./BookingBar";
import { ParsedUrlQuery } from "querystring";

interface IBannerProps {
  variant: "bookingBarFilters" | "bookingBarClassic";
  hiddenBook?: boolean;
  query?: ParsedUrlQuery;
}

interface subComp {
  children: React.ReactNode;
  children2?: React.ReactNode;
}

const Banner: React.FunctionComponent<IBannerProps> = ({
  variant,
  hiddenBook,
  query,
}) => {
  const [index, setIndex] = useState(0);
  const array = [banner, banner2];

  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? array.length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= array.length ? 0 : newIndex);
  };

  const BannerTitle: React.FunctionComponent<subComp> = ({
    children,
    children2,
  }) => {
    return (
      <h1
        className={`row-start-4 h-full
         text-center text-2xl font-semibold -tracking-tighter text-white ${gridRowCol[index]} lg:text-3xl`}
      >
        {children} <br /> {children2}
      </h1>
    );
  };

  const gridRowCol = {
    0: "lg:col-end-5 lg:row-start-4",
    1: "lg:col-end-2 lg:row-start-4",
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index === array.length - 1 ? 0 : index + 1);
    }, 5000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <div className="relative z-20 select-none font-heading">
      <div className="absolute flex h-[40vh] w-full items-center justify-between md:h-[70vh]">
        <ChevronLeftIcon
          className="ml-4 h-6 w-6 cursor-pointer lg:h-8 lg:w-8"
          onClick={handlePrevious}
        />
        <ChevronRightIcon
          className="mr-4 h-6 w-6 cursor-pointer lg:h-8 lg:w-8"
          onClick={handleNext}
        />
      </div>
      <div className="grid h-[40vh] w-full grid-rows-5 md:h-[70vh] md:space-y-4 lg:grid-cols-4">
        <div className="absolute top-0 left-0 -z-10 h-[40vh] w-full md:h-[70vh]">
          <Image
            src={array[index].src}
            alt="banner"
            fill
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={array[index].src}
            priority
          />
        </div>
        {index === 0 ? (
          <BannerTitle children="Book At Maldive" children2="For This Summer" />
        ) : (
          <BannerTitle children="Go Into Uncharted" children2="Territory" />
        )}
      </div>
      <BookingBar
        variant={variant}
        className={`${hiddenBook && "hidden"}`}
        query={query}
      />
    </div>
  );
};

export default Banner;
