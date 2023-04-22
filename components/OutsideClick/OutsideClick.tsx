import React, { useEffect, useRef } from "react";
import { FCWithClassName } from "../../types";

interface IOutsideClickProps {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = (
  ref: any,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    /**
     * setIsOpen become false
     */
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

/**
 * Component that alerts if you click outside of it
 */
const OutsideClick: FCWithClassName<IOutsideClickProps> = ({
  className,
  setIsOpen,
  children,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsOpen);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default OutsideClick;
