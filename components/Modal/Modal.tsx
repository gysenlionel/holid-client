import React, { useState } from "react";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import OutsideClick from "../OutsideClick/OutsideClick";

interface IModalProps {
  invisible: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  children: React.ReactNode;
}

const Modal: React.FunctionComponent<IModalProps> = ({
  invisible,
  onClose,
  children,
}) => {
  // backdrop-blur-sm

  if (!invisible) return null;

  return (
    <div className="absolute -top-2/4 left-2/4 z-30  h-[100vh] -translate-x-2/4 translate-y-2/4 transform">
      <OutsideClick setIsOpen={onClose}>
        <div className="absolute flex items-center justify-center  bg-opacity-25">
          <div className="relative flex w-auto flex-col">
            <XMarkIcon
              className="absolute -right-2 h-6 w-6 -translate-y-2/4 cursor-pointer rounded-full border-grayX bg-white text-grayX"
              onClick={() => onClose(false)}
            />
            <div className="rounded bg-grayX p-2">{children}</div>
          </div>
        </div>
      </OutsideClick>
    </div>
  );
};

export default Modal;
