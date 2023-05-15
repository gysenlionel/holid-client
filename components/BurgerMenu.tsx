import * as React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUser } from "../contexts/user-context";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { fetchGetJSON } from "../utils/helpers/api-helpers";

interface IBurgerMenuProps {
  isShowMenu: boolean;
  setIsShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowModalSign: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerMenu: React.FunctionComponent<IBurgerMenuProps> = ({
  isShowMenu,
  setIsShowMenu,
  setIsShowModal,
  setIsShowModalSign,
}) => {
  const { user } = useUser();
  const router = useRouter();

  const MenuItem: React.FC<{
    children: string;
    onClick?: React.MouseEventHandler<HTMLParagraphElement>;
  }> = ({ children, onClick }) => {
    return (
      <p
        className="w-full cursor-pointer border-b border-dotted py-8 text-center"
        onClick={onClick}
      >
        {children}
      </p>
    );
  };

  return (
    <div>
      {!isShowMenu ? (
        <div className="flex flex-row">
          {!user && (
            <>
              <ArrowRightOnRectangleIcon
                className="mr-3 h-6 w-6 cursor-pointer"
                onClick={() => setIsShowModal(true)}
              />
              <UserPlusIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setIsShowModalSign(true)}
              />
            </>
          )}
          <Bars3Icon
            className="ml-3 h-6 w-6 cursor-pointer text-white"
            onClick={() => setIsShowMenu(!isShowMenu)}
          />
        </div>
      ) : (
        <XMarkIcon
          className={`fixed top-0 right-0 z-20 mt-4 mr-6 h-8 
        w-8 cursor-pointer !text-white`}
          onClick={() => setIsShowMenu(!isShowMenu)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-screen bg-grayCard pl-6 ${
          isShowMenu ? "translate-x-0" : "translate-x-full"
        } duration-300 ease-in-out`}
      >
        <div
          className="flex min-h-[85vh] select-none flex-col justify-between font-heading 
        text-2xl"
        >
          <div className="mx-4 mt-24 flex flex-col items-center justify-center text-white">
            {user ? (
              <>
                <Link href="/" className="w-full">
                  <MenuItem
                    children="Home"
                    onClick={() => setIsShowMenu(false)}
                  />
                </Link>
                <Link href="/stays" className="w-full">
                  <MenuItem
                    children="Stays"
                    onClick={() => setIsShowMenu(false)}
                  />
                </Link>
                <MenuItem
                  children="Logout"
                  onClick={async () => {
                    const response = await fetchGetJSON("/api/logout");
                    setIsShowMenu(false);
                    router.push("/");
                  }}
                />
              </>
            ) : (
              <>
                <Link href="/" className="w-full">
                  <MenuItem
                    children="Home"
                    onClick={() => setIsShowMenu(false)}
                  />
                </Link>
                <Link href="/stays" className="w-full">
                  <MenuItem
                    children="Stays"
                    onClick={() => setIsShowMenu(false)}
                  />
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="logo"
              width={140}
              height={140}
              className="cursor-pointer object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
