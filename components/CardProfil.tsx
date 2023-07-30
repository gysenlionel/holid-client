import React, { useState, useEffect } from "react";
import { RiPencilFill } from "react-icons/ri";
import { RxCheck } from "react-icons/rx";
import { RiCloseLine } from "react-icons/ri";
import Input from "./Form/Input";
import { IUser } from "../types/user";
import { fetchPutJSON } from "../utils/helpers/api-helpers";
import { displayErrors } from "../utils/displayErrors";
import toast, { Toaster } from "react-hot-toast";
import { Error } from "../types";
import { useRouter } from "next/router";
import { capitalizeFirstLetterInWord } from "../utils/helpers/stringTransform";
import SelectMuiCountry from "./Form/SelectMuiCountry";
import countries from "../data/countries.json";
import { includesTupleCountries } from "../utils/helpers/includesCountries";
import SpinnerSVG from "./SVG/Spinner";

type defaultValueType =
  | "firstname"
  | "lastname"
  | "address"
  | "country"
  | "city"
  | "password";

interface ICardProfilProps {
  title: string;
  content: string;
  content2?: string;
  content3?: string;
  isFocus: boolean;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
  type: "text" | "date" | "password";
  name: string;
  name2?: string;
  name3?: string;
  user: IUser;
  defaultValue?: defaultValueType;
  defaultValue2?: defaultValueType;
  refreshData: () => void;
  classNameContainer: string;
  section?: "legalName" | "password";
}

interface IInput {
  lastname: string | undefined;
  firstname: string | undefined;
  address: string | undefined;
  city: string | undefined;
  country: string | undefined;
  password: string | undefined;
}

const toastStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
};

