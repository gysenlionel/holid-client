import React, { useEffect, useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { useUser } from "../contexts/user-context";
import Image from "next/image";
import AvatarIcon from "./AvatarIcon";
import { MdOutlineFlight } from "react-icons/md";
import BurgerMenu from "./BurgerMenu";
import LoginModal from "./Modal/LoginModal";
import SignUpModal from "./Modal/SignUpModal";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShowModalLogin, setIsShowModalLogin] = useState(false);
  const [isShowModalSign, setIsShowModalSign] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-backgroundHeader"} select-none`}>
      <LoginModal
        setIsShowModal={setIsShowModalLogin}
        isShowModal={isShowModalLogin}
      />
      <SignUpModal
        setIsShowModal={setIsShowModalSign}
        isShowModal={isShowModalSign}
      />
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={120}
            height={120}
            className="h-auto cursor-pointer object-contain"
          />
        </Link>
      </div>
      <ul
        className={`hidden ${
          user ? "w-[10rem]" : "w-5"
        } items-center  space-x-10 font-heading text-base font-semibold text-white md:flex`}
      >
        <Link href="/">
          <li className="link">Home</li>
        </Link>
        <Link href="/stays">
          <li className="link">Stays</li>
        </Link>
      </ul>

      <div className="hidden items-center space-x-4 md:flex">
        {!user && (
          <>
            <Button
              children="Login"
              icon="LOG"
              variant="outline"
              size="small"
              onClick={() => setIsShowModalLogin(true)}
            />
            <Button
              children="Sign Up"
              icon="SIGN"
              size="small"
              onClick={() => setIsShowModalSign(true)}
            />
          </>
        )}
        {user && (
          <>
            <MdOutlineFlight className="h-8 w-8 cursor-pointer text-orangeMain" />
            <AvatarIcon
              iconURL={`${user?.img?.url}`}
              className="cursor-pointer"
              isShowModal={isShowMenu}
              setIsShowModal={setIsShowMenu}
            />
          </>
        )}
        <BurgerMenu
          isShowMenu={isShowMenu}
          setIsShowMenu={setIsShowMenu}
          setIsShowModal={setIsShowModalLogin}
          setIsShowModalSign={setIsShowModalSign}
        />
      </div>
      <div className="flex items-center md:hidden">
        {user && (
          <>
            <MdOutlineFlight className="h-8 w-8 cursor-pointer text-white" />
            <AvatarIcon
              iconURL={`${user?.img?.url}`}
              className="ml-3 !h-8 !w-8 cursor-pointer border"
            />
          </>
        )}
        <BurgerMenu
          isShowMenu={isShowMenu}
          setIsShowMenu={setIsShowMenu}
          setIsShowModal={setIsShowModalLogin}
          setIsShowModalSign={setIsShowModalSign}
        />
      </div>
    </header>
  );
};

export default Header;
