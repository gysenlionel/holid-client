import * as React from "react";
import { SVGProps } from "react";
const Ray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={222}
    height={216}
    fill="none"
    {...props}
  >
    <path
      stroke="#F44A1F"
      strokeWidth={10}
      d="M112.637 0v53.818M112.637 161.455v53.818M77.671 151.102l-33.384 42.212M185.307 30.011l-33.384 42.212M149.946 152.892l35.439 40.502M37.4 23.617l35.439 40.502M0 107.636h53.818M168.182 107.636H222"
    />
  </svg>
);
export default Ray;
