import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import HeadSEO from "../components/HeadSEO";
import siteMetadata from "../data/siteMetadata";
import BookingBar from "../components/BookingBar";
import { Hotel } from "../types";
import StaysCard from "../components/StaysCard";
import { getUser } from "../lib/getUser-ssr";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDatesState,
  selectDestinationState,
  selectOptionsState,
  setDatesState,
  setDestinationState,
  setOptionsState,
} from "../store/travelSlice";
import { GetServerSideProps } from "next";
import { wrapper } from "../store/store";
import { fetchGetJSON } from "../utils/helpers/api-helpers";
import Footer from "../components/Footer";
import Radio from "../components/Form/Radio";
import { usePathname, useSearchParams } from "next/navigation";
const Loading = dynamic(() => import("../components/Loading"), { ssr: false });

interface IStaysProps {}

const Stays: React.FunctionComponent<IStaysProps> = ({}) => {
  const [properties, setProperties] = useState<Hotel[]>(null);
  const destinationState = useSelector(selectDestinationState);
  const datesState = useSelector(selectDatesState);
  const optionsState = useSelector(selectOptionsState);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);
  const sorts = ["none", "asc", "desc"];
  const [checkedStateChoix, setCheckedStateChoix] = useState<number>(0);
  const destinationQuery = searchParams.get("destination");
  const datesQuery = searchParams.get("dates");
  const optionsQuery = searchParams.get("options");
  const minQuery = searchParams.get("min");
  const maxQuery = searchParams.get("max");
  const typeQuery = searchParams.get("type");

  // Session Storate
  const DestinationQuery = useMemo(() => {
    dispatch(setDestinationState(destinationQuery ?? destinationState));
    dispatch(setDatesState(datesQuery ?? datesState));
    dispatch(setOptionsState(optionsQuery ?? optionsState));
  }, [
    destinationQuery,
    datesQuery,
    optionsQuery,
    minQuery,
    maxQuery,
    typeQuery,
  ]);

  useEffect(() => {
    setIsLoadingProperties(true);
    const getStays = async () => {
      const response = await fetchGetJSON(
        `/api/getStays?destination=${destinationQuery ?? destinationState}${
          typeof minQuery !== "undefined" && typeof minQuery != "object"
            ? "&min=" + minQuery
            : "&min="
        }${
          typeof maxQuery !== "undefined" && typeof maxQuery != "object"
            ? "&max=" + maxQuery
            : "&max="
        }${
          typeof typeQuery !== "undefined" && typeof typeQuery != "object"
            ? "&type=" + typeQuery
            : "&type="
        }`
      );
      return response;
    };

    const hotels = getStays();
    hotels.then(function (result) {
      if (checkedStateChoix === 0) {
        setProperties(result);
      } else if (checkedStateChoix === 1) {
        let hotels = result.sort((a, b) => {
          return a.cheapestPrice - b.cheapestPrice;
        });
        setProperties(hotels);
      } else {
        let hotels = result.sort((a, b) => {
          return a.cheapestPrice - b.cheapestPrice;
        });
        setProperties(hotels.reverse());
      }
      setIsLoading(false);
      setIsLoadingProperties(false);
    });
  }, [
    checkedStateChoix,
    destinationQuery,
    datesQuery,
    optionsQuery,
    minQuery,
    maxQuery,
    typeQuery,
  ]);

  useEffect(() => {
    if (destinationQuery === destinationState) setIsLoading(false);
  }, [
    destinationQuery,
    datesQuery,
    optionsQuery,
    minQuery,
    maxQuery,
    typeQuery,
  ]);

  const OrderBy = ({ className }) => {
    return (
      <div className={`flex items-center justify-center ${className} text-sm`}>
        <fieldset className="flex rounded-md border border-orangeMain px-4 pb-1">
          <legend className="text-center">
            <h3 className="px-4">Order By</h3>
          </legend>
          {sorts.map((sort, index) => (
            <li key={`${sort}-${index}`} className="list-none">
              <Radio
                name={sort}
                label={sort}
                wrapperClassName={`mx-2`}
                checkedStateChoix={checkedStateChoix}
                setCheckedStateChoix={setCheckedStateChoix}
                index={index}
                defaultChecked={checkedStateChoix === index ? true : false}
              />
            </li>
          ))}
        </fieldset>
      </div>
    );
  };
  return (
    <div className={`h-screen`}>
      <HeadSEO
        title={`Stays | ${siteMetadata.siteUrl}`}
        description="Holi'D Stays Page, Check you bookings, looks for holidays"
        ogType="Stays"
        canonicalUrl={`${siteMetadata.siteUrl}${pathname}`}
      />
      <Header />
      <main className="mb-8">
        <Banner variant="bookingBarFilters" hiddenBook />

        <section className="gutters mt-8 h-auto lg:!mt-36 lg:flex">
          <div>
            <BookingBar
              variant="bookingBarFilters"
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
          <OrderBy className="pb-8 lg:hidden" />
          <div className="pb-2">
            <div className="relative">
              <OrderBy className="absolute left-0 z-40 hidden -translate-y-28 lg:block" />

              {isLoadingProperties ? (
                <Loading className="flex w-full justify-center" />
              ) : properties?.length > 0 ? (
                properties?.map((property) => (
                  <StaysCard property={property} key={property._id} />
                ))
              ) : (
                <p className="text-center">
                  Unfortunately, we do not have any accommodation in this city.
                  <br /> Try Paris, Brussels, Spring Rises instead
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Stays;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res } = context;

    const [error, user] = await getUser(req, res);
    // if (!user) return { redirect: { statusCode: 307, destination: "/" } };

    return {
      props: {
        user: user,
      },
    };
  });
