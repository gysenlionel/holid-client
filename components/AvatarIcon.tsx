import Image from "next/image";
import * as React from "react";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

interface IAvatarIconProps {
  className?: string;
  iconURL: string | undefined;
  isShowModal?: boolean;
  setIsShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarIcon: React.FunctionComponent<IAvatarIconProps> = ({
  className,
  iconURL,
  isShowModal,
  setIsShowModal,
}) => {
  return (
    <div>
      {iconURL == "undefined" ? (
        <UserCircleIcon className="ml-1 h-8 w-8 cursor-pointer text-white sm:w-10 md:h-10 md:text-orangeMain" />
      ) : (
        <Image
          src={iconURL}
          alt="avatar"
          className={`h-10 w-10 rounded-full object-cover ${className}`}
          width={500}
          height={500}
        />
      )}
    </div>
  );
};

export default AvatarIcon;