const CardProfil: React.FunctionComponent<ICardProfilProps> = ({
  title,
  content,
  content2,
  content3,
  isFocus,
  setIsFocus,
  type,
  name,
  name2,
  name3,
  user,
  defaultValue,
  defaultValue2,
  refreshData,
  classNameContainer,
  section,
}) => {
  const router = useRouter();
  const [value, setValue] = useState<IInput>({
    lastname: user?.lastname,
    firstname: user?.firstname,
    address: typeof user?.address !== "undefined" ? user?.address : "",
    city: typeof user?.city !== "undefined" ? user?.city : "",
    country: typeof user?.country !== "undefined" ? user?.country : "",
    password: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<string[]>(
    user?.country ? includesTupleCountries(countries, user.country) : []
  );
  const [isSelectedCountry, setIsSelectedCountry] = useState(false);
  const [errors, setErrors] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClose = () => {
    setValue({
      lastname: user?.lastname,
      firstname: user?.firstname,
      address: typeof user?.address !== "undefined" ? user?.address : "",
      city: typeof user?.city !== "undefined" ? user?.city : "",
      country: typeof user?.country !== "undefined" ? user?.country : "",
      password: "",
    });
    setErrors(null);
    setIsFocus(!isFocus);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let response: any;
    if (section === "password") {
      response = await fetchPutJSON(`/api/update_password?userId=${user._id}`, {
        password: value.password,
      });
    } else {
      value.country =
        typeof selectedCountry[0] !== "undefined" ? selectedCountry[0] : "";
      if (section === "legalName") {
        delete value.address;
        delete value.city;
        delete value.country;
      }

      response = await fetchPutJSON(`/api/update_profil?userId=${user._id}`, {
        user: value,
      });
    }
    setIsLoading(false);
    if ((response as any).statusCode === 500) {
      displayErrors(response?.message, setErrors);
      if (
        typeof response?.message !== "object" &&
        response?.message?.includes("Forbidden")
      )
        router.push("/");
      console.error(response?.message);
      return;
    }

    setErrors(null);
    setValue({
      lastname: user?.lastname,
      firstname: user?.firstname,
      address: typeof user?.address !== "undefined" ? user?.address : "",
      city: typeof user?.city !== "undefined" ? user?.city : "",
      country: typeof user?.country !== "undefined" ? user?.country : "",
      password: "",
    });
    refreshData();
    setIsFocus(!isFocus);
    toast.success(`Your profil has been updated`, {
      duration: 2000,
      style: toastStyle,
    });
  };

  useEffect(() => {
    if (errors?.status === 500 || errors?.status === 404) {
      toast.error(`An error has occurred`, {
        duration: 1500,
        style: toastStyle,
      });
    }
  }, [errors]);

  useEffect(() => {
    setValue({
      lastname: user?.lastname,
      firstname: user?.firstname,
      address: typeof user?.address !== "undefined" ? user?.address : "",
      city: typeof user?.city !== "undefined" ? user?.city : "",
      country: typeof user?.country !== "undefined" ? user?.country : "",
      password: "",
    });
  }, [user]);

  return (
    <div className={`bg-grayCard ${classNameContainer} my-4 rounded-lg`}>
      <div className={`flex justify-evenly py-4`}>
        <Toaster position="top-center" />
        <div className="flex basis-2/3 flex-col">
          <h1 className="title1">{title}</h1>
          <div
            className={`font-heading text-base font-extralight text-white/70 ${
              isFocus === true ? "hidden" : ""
            }`}
          >
            <p className={`${content2 && "mb-4"}`}>
              {content && capitalizeFirstLetterInWord(content)}
            </p>
            <p className={`${content3 && "mb-4"}`}>
              {content2 && capitalizeFirstLetterInWord(content2)}
            </p>
            <p>{content3 && content3}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <RiPencilFill
            className="h-6 w-6 cursor-pointer text-white/70"
            onClick={handleClose}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <div
          className={`${
            isFocus === true ? "block" : "hidden"
          } flex w-full max-w-xs flex-col px-4`}
        >
          <form action="">
            <Input
              name={name}
              type={type}
              id={name}
              onChange={handleChange}
              placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
              value={value[defaultValue]}
              errors={
                Array.isArray(errors?.message)
                  ? errors?.message.find((mess) =>
                      mess.includes(
                        name.charAt(0).toUpperCase() + name.slice(1)
                      )
                    )
                  : errors?.message?.includes(
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ) && errors?.message
              }
              rounded="rounded-2xl"
              className="!ml-0 w-full py-1 pl-4"
              classNameInputContainer="py-1"
              classNameContainer="pb-2"
            />
            {name2 && (
              <Input
                name={name2}
                type={type}
                id={name2}
                onChange={handleChange}
                placeholder={name2.charAt(0).toUpperCase() + name2.slice(1)}
                value={value[defaultValue2]}
                errors={
                  Array.isArray(errors?.message)
                    ? errors?.message.find((mess) =>
                        mess.includes(
                          name2.charAt(0).toUpperCase() + name2.slice(1)
                        )
                      )
                    : errors?.message?.includes(
                        name2.charAt(0).toUpperCase() + name2.slice(1)
                      ) && errors?.message
                }
                rounded="rounded-2xl"
                className="!ml-0 w-full py-1 pl-4"
                classNameInputContainer="py-1"
                classNameContainer="pb-2"
              />
            )}
            {name3 && (
              <SelectMuiCountry
                isSelectedCountry={isSelectedCountry}
                selectedCountry={selectedCountry}
                setIsSelectedCountry={setIsSelectedCountry}
                setSelectedCountry={setSelectedCountry}
                errors={
                  Array.isArray(errors?.message)
                    ? errors?.message.find((mess) =>
                        mess.includes(
                          name3.charAt(0).toUpperCase() + name3.slice(1)
                        )
                      )
                    : errors?.message?.includes(
                        name3.charAt(0).toUpperCase() + name3.slice(1)
                      ) && errors?.message
                }
              />
            )}
          </form>
          <div
            className={`flex ${
              isFocus === true ? "block" : "hidden"
            } justify-center space-x-1 pb-4`}
          >
            <div
              onClick={() => handleSubmit()}
              className={`flex cursor-pointer text-white/70`}
            >
              {isLoading ? (
                <SpinnerSVG
                  color="#fff"
                  height={24}
                  width={24}
                  className="mr-1"
                />
              ) : (
                <div className="flex">
                  <p>Valid</p>
                  <RxCheck className="h-7 w-7 " />
                </div>
              )}
            </div>
            <div
              className={`flex cursor-pointer text-white/70`}
              onClick={handleClose}
            >
              <p>Cancel</p>
              <RiCloseLine className="h-7 w-7 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProfil;
