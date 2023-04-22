import React, { useEffect, useState } from "react";
import logo from "../public/assets/logo/logo.svg";
import {
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import Link from "next/link";
import Input from "./Form/Input";
import ModalUi from "./Modal/ModalUi";
import { useRouter } from "next/router";
import axios from "axios";
import { environment } from "../lib/environment";
import { useUser } from "../contexts/user-context";

interface IHeaderProps {}

interface ICredentials {
  username: string | undefined;
  password: string | undefined;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState<ICredentials>({
    username: undefined,
    password: undefined,
  });

  const router = useRouter();
  const { user } = useUser();
  // const user = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${environment.apiUrl}/api/auth/login`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      router.push("/stays");
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(user);
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
      <ModalUi showModal={showModal} onClose={setShowModal} title="Login">
        <Input
          name="username"
          type="text"
          id="username"
          onChange={handleChange}
          placeholder="Username"
          errors={""}
          rounded="rounded-2xl"
          className="py-1"
          classNameInputContainer="py-1"
          classNameContainer="pb-2"
        />
        <Input
          name="password"
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
          errors={""}
          rounded="rounded-2xl"
          className="py-1"
          classNameInputContainer="py-1"
          classNameContainer="pb-4"
        />
        <Button
          children="Sign In"
          className="rounded-2xl py-2"
          size="full"
          onClick={handleSubmit}
        />
        <div className="m-auto mb-2 mt-4 w-max cursor-pointer border-b border-dotted font-body text-white/60 hover:text-white/80">
          Forgotten password ?
        </div>
      </ModalUi>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <img
            src={logo.src}
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
      </div>
      <ul
        className={`hidden ${
          user ? "w-[10rem]" : "w-5"
        } items-center  space-x-10 font-heading text-base font-semibold text-white md:flex`}
      >
        <li className="link">Home</li>
        <li className="link">Stays</li>
      </ul>

      <div className="hidden items-center space-x-4 md:flex">
        {!user && (
          <>
            <Button
              children="Login"
              icon="LOG"
              variant="outline"
              size="small"
              onClick={() => setShowModal(true)}
            />
            <Button children="Sign Up" icon="SIGN" size="small" />
          </>
        )}
        {user && (
          <>
            <ShoppingBagIcon className="h-6 w-6 cursor-pointer text-orangeMain" />
            <UserIcon className="h-6 w-6 cursor-pointer text-orangeMain" />
          </>
        )}
      </div>
      <div className="flex md:hidden">
        <Bars3Icon className="h-6 w-6 text-white" />
      </div>
    </header>
  );
};

export default Header;
