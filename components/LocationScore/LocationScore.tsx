import React, { useState, useEffect } from "react";
import Button from "../Button";
import { Hotel } from "../../types";
import { dayDifference } from "../../utils/helpers/daysCalcul";
import { useSelector } from "react-redux";
import { selectDatesState } from "../../store/travelSlice";
import { stringToDate } from "../../utils/helpers/transformToDate";
import Currency from "../Currency";
import LocationScoreSkeleton from "./LocationScoreSkeleton";

interface ILocationScoreProps {
  property: Hotel;
  handleReserve: () => void;
}

const LocationScore: React.FunctionComponent<ILocationScoreProps> = ({
  property,
  handleReserve,
}) => {
  const datesState = useSelector(selectDatesState);
  const { startDate, endDate } = stringToDate(datesState);
  const [domLoaded, setDomLoaded] = useState(false);
  const days = dayDifference(endDate, startDate);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <div className="lg:ml-8">
      <aside className="mt-8 flex h-fit flex-col items-center bg-grayCard p-6">
        {domLoaded ? (
          <div>
            <h3 className="font-heading text-xl font-normal tracking-wider">
              Perfect for a {days}-night stay!
            </h3>
            <div className="flex flex-col items-center">
              <p className="my-4 text-justify font-body text-lg leading-7 tracking-wider">
                Located in {property.city} at {property.distance}m from center.
                Enjoy {days} nights at{" "}
                <Currency
                  price={property.cheapestPrice}
                  currency="usd"
                  className="font-body"
                />{" "}
                per night, this property has an excellent location score of 9.8!
              </p>
              <Button
                size="long"
                variant="solid"
                children="Reserve"
                className="w-2/3"
                onClick={handleReserve}
                // isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <LocationScoreSkeleton />
        )}
      </aside>
    </div>
  );
};

export default LocationScore;
