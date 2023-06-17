import React, { useState, useEffect } from "react";
import Input from "../Form/Input";
import Button from "../Button";
import ModalUi from "./ModalUi";
import { Toaster, toast } from "react-hot-toast";
import Currency from "../Currency";
import Checkbox from "../Form/Checkbox";
import { Room, RoomNumbers } from "../../types";
import { getDatesInRange } from "../../utils/helpers/getDatesInRange";
import { fetchPostJSON } from "../../utils/helpers/api-helpers";

interface ILoginModalProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  rooms: Room[];
  days: number;
  startDate: Date;
  endDate: Date;
  userId: string;
}

const ReserveModal: React.FunctionComponent<ILoginModalProps> = ({
  isShowModal,
  setIsShowModal,
  rooms,
  days,
  startDate,
  endDate,
  userId,
}) => {
  const [selectRooms, setSelectRooms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

    const response = await fetchPostJSON(
      `/api/availableDates?roomNumberId=${selectRooms}&userId=${userId}`,
      {
        dates: allDates,
      }
    );

    if ((response as any).statusCode === 500) {
      setIsLoading(false);

      console.error(response?.message);
      // if (errors?.status === 500)
      //   toast.error(`An error has occurred`, {
      //     duration: 1500,
      //     style: toastStyle,
      //   });
      return;
    }

    setIsLoading(false);

    // toast.success(`Your account has been created`, {
    //   duration: 8000,
    //   style: toastStyle,
    // });
    // setTimeout(() => {
    //   setIsShowModal(false);
    //   toast.dismiss();
    // }, 1500);
  };
  // console.log("timestamp", allDates);
  // console.log("date", new Date(allDates[0]));

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
            .map((room) => (
              <div
                key={room._id}
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
                  <Currency
                    price={room.price * days}
                    currency="usd"
                    className="font-semibold"
                  />
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
      </div>
    </ModalUi>
  );
};

export default ReserveModal;
