import * as React from "react";

interface ICheckboxProps {
  name?: string;
  label: string;
  value: string;
  handleChange: any;
  disabled?: boolean;
  classNameContainer?: string;
  classNameInput?: string;
}

const Checkbox: React.FunctionComponent<ICheckboxProps> = ({
  name,
  label,
  value,
  handleChange,
  disabled,
  classNameContainer,
  classNameInput,
}) => {
  return (
    <div className={classNameContainer}>
      <label htmlFor={name} className="text-sm font-extralight text-white/60">
        {label}
      </label>
      <input
        type="checkbox"
        value={value}
        id={name}
        onChange={handleChange}
        className={`h-5 w-5 rounded border-gray-300 bg-gray-100 text-orangeMain focus:ring-2 focus:ring-orangeMain dark:border-gray-600
         dark:ring-offset-gray-800 dark:focus:ring-orangeMain ${classNameInput}`}
        disabled={disabled}
      />
    </div>
  );
};

export default Checkbox;
