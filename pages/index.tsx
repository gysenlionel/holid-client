import React, { useState } from "react";
import Banner from "../components/Banner";
import Input from "../components/Form/Input";
import Header from "../components/Header";
import HeadSEO from "../components/HeadSEO";
import siteMetadata from "../data/siteMetadata";
import Hero from "../components/Hero";
import CardExplore from "../components/CardExplore";
import requests from "../utils/requests";
import { Hotel, PropertyTypes } from "../types";
import axios from "axios";
import PropertyType from "../components/PropertyType";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { getUser } from "../lib/getUser-ssr";
import { GetServerSideProps } from "next";
import { wrapper } from "../store/store";

interface IIndexProps {
  caribbeanHotels: Hotel[];
  propertyTypes: PropertyTypes[];
}

const Home: React.FunctionComponent<IIndexProps> = ({
  caribbeanHotels,
  propertyTypes,
}) => {
  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <div className={`h-screen lg:h-[140vh]`}>
      <HeadSEO
        title={`Home | ${siteMetadata.siteUrl}`}
        description="Holi'D homepage, Check you bookings, looks for holidays"
        ogType="Homepage"
        canonicalUrl={`${siteMetadata.siteUrl}`}
      />
      <Header />
      <main className="mb-8 lg:space-y-24">
        <Banner variant="bookingBarClassic" />
        <section className="gutters mt-10 flex justify-center lg:mt-0">
          <div className="flex-1 lg:max-w-6xl">
            <Hero />
            <div className="mt-10">
              <h1 className="title1">Explore the Caribbean</h1>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {caribbeanHotels.map((caribbeanHotel) => (
                  <CardExplore
                    caribbeanHotel={caribbeanHotel}
                    key={caribbeanHotel._id}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="gutters relative mt-10 flex justify-center lg:!mt-16">
          <div className=" flex-1 lg:max-w-6xl">
            <h1 className="title1">Browse By Property Type</h1>
            <div className="absolute right-0 left-0 lg:max-w-6xl xl:mx-auto">
              <PropertyType propertyTypes={propertyTypes} />
            </div>
          </div>
        </section>
        <div className="gutters relative !mt-80 flex justify-center lg:!mt-96 ">
          <div className="max-w-[350px] text-center">
            <h1 className="title1 !font-medium !text-white">
              Sign Up And We'll Send The Best Deals To You
            </h1>
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
              <Input
                name="email"
                type="email"
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Your email address"
                className="mt-1"
                rounded="rounded-sm"
                errors={""}
              />
              <Button
                size="long"
                children="Subscribe"
                className="mt-2 sm:ml-4 sm:mt-0"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res } = context;
    const [caribbeanHotels, propertyTypes] = await Promise.all([
      axios
        .get(requests.fetchCaribbeanHotels, { withCredentials: true })
        .then((res) => res.data),
      axios
        .get(requests.fetchPropertyTypes, { withCredentials: true })
        .then((res) => res.data),
    ]);

    const [error, user] = await getUser(req, res);

    // use redux-persist in server-side:
    // await store.dispatch(setTravelState(false));
    // console.log("State on server", store.getState());

    return {
      props: {
        caribbeanHotels: caribbeanHotels,
        propertyTypes: propertyTypes,
        user,
        // travelState: false,
        // destintaion: null
      },
    };
  });
