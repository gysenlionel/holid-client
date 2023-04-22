import * as React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineFacebook } from "react-icons/ai";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <footer className="bg-grayCard py-8 font-body">
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-evenly sm:gap-0">
        <div className="flex flex-col items-center  ">
          <div className="text-base font-medium uppercase">Contact us</div>
          <div className="flex flex-col items-center text-sm font-medium">
            <p>Monday To Saturday :</p>
            <p>9am - 5pm.</p>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="text-base font-medium uppercase">find us on :</div>
          <div className="flex justify-center gap-1">
            <AiOutlineInstagram className="h-8 w-8" />
            <AiOutlineFacebook className="h-8 w-8" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center text-sm font-medium">
        <p>Copyright © 2023.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
