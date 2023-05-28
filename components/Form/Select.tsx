import React, { forwardRef } from "react";
import { FCWithClassName } from "../../types";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

interface Select {
  label?: string;
  name: string;
  id?: string;
  errors?: string | string[];
  onBlur?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  options: {
    checked: boolean;
    name: string;
    label: string;
  }[];
  rounded?: "rounded-2xl" | "rounded-sm";
  classNameInputContainer?: string;
  classNameContainer?: string;
}

const Select: FCWithClassName<Select> = forwardRef<HTMLSelectElement, Select>(
  (
    {
      label,
      name,
      id,
      placeholder,
      errors,
      onChange,
      onBlur,
      className,
      options,
      rounded,
      classNameInputContainer,
      classNameContainer,
    },
    ref
  ) => {
    const showEmptyDefaultValue = !options.some((option) => option.checked);

    return (
      <div
        className={`flex flex-col items-center justify-center ${classNameContainer} ${rounded}`}
      >
        <Label className="">{label}</Label>
        <div
          className={`w-32 bg-white ${rounded} ${
            errors ? "border-2 border-red-500 placeholder-red-500" : ""
          } ${classNameInputContainer}`}
        >
          <select
            name={name}
            id={id}
            ref={ref}
            placeholder={placeholder}
            className={`${className} ${
              errors ? "!border-red-500" : ""
            }  block w-32 appearance-none rounded border border-gray-200
            bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none`}
            onChange={onChange}
            onBlur={onBlur}
          >
            {showEmptyDefaultValue && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option
                key={option.name}
                value={option.name}
                className="text-black"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <ErrorMessage errors={errors} />
      </div>
    );
  }
);

export default Select;
