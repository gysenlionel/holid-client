import { forwardRef } from "react";
import { FCWithClassName } from "../../types";

export type Radio = {
  id?: string;
  name: string;
  label?: string;
  className?: string;
  defaultChecked?: boolean;
  hideError?: boolean;
  labelClassName?: string;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  // alternativeRadio
  setCheckedStateChoix?: React.Dispatch<React.SetStateAction<number>>;
  index?: number;
  lastArrayLength?: number;
  optionName?: string;
  checkedStateChoix?: number;
  onChangeValue?: React.Dispatch<React.SetStateAction<string | number>>;
};

const Radio: FCWithClassName<Radio> = forwardRef<HTMLInputElement, Radio>(
  (
    {
      wrapperClassName,
      labelClassName,
      id,
      name,
      defaultChecked,
      className,
      onBlur,
      label,
      checkedStateChoix,
      index,
      setCheckedStateChoix,
    },
    ref
  ) => {
    return (
      <div className={wrapperClassName}>
        <label className={`flex flex-col items-center ${labelClassName}`}>
          {label}
          <input
            id={id}
            type="radio"
            name={name}
            defaultChecked={defaultChecked}
            className={`my-2 ${className} ${
              checkedStateChoix === index
                ? "bg-orangeMain text-orangeMain checked:bg-orangeMain"
                : "bg-none text-white checked:bg-none"
            }`}
            onClick={() => setCheckedStateChoix(index)}
            onBlur={onBlur}
            ref={ref}
          />
        </label>
      </div>
    );
  }
);

export default Radio;
Radio.displayName = "Radio";
