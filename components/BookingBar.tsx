import React, { useEffect, useRef, useState } from "react";
import Input from "./Form/Input";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import {
  CalendarDaysIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Button from "./Button";
import OutsideClick from "./OutsideClick/OutsideClick";
import CompFamModal from "./Modal/CompFamModal";
import { useRouter } from "next/router";

interface IBookingBarProps {
  className?: string;
  variant?: "bookingBarFilters" | "bookingBarClassic";
}

interface IData {
  city: string;
  min: number | null;
  max: number | null;
}

const BookingBarClassic: React.FunctionComponent<IBookingBarProps> = ({
  className,
}) => {
  const router = useRouter();
  const [openDate, setOpenDate] = useState(false);
  const [data, setData] = useState({
    city: "",
  });

  const [showModal, setShowModal] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (name: keyof IData, value: string): void => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSearch = () => {
    // TODO: save in redux
    let dateForm = {
      startDate: format(dates[0].startDate, "dd-MM-yyyy"),
      endDate: format(dates[0].endDate, "dd-MM-yyyy"),
      key: dates[0].key,
    };
    router.push(
      {
        pathname: "/stays",
        query: {
          destination: data.city,
          dates: JSON.stringify(dateForm),
          options: JSON.stringify(options),
        },
      },
      "/stays" // hide query from url
    );
  };

  return (
    <div
      className={`${className} gradientBooking relative mx-2 mt-6 flex h-auto flex-col items-center rounded-md border border-orangeMain 
    pb-4 font-body text-base font-medium sm:mx-12 lg:absolute lg:left-0 lg:right-0 lg:m-auto lg:mt-0 lg:h-14 lg:w-full lg:max-w-6xl lg:-translate-y-2/4 lg:flex-row lg:items-center lg:pb-0`}
    >
      <div
        className="relative flex w-auto flex-col 
     justify-around lg:h-full lg:w-full lg:flex-row lg:items-center"
      >
        <div className="flex h-full grow items-center space-x-2 border-b border-dotted border-white/50 px-4 lg:justify-center lg:border-b-0 lg:border-r lg:border-solid lg:border-r-orangeMain lg:px-0">
          <BuildingOffice2Icon className="my-4 h-6 w-6 text-white/50 lg:my-0" />
          <Input
            variant="inputBooking"
            type="text"
            name="city"
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Where are you going?"
            label="votre nom"
            className="my-4 lg:my-0"
            ref={inputRef}
          />
        </div>
        <div
          className="relative flex h-full grow items-center space-x-2 border-b border-dotted border-white/50 px-4 lg:justify-center lg:border-b-0 lg:border-r lg:border-solid 
          lg:border-r-orangeMain lg:px-0"
        >
          <CalendarDaysIcon className="my-4 h-6 w-6 text-white/50 lg:my-0" />
          <p
            className={`${
              openDate && "pointer-events-none"
            } my-4 cursor-pointer lg:my-0`}
            onClick={() => setOpenDate(!openDate)}
          >{`${
            format(dates[0].startDate, "dd/MM/yyyy") +
            " to " +
            format(dates[0].endDate, "dd/MM/yyyy")
          }`}</p>
          {openDate && (
            <div
              className={`absolute -right-7 z-10 flex items-center lg:-right-3 lg:top-14`}
            >
              <OutsideClick setIsOpen={setOpenDate}>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item: any) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                  rangeColors={["#F44A1F"]}
                  className="rounded-md"
                />
              </OutsideClick>
            </div>
          )}
        </div>
        <div className="flex h-full w-auto grow flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
          <div className="flex items-center space-x-2 border-b border-dotted border-white/50 px-4 lg:border-none lg:px-0">
            <UserIcon className="my-4 h-6 w-6 text-white/50 lg:my-0" />
            <div
              className={`${
                showModal && "pointer-events-none"
              } flex cursor-pointer items-center space-x-2`}
              onClick={() => setShowModal(true)}
            >
              <p className={`my-4 lg:my-0`}>
                {options.adult === 1
                  ? `${options.adult} Adult`
                  : `${options.adult} Adults `}{" "}
                • {options.children} children •{" "}
                {options.room === 1
                  ? `${options.room} room`
                  : `${options.room} rooms `}
              </p>
              {showModal ? (
                <ChevronUpIcon className="my-4 h-5 w-5 cursor-pointer text-white/50" />
              ) : (
                <ChevronDownIcon className="my-4 h-5 w-5 cursor-pointer text-white/50" />
              )}
            </div>
          </div>
          <Button
            size="long"
            variant="solid"
            children="Search"
            className="w-2/3 lg:w-36"
            onClick={handleSearch}
          />
        </div>
        <CompFamModal
          invisible={showModal}
          onClose={setShowModal}
          options={options}
          setOptions={setOptions}
        />
      </div>
    </div>
  );
};

