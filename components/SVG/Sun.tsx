import * as React from "react";
import { SVGProps } from "react";
const Sun = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={81}
    height={81}
    fill="none"
    {...props}
  >
    <circle
      cx={40.364}
      cy={40.364}
      r={39.864}
      fill="#F44A1F"
      stroke="#131218"
    />
  </svg>
);
export default Sun;
