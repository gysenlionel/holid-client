import React, { useState, useEffect } from "react";
import Input from "../Form/Input";
import Button from "../Button";
import ModalUi from "./ModalUi";
import { Toaster, toast } from "react-hot-toast";
import Currency from "../Currency";
import Checkbox from "../Form/Checkbox";
import { Hotel, Room, RoomNumbers } from "../../types";
import { getDatesInRange } from "../../utils/helpers/getDatesInRange";
import { fetchPostJSON } from "../../utils/helpers/api-helpers";
import Stripe from "stripe";
import getStripe from "../../utils/get-stripe";
import ErrorMessage from "../Form/ErrorMessage";

interface ILoginModalProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  rooms: Room[];
  days: number;
  startDate: Date;
  endDate: Date;
  userId: string;
  property: Hotel;
  optionsSate: string;
}

const ReserveModal: React.FunctionComponent<ILoginModalProps> = ({
  isShowModal,
  setIsShowModal,
  rooms,
  days,
  startDate,
  endDate,
  userId,
  property,
  optionsSate,
}) => {
  const [selectRooms, setSelectRooms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectRooms(
      checked
        ? [...selectRooms, value]
        : selectRooms.filter((item) => item !== value)
    );
  };

  const allDates = getDatesInRange(startDate, endDate);

  const isNotAvailable = (roomNumber: RoomNumbers): boolean => {
    let isFound = false;
    if (roomNumber.unavailableDates.length < 1) return (isFound = false);

    isFound = roomNumber.unavailableDates.some((date) => {
      if (allDates.includes(new Date(date).getTime())) return (isFound = true);
    });

    return isFound;
  };

  const handleReserve = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const totalPrice = (): number => {
      const prices: number[] = [];
      let totalPrice: number;
      selectRooms.map((selectRoom) => {
        rooms.map((room) => {
          room.roomNumbers.map((r) => {
            if (r._id === selectRoom) prices.push(room.price * days);
          });
        });
      });
      if (prices.length > 0)
        totalPrice = prices.reduce((curr, next) => curr + next);

      return totalPrice;
    };

    const items = [
      {
        name: property.name,
        price: totalPrice(),
        image: property.photos[0].url,
        hotelId: property._id,
        adult: JSON.parse(optionsSate).adult,
        children: JSON.parse(optionsSate).children,
        roomNumberId: selectRooms,
        userId: userId,
        allDates: allDates,
      },
    ];

    if (typeof totalPrice() === "undefined") {
      setIsLoading(false);
      return setError("* Please select a room.");
    }
    setError(null);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      {
        items: items,
      }
    );

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    } else if ((checkoutSession as any).statusCode === 400) {
      setIsLoading(false);
      return setError((checkoutSession as any).message);
    }

    // Redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);

    setIsLoading(false);
  };

  return (
    <ModalUi
      isShowModal={isShowModal}
      onClose={setIsShowModal}
      title="Select your room"
      className="!w-72 sm:!w-[30rem]"
    >
      <div>
        <div className="group">
          {rooms
            .sort((a, b) => {
              return a.price - b.price;
            })
            .map((room, index) => (
              <div
                key={`${room._id}-${index}`}
                className="mb-4 flex items-center justify-between border-b border-dotted border-white/60 pb-4
                 font-heading last:border-b-0 last:pb-0 group-last:border-0"
              >
                <div className="flex basis-2/3 flex-col sm:basis-full">
                  <h2 className="font-bold">{room.title}</h2>
                  <p className="font-thin">{room.desc}</p>
                  <p className="font-thin">
                    Max people:{" "}
                    <span className="font-semibold">{room.maxPeople}</span>
                  </p>
                  <p className="font-thin">
                    Per night:{" "}
                    <Currency
                      price={room.price}
                      currency="usd"
                      className="font-semibold"
                    />
                  </p>
                  <p className="font-thin">
                    Total:{" "}
                    <Currency
                      price={room.price * days}
                      currency="usd"
                      className="font-semibold"
                    />
                  </p>
                </div>
                <div className="flex gap-4">
                  {room.roomNumbers.map((roomNumber) => (
                    <Checkbox
                      value={roomNumber._id}
                      label={roomNumber.number.toString()}
                      handleChange={handleChange}
                      classNameContainer={`flex flex-col items-center gap-1`}
                      classNameInput={`${
                        isNotAvailable(roomNumber) &&
                        "cursor-not-allowed bg-white/50"
                      }`}
                      key={roomNumber._id}
                      disabled={isNotAvailable(roomNumber)}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="flex w-full justify-center">
            <Button
              size="long"
              variant="solid"
              children="Reserved here"
              className="w-2/3"
              onClick={handleReserve}
              isLoading={isLoading}
            />
          </div>
          <ErrorMessage errors={error} />
        </div>
      </div>
    </ModalUi>
  );
};

export default ReserveModal;
