import React from "react";
import OutsideClick from "../OutsideClick/OutsideClick";
import MinusCircleIcon from "@heroicons/react/24/outline/MinusCircleIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";

interface ICompFamModalProps {
  invisible: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  options?: {
    adult: number;
    children: number;
    room: number;
  };
  setOptions: React.Dispatch<
    React.SetStateAction<{
      adult: number;
      children: number;
      room: number;
    }>
  >;
  className?: string;
  isClassic?: boolean;
  classicClass?: string;
  classNameOutside?: string;
}

type Iname = "adult" | "children" | "room";

const CompFamModal: React.FunctionComponent<ICompFamModalProps> = ({
  invisible,
  onClose,
  options,
  setOptions,
  className,
  isClassic,
  classicClass,
  classNameOutside,
}) => {
  // backdrop-blur-sm

  if (!invisible) return null;

  const handleOption = (name: Iname, operation: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <OutsideClick setIsOpen={onClose} className={classNameOutside}>
      <div
        className={`absolute left-0 right-0 top-44 flex justify-center lg:left-auto lg:right-52 lg:top-14 lg:w-64 lg:justify-start ${className}`}
      >
        <div
          className={`relative flex w-96 flex-col ${
            isClassic ? classicClass : "!w-64"
          } `}
        >
          <div className="rounded bg-white p-2 py-4 font-heading text-base text-black">
            <div className="flex justify-between">
              <p className="text-black/60">Adult</p>
              <div className="grid grid-cols-3">
                <MinusCircleIcon
                  data-testid="adult-min"
                  className={`h-6 w-6 ${
                    options.adult <= 1 && "pointer-events-none"
                  } text-orangeMain`}
                  onClick={() => handleOption("adult", "d")}
                />
                <p className="text-center">{options.adult}</p>
                <PlusCircleIcon
                  data-testid="adult-plus"
                  className="h-6 w-6 text-orangeMain"
                  onClick={() => handleOption("adult", "i")}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-black/60">Children</p>
              <div className="grid grid-cols-3">
                <MinusCircleIcon
                  data-testid="children-min"
                  className={`h-6 w-6 ${
                    options.children <= 0 && "pointer-events-none"
                  } text-orangeMain`}
                  onClick={() => handleOption("children", "d")}
                />
                <p className="text-center">{options.children}</p>
                <PlusCircleIcon
                  data-testid="children-plus"
                  className="h-6 w-6 text-orangeMain"
                  onClick={() => handleOption("children", "i")}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-black/60">Room</p>
              <div className="grid grid-cols-3">
                <MinusCircleIcon
                  data-testid="room-min"
                  className={`h-6 w-6 ${
                    options.room <= 1 && "pointer-events-none"
                  } text-orangeMain`}
                  onClick={() => handleOption("room", "d")}
                />
                <p className="text-center">{options.room}</p>
                <PlusCircleIcon
                  data-testid="room-plus"
                  className="h-6 w-6 text-orangeMain"
                  onClick={() => handleOption("room", "i")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OutsideClick>
  );
};

export default CompFamModal;
