import React, { forwardRef, InputHTMLAttributes } from "react";
import { InputStyles, INPUT_STYLES } from "../../types/ui";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "email" | "password" | "number";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  errors?: string | string[];
  required?: boolean;
  variant?: InputStyles;
  autoComplete?: "on" | "off";
  rounded?: "rounded-2xl" | "rounded-sm";
  classNameInputContainer?: string;
  classNameContainer?: string;
}

const InputNormal = forwardRef<HTMLInputElement, IInputProps>(
  function InputNormal(
    {
      type,
      onChange,
      name,
      id,
      label,
      placeholder,
      className,
      errors,
      required,
      rounded,
      classNameInputContainer,
      classNameContainer,
    },
    ref
  ) {
    return (
      <div className={`${classNameContainer}`}>
        <Label className="mb-4 ml-2 text-base text-white/75">{label}</Label>
        <div
          className={`w-full bg-white ${rounded} ${
            errors ? "border-2 border-red-500 placeholder-red-500" : ""
          } ${classNameInputContainer}`}
        >
          <input
            ref={ref}
            type={type}
            onChange={onChange}
            name={name}
            id={id}
            placeholder={required ? `${placeholder}*` : placeholder}
            className={`h-8 ${rounded} text-base text-black ${className} ml-4 outline-none placeholder:select-none 
            focus:placeholder:invisible`}
            required={required}
          />
        </div>
        <ErrorMessage errors={errors} className="mt-2 ml-2" />
      </div>
    );
  }
);

const InputBooking = forwardRef<HTMLInputElement, IInputProps>(
  function InputBooking(
    { type, onChange, name, id, placeholder, className, autoComplete = "off" },
    ref
  ) {
    return (
      <div>
        <input
          ref={ref}
          type={type}
          onChange={onChange}
          name={name}
          id={id}
          placeholder={placeholder}
          className={`w-full rounded-sm bg-transparent text-base text-white placeholder:text-white ${className} !outline-none`}
          autoComplete={autoComplete}
        />
      </div>
    );
  }
);

const Input = forwardRef<HTMLInputElement, IInputProps>(function Button(
  {
    className,
    type,
    onChange,
    name,
    id,
    placeholder,
    required,
    errors,
    variant,
    label,
    rounded,
    classNameInputContainer,
    classNameContainer,
  },
  ref
) {
  switch (variant) {
    case INPUT_STYLES.INPUTBOOKING:
      return (
        <InputBooking
          name={name}
          id={id}
          onChange={onChange}
          type={type}
          className={className}
          placeholder={placeholder}
          ref={ref}
        />
      );

    case INPUT_STYLES.INPUTNORMAL:
    default:
      return (
        <InputNormal
          name={name}
          id={id}
          onChange={onChange}
          type={type}
          className={className}
          placeholder={placeholder}
          required={required}
          errors={errors}
          ref={ref}
          label={label}
          rounded={rounded}
          classNameInputContainer={classNameInputContainer}
          classNameContainer={classNameContainer}
        />
      );
  }
});

export default Input;