const BookingBarFilters: React.FunctionComponent<IBookingBarProps> = ({
  className,
}) => {
  const router = useRouter();
  const [openDate, setOpenDate] = useState(false);
  const [data, setData] = useState<IData>({
    city: "",
    min: null,
    max: null,
  });

  const [showModal, setShowModal] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (name: keyof IData, value: string): void => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSearch = () => {
    // TODO: save in redux
    let dateForm = {
      startDate: format(dates[0].startDate, "dd-MM-yyyy"),
      endDate: format(dates[0].endDate, "dd-MM-yyyy"),
      key: dates[0].key,
    };
    router.push(
      {
        pathname: "/stays",
        query: {
          destination: data.city,
          dates: JSON.stringify(dateForm),
          options: JSON.stringify(options),
        },
      },
      "/stays" // hide query from url
    );
  };

  return (
    <div
      className={`${className} gradientBooking relative mb-6 flex h-auto w-full flex-col items-center rounded-md border border-orangeMain pb-4 font-body text-base 
  font-medium lg:sticky lg:top-28 lg:mx-12 lg:w-[350px]`}
    >
      <div
        className="relative flex w-auto flex-col 
     justify-around"
      >
        <div className="flex h-full grow items-center space-x-2 border-b border-dotted border-white/50 px-4">
          <BuildingOffice2Icon className="my-4 h-6 w-6 text-white/50" />
          <Input
            variant="inputBooking"
            type="text"
            name="city"
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Where are you going?"
            label="votre nom"
            className="my-4"
            ref={inputRef}
          />
        </div>
        <div className="relative flex h-full grow items-center space-x-2 border-b border-dotted border-white/50 px-4">
          <CalendarDaysIcon className="my-4 h-6 w-6 text-white/50" />
          <p
            className={`${
              openDate && "pointer-events-none"
            } my-4 cursor-pointer`}
            onClick={() => setOpenDate(!openDate)}
          >{`${
            format(dates[0].startDate, "dd/MM/yyyy") +
            " to " +
            format(dates[0].endDate, "dd/MM/yyyy")
          }`}</p>
        </div>
        {openDate && (
          <div className={`static -right-7 top-16 z-10 flex items-center`}>
            <OutsideClick setIsOpen={setOpenDate}>
              <DateRange
                editableDateInputs={true}
                onChange={(item: any) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
                rangeColors={["#F44A1F"]}
                className="rounded-md"
              />
            </OutsideClick>
          </div>
        )}
        <div className="flex h-full w-auto flex-col items-center space-y-4">
          <div className="flex w-full space-x-2 border-b border-dotted border-white/50 px-4">
            <UserIcon className="my-4 h-6 w-6 text-white/50" />
            <div
              className={`${
                showModal && "pointer-events-none"
              } flex cursor-pointer items-center space-x-2`}
              onClick={() => setShowModal(true)}
            >
              <p className={`my-4`}>
                {options.adult === 1
                  ? `${options.adult} Adult`
                  : `${options.adult} Adults `}{" "}
                • {options.children} children •{" "}
                {options.room === 1
                  ? `${options.room} room`
                  : `${options.room} rooms `}
              </p>
              {showModal ? (
                <ChevronUpIcon className="my-4 h-5 w-5 cursor-pointer text-white/50" />
              ) : (
                <ChevronDownIcon className="my-4 h-5 w-5 cursor-pointer text-white/50" />
              )}
            </div>
          </div>
          <CompFamModal
            invisible={showModal}
            onClose={setShowModal}
            options={options}
            setOptions={setOptions}
            className="!static"
          />
          <div className="flex h-full w-full grow flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-dotted border-white/50 px-4 pb-4">
              <div className="flex items-center space-x-2">
                <p className="font-heading text-2xl font-thin text-white/50">
                  $-
                </p>
                <p>Min price per night</p>
              </div>
              <Input
                name="min"
                type="number"
                onChange={(e) => handleChange("min", e.target.value)}
                className="w-16"
                rounded="rounded-sm"
              />
            </div>
          </div>
          <div className="flex h-full w-full grow flex-col ">
            <div className="flex items-center justify-between space-x-4 border-b border-dotted border-white/50 px-4 pb-4">
              <div className="flex items-center space-x-2">
                <p className="font-heading text-2xl font-thin text-white/50">
                  $+
                </p>
                <p>Max price per night</p>
              </div>
              <Input
                name="min"
                type="number"
                onChange={(e) => handleChange("max", e.target.value)}
                className="w-16"
                rounded="rounded-sm"
              />
            </div>
          </div>
          <Button
            size="long"
            variant="solid"
            children="Search"
            className="w-2/3"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

const BookingBar: React.FunctionComponent<IBookingBarProps> = ({
  className,
  variant,
}) => {
  switch (variant) {
    case "bookingBarFilters":
      return <BookingBarFilters className={className} />;

    case "bookingBarClassic":
    default:
      return <BookingBarClassic className={className} />;
  }
};

export default BookingBar;
