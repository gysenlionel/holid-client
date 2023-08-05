import React from "react";
import HeadSEO from "../components/HeadSEO";
import siteMetadata from "../data/siteMetadata";
import Header from "../components/Header";
import { GetServerSideProps } from "next";
import { wrapper } from "../store/store";
import { getUser } from "../lib/getUser-ssr";
import axios from "axios";
import requests from "../utils/requests";
import { Booking } from "../types";
import CardHolidays from "../components/CardHolidays";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

interface IHolidaysProps {
  bookings: Booking[];
}

const Holidays: React.FunctionComponent<IHolidaysProps> = ({ bookings }) => {
  const router = useRouter();
  return (
    <div className="">
      <HeadSEO
        title={`Holidays | ${siteMetadata.siteUrl}`}
        description="Holi'D Holidays Page, Check you bookings, looks for holidays"
        ogType="Holidays"
        canonicalUrl={`${siteMetadata.siteUrl}${router.pathname}`}
      />
      <Header />
      <main
        className={`mt-24 mb-8 lg:mt-36 ${bookings.length < 1 && "h-[100vh]"}`}
      >
        <section className="gutters h-auto">
          <div className="flex justify-center">
            <div className={`${bookings.length >= 1 ? "" : "w-full"}`}>
              <h1 className="title1">Your Holidays</h1>
              {bookings.length >= 1 ? (
                bookings
                  .sort(
                    (a, b) =>
                      new Date(a.dates.startDate).valueOf() -
                      new Date(b.dates.startDate).valueOf()
                  )
                  .reverse()
                  .map((booking, index) => (
                    <CardHolidays booking={booking} key={index} />
                  ))
              ) : (
                <p className="text-center">You haven't booked a holiday yet</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Holidays;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res } = context;

    const [error, user] = await getUser(req, res);
    if (!user) return { redirect: { statusCode: 307, destination: "/" } };
    const response = await axios.get(`${requests.fetchBookings}${user._id}`, {
      withCredentials: true,
      headers: { cookie: req.headers.cookie },
    });
    const bookings = await response.data;

    return {
      props: {
        user,
        bookings,
      },
    };
  });
