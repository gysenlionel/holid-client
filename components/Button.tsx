import React, { ButtonHTMLAttributes, forwardRef } from "react";
import parse from "html-react-parser";
import { ButtonStyles, BUTTON_STYLES } from "../types/ui";
import {
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import SpinnerSVG from "./SVG/Spinner";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: keyof typeof iconObject;
  variant?: ButtonStyles;
  size: keyof typeof buttonSize;
}

const iconStyle = "mr-1 h-5 w-5";

const iconObject = {
  SIGN: <UserPlusIcon className={`${iconStyle}`} />,
  LOG: <ArrowRightOnRectangleIcon className={`${iconStyle}`} />,
};

const buttonSize = {
  small: "text-sm h-9 w-24",
  lg: "lg:text-lg lg:h-12 lg:w-48 text-sm h-9 w-36",
  long: "text-sm h-9 w-36",
  full: "w-full",
};

const SolidButton = forwardRef<HTMLInputElement, IButtonProps>(
  function SolidButton(
    { children, className, isLoading, type, icon, size, ...rest },
    forwardedRef
  ) {
    const globalStyle =
      "rounded-full bg-orangeMain font-semibold text-white font-heading";

    return (
      <button
        className={`${globalStyle} ${buttonSize[size]} ${className}
    ${
      isLoading ? "flex items-center justify-center" : undefined
    } hover:saturate-200`}
        ref={forwardedRef}
        type={type}
        {...rest}
      >
        <span className="flex w-auto items-center justify-center">
          {isLoading ? (
            <SpinnerSVG color="#fff" height={24} width={24} className="mr-1" />
          ) : undefined}
          {icon ? iconObject[icon] : undefined}
          {parse(children as string)}
        </span>
      </button>
    );
  }
);

const OutlineButton = forwardRef<HTMLInputElement, IButtonProps>(
  function OutlineButton(
    { children, className, isLoading, type, icon, size, ...rest },
    forwardedRef
  ) {
    const globalStyle =
      "rounded-full border border-white bg-transparent font-semibold text-white font-heading";
    return (
      <button
        className={`${globalStyle} ${buttonSize[size]} ${className}
    ${isLoading ? "flex items-center justify-center" : undefined}`}
        ref={forwardedRef}
        type={type}
        {...rest}
      >
        <span className="flex w-auto items-center justify-center">
          {isLoading ? (
            <SpinnerSVG color="#fff" height={24} width={24} className="mr-1" />
          ) : undefined}
          {icon ? iconObject[icon] : undefined}
          {parse(children as string)}
        </span>
      </button>
    );
  }
);

const Button = forwardRef<HTMLInputElement, IButtonProps>(function Button(
  { className, variant, children, ...rest },
  forwardedRef
) {
  if (!children) return null;

  switch (variant) {
    case BUTTON_STYLES.OUTLINE:
      return (
        <OutlineButton ref={forwardedRef} className={className} {...rest}>
          {children}
        </OutlineButton>
      );

    case BUTTON_STYLES.SOLID:
    default:
      return (
        <SolidButton ref={forwardedRef} className={className} {...rest}>
          {children}
        </SolidButton>
      );
  }
});

export default Button;
