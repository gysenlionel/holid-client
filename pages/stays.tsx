import React, { useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import HeadSEO from "../components/HeadSEO";
import siteMetadata from "../data/siteMetadata";
import { useRouter } from "next/router";
import BookingBar from "../components/BookingBar";
import axios from "axios";
import { Hotel } from "../types";
import StaysCard from "../components/StaysCard";
import { getUser } from "../lib/getUser-ssr";
import { environment } from "../lib/environment";

interface IStaysProps {
  properties: Hotel[];
}

const Stays: React.FunctionComponent<IStaysProps> = ({ properties }) => {
  const { query } = useRouter();
  const [destination, setDestination] = useState(
    (query.destination as string) ?? ""
  );

  const [dates, setDates] = useState(
    query.dates
      ? JSON.parse(query.dates as string)
      : [{ startDate: new Date(), endDate: new Date() }]
  );

  const [options, setOptions] = useState(
    query.options
      ? JSON.parse(query.options as string)
      : {
          adults: 1,
          children: 0,
          room: 1,
        }
  );
  console.log(properties);
  return (
    <div className={`h-screen lg:h-[340vh]`}>
      <HeadSEO
        title={`Stays | ${siteMetadata.siteUrl}`}
        description="Holi'D Stays Page, Check you bookings, looks for holidays"
        ogType="Stays"
        canonicalUrl={`${siteMetadata.siteUrl}`}
      />
      <Header />
      <main className="mb-8">
        <Banner variant="bookingBarFilters" hiddenBook />
        <section className="gutters !mt-8 h-[340vh] lg:flex">
          <div>
            <BookingBar variant="bookingBarFilters" />
          </div>
          <div className="">
            {properties.map((property) => (
              <StaysCard property={property} key={property._id} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stays;

export const getServerSideProps = async (context) => {
  // &min=${min}&max=${max}
  const properties = await axios.get(
    `${environment.apiUrl}/api/hotels?city=${context.query.destination}&min=550&max=550`,
    { withCredentials: true }
  );

  const { req, res } = context;

  const [error, user] = await getUser(req, res);
  console.log(user);
  // if (!user) return { redirect: { statusCode: 307, destination: "/" } };

  return {
    props: {
      properties: properties.data,
      user: user,
    },
  };
};
