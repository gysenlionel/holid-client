import React, { Suspense, useEffect, useMemo, useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import HeadSEO from "../components/HeadSEO";
import siteMetadata from "../data/siteMetadata";
import { useRouter } from "next/router";
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
import Loading from "../components/Loading";

interface IStaysProps {}

const Stays: React.FunctionComponent<IStaysProps> = ({}) => {
  const [properties, setProperties] = useState<Hotel[]>(null);
  const destinationState = useSelector(selectDestinationState);
  const datesState = useSelector(selectDatesState);
  const optionsState = useSelector(selectOptionsState);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);
  const sorts = ["none", "asc", "desc"];
  const [checkedStateChoix, setCheckedStateChoix] = useState<number>(0);

  // Session Storate
  const DestinationQuery = useMemo(() => {
    dispatch(setDestinationState(query.destination ?? destinationState));
    dispatch(setDatesState(query.dates ?? datesState));
    dispatch(setOptionsState(query.options ?? optionsState));
  }, [query]);
  useEffect(() => {
    setIsLoadingProperties(true);
    const getStays = async () => {
      const response = await fetchGetJSON(
        `/api/getStays?destination=${destinationState}${
          typeof query.min !== "undefined" ? "&min=" + query.min : "&min="
        }${typeof query.max !== "undefined" ? "&max=" + query.max : "&max="}${
          typeof query.type !== "undefined" ? "&type=" + query.type : "&type="
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
  }, [checkedStateChoix, query]);

  useEffect(() => {
    if (query.destination === destinationState) setIsLoading(false);
  }, [query]);

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
        canonicalUrl={`${siteMetadata.siteUrl}${router.pathname}`}
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
