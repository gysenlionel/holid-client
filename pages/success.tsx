import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { fetchLineItems } from "../utils/helpers/fetchLineItems";
import { StripeProduct } from "../types";
import { GetServerSideProps } from "next";
import { wrapper } from "../store/store";
import { useRouter } from "next/router";
import HeadSEO from "../components/HeadSEO";
import siteMetadata from "../data/siteMetadata";
import { getUser } from "../lib/getUser-ssr";
import { IUser } from "../types/user";
import Link from "next/link";
import Image from "next/image";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";
import Currency from "../components/Currency";

interface ISuccessProps {
  products: StripeProduct[];
  user: IUser;
}

const Success: React.FunctionComponent<ISuccessProps> = ({
  user,
  products,
}) => {
  const router = useRouter();
  const { session_id } = router.query;
  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  );

  return (
    <div className={`h-screen`}>
      <HeadSEO
        title={`Thank you | ${siteMetadata.siteUrl}`}
        description="Holi'D success page, Payment confirmation"
        ogType="Successpage"
        canonicalUrl={`${siteMetadata.siteUrl}`}
      />
      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section
          className="order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 
        lg:pt-16 xl:pl-16 2xl:pl-44"
        >
          <Link href="/">
            <div className="relative ml-14 hidden h-24 w-12 cursor-pointer transition lg:inline-flex">
              <Image
                src="/logo.svg"
                alt="logo"
                width={200}
                height={200}
                className="max-w-none cursor-pointer object-contain"
              />
            </div>
          </Link>
          <div className="my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full border
                border-white"
            >
              <CheckIcon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-white/60">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">Thank you {user.firstname}</h4>
            </div>
          </div>
          <div
            className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 
          p-4 lg:ml-14"
          >
            <div className="space-y-2 pb-3">
              <p>Your order is confirmed</p>
              <p className="text-sm text-white/60">
                W've accepted your reservation and we will process it as quickly
                as possible.
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p className="pb-3 font-medium text-white">Order information</p>
              <p className="text-white/60">
                A confirmation email will be sent to you as soon as possible
              </p>
            </div>
          </div>
          <div
            className="mx-4 flex flex-col items-center gap-4 pt-8 text-sm lg:ml-14 
          lg:flex-row"
          >
            <p className="hidden lg:inline">Need help ? Contact us</p>
            {mounted && (
              <Button
                children="Back To Home"
                onClick={() => router.push("/")}
                size={`${isTabletOrMobile ? "full" : "long"}`}
                className={`${isTabletOrMobile && "py-2"}`}
                variant="solid"
              />
            )}
          </div>
        </section>
        {mounted && (
          <section
            className=" border-y border-gray-300 lg:order-2 
          lg:col-span-4 lg:h-screen lg:border-y-0 lg:border-l"
          >
            <div
              className={`w-full border-b border-gray-300 py-4 ${
                !isTabletOrMobile && "hidden"
              }`}
            >
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                className="max-w-none cursor-pointer object-contain"
              />
            </div>
            <div
              className={`w-full ${showOrderSummaryCondition && "border-b"} 
            border-gray-300 text-sm lg:hidden`}
            >
              <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
                <button
                  onClick={handleShowOrderSummary}
                  className="flex items-center space-x-2"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
                <p className="text-xl font-medium">
                  <Currency
                    price={products[0].amount_total / 100}
                    currency="usd"
                  />
                </p>
              </div>
            </div>
            {showOrderSummaryCondition && (
              <div
                className="mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 
              lg:max-w-lg lg:px-10 lg:py-16"
              >
                <div className="space-y-4 pb-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center text-sm font-medium"
                    >
                      <div
                        className="relative flex h-16 w-16 items-center justify-center 
                      rounded-md border border-gray-300 bg-[#f1f1f1] text-xs text-white"
                      >
                        <div className="relative h-7 w-7 animate-bounce ">
                          <Image
                            src={"/logo.svg"}
                            alt="product"
                            width={100}
                            height={100}
                            className="object-contain"
                          />
                        </div>
                        <div
                          className="absolute -right-2 -top-2 flex h-5 w-5 items-center
                         justify-center rounded-full bg-[gray] text-xs"
                        >
                          {product.quantity}
                        </div>
                      </div>
                      <p className="ml-4 flex-1">{product.description}</p>
                      <p>
                        <Currency
                          price={product.price.unit_amount / 100}
                          currency={product.currency}
                        />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 py-4">
                  <div className="flex justify-between text-sm">
                    <p className="text-white/60">Subtotal</p>
                    <p className="font-medium">
                      <Currency price={subtotal} currency="usd" />
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-white/60">Discount</p>
                    <p className="text-white/60"></p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p>Total</p>
                  <p className="flex items-center gap-x-2 text-xs text-white/60">
                    USD
                    <span className="text-xl font-medium text-white">
                      <Currency
                        price={products[0].amount_total / 100}
                        currency="usd"
                      />
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res, query } = context;
    const [error, user] = await getUser(req, res);
    if (!user) return { redirect: { statusCode: 307, destination: "/" } };
    const sessionId = query.session_id as string;
    const products = await fetchLineItems(sessionId);

    console.log(products);
    return {
      props: {
        user,
        products,
      },
    };
  });
