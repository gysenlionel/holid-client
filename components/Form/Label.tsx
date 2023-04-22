import * as React from "react";

interface ILabelProps {
  children: React.ReactNode;
  className?: string;
}

const Label: React.FunctionComponent<ILabelProps> = ({
  children,
  className,
}) => {
  return children ? <p className={className}>{children}</p> : null;
};

export default Label;
