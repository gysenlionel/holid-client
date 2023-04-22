import React from "react";

interface IErrorMessageProps {
  errors: string | string[];
  className?: string;
}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = ({
  errors,
  className,
}) => {
  const message = Array.isArray(errors)
    ? Object.entries(errors)
        .map((error) => error[1])
        .join(", ")
    : errors;
  return (
    <p
      className={`text-xs text-red-500 ${
        errors ? "visible" : "invisible"
      } ${className}`}
    >
      {message}
    </p>
  );
};

export default ErrorMessage;
