import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import HeadSEO from "../../components/HeadSEO";
import siteMetadata from "../../data/siteMetadata";
import Footer from "../../components/Footer";
import { getUser } from "../../lib/getUser-ssr";
import { GetServerSideProps } from "next";
import { wrapper } from "../../store/store";
import { useRouter } from "next/router";
import { Hotel } from "../../types";
import axios from "axios";
import requests from "../../utils/requests";
import { BiArrowBack } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { BsCircleHalf } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterInWord,
} from "../../utils/helpers/stringTransform";
import Currency from "../../components/Currency";
import Button from "../../components/Button";
import Image from "next/image";
import ContentProperty from "../../components/ContentProperty";
import LocationScore from "../../components/LocationScore";
import BookingBar from "../../components/BookingBar";
import CardAdvisor from "../../components/CardAdvisor";
import { useSelector } from "react-redux";
import { selectDatesState } from "../../store/travelSlice";

interface IHotelProps {
  property: Hotel;
}

const Hotel: React.FunctionComponent<IHotelProps> = ({ property }) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const asterisks = [];

  for (let i = 0; i < property.rating; i++) {
    asterisks.push(
      <StarIcon
        className="!h4 mr-1 !w-4 text-orangeMain md:!h-5 md:!w-5"
        key={`stars-${i}`}
      />
    );
  }

  const bullets = [];
  let number = 4;
  if (number % 1 !== 0) {
    number -= 0.5;

    for (let i = 0; i < number; i++) {
      bullets.push(
        <BsCircleFill
          className="!h4 mr-1 !w-4 text-tripadv md:!h-4 md:!w-4"
          key={`bullets-${i}`}
        />
      );
    }
    bullets.push(
      <BsCircleHalf
        className="!h4 mr-1 !w-4 text-tripadv md:!h-4 md:!w-4"
        key={`demi`}
      />
    );
  } else {
    for (let i = 0; i < number; i++) {
      bullets.push(
        <BsCircleFill
          className="mr-1 !h-3 !w-3 text-tripadv lg:!h-4 lg:!w-4"
          key={`bullets-${i}`}
        />
      );
    }
  }

  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? property.photos.length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= property.photos.length ? 0 : newIndex);
  };
  return (
    <div className={`h-screen`}>
      <HeadSEO
        title={`Hotel | ${siteMetadata.siteUrl}`}
        description="Holi'D hotelpage, Check you bookings, looks for holidays"
        ogType="Hotelpage"
        canonicalUrl={`${siteMetadata.siteUrl}`}
      />
      <Header />
      <main className="mb-8 lg:space-y-24">
        <Banner variant="bookingBarClassic" />

        <section className="gutters flex justify-center lg:mt-0">
          <div className="flex-1 lg:max-w-6xl">
            <div className="mb-6 mt-4 inline-block lg:mb-4 lg:mt-0">
              <Link href={"/stays"} className="flex items-center">
                <BiArrowBack />
                <span>Back to the hotel list</span>
              </Link>
            </div>
            <div className="flex flex-col justify-between lg:flex-row">
              <div>
                <h1 className="mb-2 font-heading text-xl font-semibold lg:text-2xl">
                  {property.name}
                </h1>
                <div className="mt-1 flex">{asterisks}</div>
                <div className="mt-2 flex items-center text-white/60">
                  <HiLocationMarker className="hidden h-6 w-6 lg:block" />
                  &nbsp;
                  <p>
                    {property.address},&nbsp;{" "}
                    {capitalizeFirstLetter(property.city)}
                    ,&nbsp;
                    {capitalizeFirstLetter(property.country)}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-end justify-between text-xl lg:flex-col lg:items-center">
                <div className="mt-6 lg:mt-0 lg:flex lg:flex-col lg:items-center">
                  <Currency
                    price={property.cheapestPrice}
                    currency="usd"
                    className="font-semibold"
                  />
                  <p className="includesTaxes !text-lg">Includes taxes</p>
                </div>
                <div className="mt-2">
                  <Button
                    size="long"
                    variant="solid"
                    children="Reserve"
                    className="w-2/3"
                    // onClick={handleSearch}
                    // isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
            <div className="relative mt-8">
              <div className="absolute flex h-full w-full items-center justify-between">
                <ChevronLeftIcon
                  className="z-40 ml-4 h-10 w-10 cursor-pointer lg:h-12 lg:w-12"
                  onClick={handlePrevious}
                />
                <ChevronRightIcon
                  className="z-40 mr-4 h-10 w-10 cursor-pointer lg:h-12 lg:w-12"
                  onClick={handleNext}
                />
              </div>
              <Image
                src={property.photos[index].url}
                alt="hotel image"
                fill
                className="!relative !h-[350px] !w-full object-cover lg:!h-[500px]"
                placeholder="blur"
                blurDataURL={property.photos[index].url}
              />
            </div>
            <div className="mt-8">
              <article>
                <h2 className="font-heading text-2xl font-normal tracking-wider">
                  {capitalizeFirstLetterInWord(property.title)}
                </h2>
                <div className="flex flex-col lg:flex-row">
                  <div className="mt-8 basis-2/3 text-justify font-body text-xl leading-7 tracking-wider">
                    <ContentProperty string={property.desc} />
                  </div>
                  <div className="basis-1/3">
                    <LocationScore city={property.city} />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="gutters !mt-8 flex justify-center">
          <div className="flex-1 lg:max-w-6xl">
            <h2 className="title1">Availability</h2>
            <BookingBar variant="bookingBarAvailability" />
          </div>
        </section>
        <section className="gutters !mt-8 flex justify-center">
          <div className="flex-1 lg:max-w-6xl">
            <div className="flex space-x-2">
              <h2 className="title1">Tripadvisor</h2>
              <span className="relative bottom-3">
                <Image
                  src="/tripadvisor.svg"
                  alt="logo"
                  width={25}
                  height={25}
                  className="inline-block h-4 w-4 lg:h-6 lg:w-6"
                />
              </span>
            </div>
            <div className="mb-6">
              <p className="mb-2 flex items-center gap-2 font-medium">
                Average rating: <span className="flex">{bullets}</span>
              </p>
              <p className="text-base font-extralight">Total review: 486</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <CardAdvisor />
              <CardAdvisor />
              <CardAdvisor />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Hotel;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res } = context;
    const [error, user] = await getUser(req, res);

    try {
      const response = await axios.get(
        `${requests.fetchProperty}${context.query.slug}`,
        {
          withCredentials: true,
        }
      );
      const property = await response.data;

      return {
        props: {
          user,
          property,
        },
      };
    } catch (error) {
      return { notFound: true };
    }
  });