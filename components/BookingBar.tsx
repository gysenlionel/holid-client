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
import { useSelector } from "react-redux";
import {
  selectDatesState,
  selectDestinationState,
  selectOptionsState,
} from "../store/travelSlice";
import { stringToDate } from "../utils/helpers/transformToDate";
import { ParsedUrlQuery } from "querystring";
import { usePathname, useRouter } from "next/navigation";

interface IBookingBarProps {
  className?: string;
  variant?:
    | "bookingBarFilters"
    | "bookingBarAvailability"
    | "bookingBarClassic";
  isLoading?: boolean;
  query?: ParsedUrlQuery;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IData {
  city: string;
  min: number | "";
  max: number | "";
}

const BookingBarClassic: React.FunctionComponent<IBookingBarProps> = ({
  className,
  query,
}) => {
  const router = useRouter();
  const datesState = useSelector(selectDatesState);
  const optionsState = JSON.parse(useSelector(selectOptionsState));
  const destinationState = useSelector(selectDestinationState);

  // Split date string to convert in date time
  const { startDate, endDate } = stringToDate(datesState);
  const [openDate, setOpenDate] = useState(false);
  const [data, setData] = useState({
    city: destinationState == null ? "" : destinationState,
  });

  const [showModal, setShowModal] = useState(false);
  const [showModalCompMobile, setShowModalCompMobile] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: optionsState.adult,
    children: optionsState.children,
    room: optionsState.room,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (query?.destination) {
      setData({
        city:
          typeof query?.destination == null
            ? ""
            : (query?.destination as string),
      });
    }

    if (query?.options) {
      setOptions({
        adult: JSON.parse(query?.options as string)?.adult,
        children: JSON.parse(query?.options as string)?.children,
        room: JSON.parse(query?.options as string)?.room,
      });
    }

    if (query?.dates) {
      const { startDate, endDate } = stringToDate(query?.dates as string);
      setDates([
        {
          startDate: startDate,
          endDate: endDate,
          key: "selection",
        },
      ]);
    }
  }, [query]);

  const handleChange = (name: keyof IData, value: string): void => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSearch = () => {
    let dateForm = {
      startDate: format(dates[0].startDate, "dd-MM-yyyy"),
      endDate: format(dates[0].endDate, "dd-MM-yyyy"),
      key: dates[0].key,
    };
    router.push(
      `/stays?destination=${data.city}&dates=${JSON.stringify(
        dateForm
      )}&options=${JSON.stringify(options)}`
    );
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <div
      className={`${className} gradientBooking relative mx-2 mt-6 flex h-auto flex-col items-center rounded-md border border-orangeMain 
    pb-4 font-body text-base font-medium sm:mx-12 lg:absolute lg:left-0 lg:right-0 lg:m-auto lg:mt-0 lg:h-14 lg:w-full lg:max-w-6xl lg:-translate-y-2/4 lg:flex-row lg:items-center lg:pb-0`}
    >
      <div
        className="relative flex w-auto flex-col 
     justify-around lg:h-full lg:w-full lg:flex-row lg:items-center"
      >
        <div className="flex h-full grow items-center border-b border-dotted border-white/50 px-4 lg:justify-center lg:space-x-2 lg:border-b-0 lg:border-r lg:border-solid lg:border-r-orangeMain lg:px-0">
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
            // defaultValue={destinationState}
            value={data["city"]}
          />
        </div>
        <div
          className="relative  flex h-full max-w-[17rem] grow flex-col items-start space-x-2 border-b border-dotted border-white/50 px-4 lg:w-auto lg:items-center lg:justify-center lg:border-b-0 lg:border-r lg:border-solid 
          lg:border-r-orangeMain lg:px-0"
        >
          <div className="flex items-center space-x-2">
            <CalendarDaysIcon className="my-4 h-6 w-6 text-white/50 lg:my-0" />
            {domLoaded ? (
              <p
                data-testid="date-picker"
                className={`${
                  openDate && "pointer-events-none"
                } my-4 cursor-pointer lg:my-0`}
                onClick={() => setOpenDate(!openDate)}
              >{`${
                format(dates[0].startDate, "dd/MM/yyyy") +
                " to " +
                format(dates[0].endDate, "dd/MM/yyyy")
              }`}</p>
            ) : (
              <div role="status" className="max-w-lg animate-pulse space-y-2.5">
                <div className="flex w-full items-center space-x-2">
                  <div className="h-2.5 w-36 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>
            )}
          </div>

          {openDate && (
            <div
              className={`relative -left-[3rem] z-10 lg:absolute lg:-left-2 lg:top-14`}
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
            {domLoaded ? (
              <div
                data-testid="compFam"
                className={`${
                  showModal && "pointer-events-none"
                } flex cursor-pointer items-center space-x-2`}
                onClick={() => {
                  setShowModal(true);
                  setShowModalCompMobile(true);
                }}
              >
                <p className={`my-4 lg:my-0`}>
                  {(options && options.adult === 1) ||
                  typeof options.adult == "undefined"
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
            ) : (
              <div role="status" className="max-w-lg animate-pulse space-y-2.5">
                <div className="flex w-full items-center space-x-2">
                  <div className="h-2.5 w-44 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>
            )}
          </div>
          <CompFamModal
            invisible={showModalCompMobile}
            onClose={setShowModalCompMobile}
            options={options}
            setOptions={setOptions}
            className="!static lg:hidden"
            classNameOutside="lg:hidden"
          />
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
          className="hidden lg:block"
          isClassic
          classicClass="!w-72"
        />
      </div>
    </div>
  );
};

const BookingBarFilters: React.FunctionComponent<IBookingBarProps> = ({
  className,
  isLoading,
  setIsLoading,
}) => {
  const destinationState = useSelector(selectDestinationState);
  const datesState = useSelector(selectDatesState);
  const optionsState = useSelector(selectOptionsState);
  const router = useRouter();
  const [openDate, setOpenDate] = useState(false);
  const [data, setData] = useState<IData>({
    city: destinationState == null ? "" : destinationState,
    min: "",
    max: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Split date string to convert in date time
  const { startDate, endDate } = stringToDate(datesState);

  const [dates, setDates] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: JSON.parse(optionsState).adult,
    children: JSON.parse(optionsState).children,
    room: JSON.parse(optionsState).room,
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
    setIsLoading(true);
    let dateForm = {
      startDate: format(dates[0].startDate, "dd-MM-yyyy"),
      endDate: format(dates[0].endDate, "dd-MM-yyyy"),
      key: dates[0].key,
    };
    router.replace(
      `/stays?destination=${data.city}&dates=${JSON.stringify(
        dateForm
      )}&options=${JSON.stringify(options)}&min=${data.min}&max=${
        data.max
      }&isLoading=${isLoading}`
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
            className="my-4"
            ref={inputRef}
            // defaultValue={destinationState}
            value={data["city"]}
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
                className="ml-0 w-20"
                rounded="rounded-sm"
                defaultValue={data.min}
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
                className="ml-0 w-20"
                rounded="rounded-sm"
                defaultValue={data.max}
              />
            </div>
          </div>
          <Button
            size="long"
            variant="solid"
            children="Search"
            className="w-2/3"
            onClick={handleSearch}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

const BookingBarAvailability: React.FunctionComponent<IBookingBarProps> = ({
  className,
}) => {
  const datesState = useSelector(selectDatesState);
  const optionsState = JSON.parse(useSelector(selectOptionsState));
  const router = useRouter();
  const pathname = usePathname();
  const [openDate, setOpenDate] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Split date string to convert in date time
  const { startDate, endDate } = stringToDate(datesState);

  const [dates, setDates] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: optionsState.adult,
    children: optionsState.children,
    room: optionsState.room,
  });

  const handleSearch = () => {
    let dateForm = {
      startDate: format(dates[0].startDate, "dd-MM-yyyy"),
      endDate: format(dates[0].endDate, "dd-MM-yyyy"),
      key: dates[0].key,
    };

    router.push(
      `${pathname}?dates=${JSON.stringify(dateForm)}&options=${JSON.stringify(
        options
      )}`
    );
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div
      className={`${className} gradientBooking relative mt-6 flex h-auto  flex-col rounded-md border 
    border-orangeMain pb-4 font-body text-base font-medium lg:h-14 lg:max-w-max lg:flex-row lg:pb-0`}
    >
      <div
        className="relative flex flex-col 
         items-center lg:h-full lg:w-full lg:flex-row lg:items-center"
      >
        <div
          className="relative flex w-[17rem] flex-col space-x-2 border-b border-dotted border-white/50 px-4 max-[285px]:w-auto lg:h-full lg:w-auto lg:items-center lg:justify-center 
          lg:border-b-0 lg:border-r lg:border-solid lg:border-r-orangeMain lg:px-10"
        >
          <div className="flex items-center space-x-2">
            <CalendarDaysIcon className="my-4 h-6 w-6 text-white/50 lg:my-0" />
            {domLoaded ? (
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
            ) : (
              <div role="status" className="max-w-lg animate-pulse space-y-2.5">
                <div className="flex w-full items-center space-x-2">
                  <div className="h-2.5 w-36 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>
            )}
          </div>
          {openDate && (
            <div
              className={`relative -left-14 z-10 lg:absolute lg:-left-2 lg:top-14`}
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
        <div className="flex h-full w-auto grow flex-col items-center justify-center space-y-4 lg:flex-row lg:space-y-0 lg:pr-10">
          <div className="flex items-center space-x-2 border-b border-dotted border-white/50 px-4 lg:border-none lg:px-10">
            <UserIcon className="my-4 h-6 w-6 text-white/50 lg:my-0" />
            {domLoaded ? (
              <div
                className={`${
                  showModal && "pointer-events-none"
                } flex cursor-pointer items-center space-x-2`}
                onClick={() => setShowModal(true)}
              >
                <p className={`my-4 lg:my-0`}>
                  {options.adult === 1 || typeof options.adult == "undefined"
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
            ) : (
              <div role="status" className="max-w-lg animate-pulse space-y-2.5">
                <div className="flex w-full items-center space-x-2">
                  <div className="h-2.5 w-44 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>
            )}
          </div>
          <CompFamModal
            invisible={showModal}
            onClose={setShowModal}
            options={options}
            setOptions={setOptions}
            className="!static w-[17rem] max-[320px]:w-full lg:!absolute"
          />
          <Button
            size="long"
            variant="solid"
            children="Change search"
            className="w-2/3 lg:w-36"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

const BookingBar: React.FunctionComponent<IBookingBarProps> = ({
  className,
  isLoading,
  setIsLoading,
  variant,
  query,
}) => {
  switch (variant) {
    case "bookingBarFilters":
      return (
        <BookingBarFilters
          className={className}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );
    case "bookingBarAvailability":
      return (
        <BookingBarAvailability
          className={className}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );

    case "bookingBarClassic":
    default:
      return <BookingBarClassic className={className} query={query} />;
  }
};

export default BookingBar;
