import * as React from "react";
import Button from "./Button";

interface ILocationScoreProps {
  city: string;
}

const LocationScore: React.FunctionComponent<ILocationScoreProps> = ({
  city,
}) => {
  return (
    <div className="lg:ml-8">
      <aside className="mt-8 flex h-fit flex-col items-center bg-grayCard p-6">
        <h3 className="font-heading text-xl font-normal tracking-wider">
          Perfect for a 4-night stay!
        </h3>
        <p className="my-4 text-justify font-body text-lg leading-7 tracking-wider">
          Located in {city}, this property has an excellent location score of
          9.8!
        </p>
        <Button
          size="long"
          variant="solid"
          children="Reserve"
          className="w-2/3"
          // onClick={handleSearch}
          // isLoading={isLoading}
        />
      </aside>
    </div>
  );
};

export default LocationScore;
