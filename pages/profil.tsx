import React, { useCallback, useEffect, useState } from "react";
import { wrapper } from "../store/store";
import { GetServerSideProps } from "next";
import { getUser } from "../lib/getUser-ssr";
import { IUser } from "../types/user";
import HeadSEO from "../components/HeadSEO";
import Header from "../components/Header";
import siteMetadata from "../data/siteMetadata";
import AvatarIcon from "../components/AvatarIcon";
import CardProfil from "../components/CardProfil";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { RxCheck } from "react-icons/rx";
import { RiCloseLine } from "react-icons/ri";
import { fetchPutJSON } from "../utils/helpers/api-helpers";
import toast, { Toaster } from "react-hot-toast";
import { displayErrors } from "../utils/displayErrors";
import { Error } from "../types";
import ErrorMessage from "../components/Form/ErrorMessage";
import countries from "../data/countries.json";
import { includesTupleCountries } from "../utils/helpers/includesCountries";
import SpinnerSVG from "../components/SVG/Spinner";

interface IProfilProps {
  user: IUser;
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

const Profil: React.FunctionComponent<IProfilProps> = ({ user }) => {
  const [isLegalName, setIsLegalName] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [file, setFile] = useState<any>();
  const [image, setImage] = useState<any>();
  const [errors, setErrors] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(() => reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const handleCancelImage = () => {
    setFile(null);
    setImage(null);
    setErrors(null);
  };

  const data = {
    image: image,
    size: file?.size,
    type: file?.type,
  };
  const handleSubmitImage = async () => {
    setIsLoading(true);
    const response = await fetchPutJSON(
      `/api/update_image?userId=${user._id}`,
      {
        data,
      }
    );
    setIsLoading(false);
    if ((response as any).statusCode === 500) {
      displayErrors(response, setErrors);
      console.error(response?.message);
      if (
        typeof response?.message !== "object" &&
        response?.message?.includes("Forbidden")
      ) {
        router.push("/");
      }
      return;
    }
    refreshData();
    setErrors(null);
    setFile(null);
    toast.success(`Your image has been updated`, {
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

  return (
    <div className="">
      <HeadSEO
        title={`Profil | ${siteMetadata.siteUrl}`}
        description="Holi'D Profil Page, Check your profil and update it."
        ogType="Profil"
        canonicalUrl={`${siteMetadata.siteUrl}`}
      />
      <Header />
      <main className="mt-24 lg:mt-36">
        <Toaster position="top-center" />
        <section className="gutters h-auto">
          <div className="lg:flex">
            <div className="w-m basis-1/3">
              <div className="flex flex-col items-center">
                <div
                  className="flex cursor-pointer flex-col items-center"
                  {...getRootProps()}
                >
                  <input
                    {...getInputProps()}
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                  <AvatarIcon
                    dropImage={image}
                    iconURL={user?.img?.url ? user?.img?.url : "/user.png"}
                    className="mb-4 !h-72 !w-72"
                  />
                </div>
                {file && (
                  <div>
                    <div className={`flex space-x-2`}>
                      <div
                        className="flex cursor-pointer text-white/70"
                        onClick={handleSubmitImage}
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
                            <p>Upload</p>
                            <RxCheck className="h-7 w-7 " />
                          </div>
                        )}
                      </div>
                      <div
                        className="flex cursor-pointer text-white/70"
                        onClick={handleCancelImage}
                      >
                        <p>Cancel</p>
                        <RiCloseLine className="h-7 w-7" />
                      </div>
                    </div>
                    <ErrorMessage errors={errors?.message} className="mt-1" />
                  </div>
                )}
                <CardProfil
                  title="Legal Name"
                  content={`${user.firstname} ${user.lastname}`}
                  isFocus={isLegalName}
                  setIsFocus={setIsLegalName}
                  type="text"
                  name="firstname"
                  name2="lastname"
                  user={user}
                  defaultValue={"firstname"}
                  defaultValue2={"lastname"}
                  refreshData={refreshData}
                  classNameContainer="w-full sm:w-auto sm:min-w-[65%] lg:min-w-[75%] lg:px-2"
                />
              </div>
            </div>
            <div className="flex basis-2/3 flex-col items-center">
              <CardProfil
                title="Address"
                content={`${
                  typeof user?.address !== "undefined" ? user?.address : ""
                }`}
                content2={user?.city}
                content3={
                  user?.country &&
                  includesTupleCountries(countries, user.country)[1]
                }
                isFocus={isAddress}
                setIsFocus={setIsAddress}
                type="text"
                name="address"
                name2="city"
                name3="country"
                user={user}
                defaultValue={"address"}
                defaultValue2={"city"}
                refreshData={refreshData}
                classNameContainer="w-full sm:w-auto sm:min-w-[65%] lg:min-w-[50%] lg:max-w-sm"
              />
              <CardProfil
                title="Password"
                content={`**********`}
                isFocus={isPassword}
                setIsFocus={setIsPassword}
                type="password"
                name="password"
                user={user}
                defaultValue={"password"}
                refreshData={refreshData}
                classNameContainer="w-full sm:w-auto sm:min-w-[65%] lg:min-w-[50%] lg:max-w-sm"
                passEndpoint
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profil;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res } = context;

    const [error, user] = await getUser(req, res);
    if (!user) return { redirect: { statusCode: 307, destination: "/" } };

    return {
      props: {
        user,
      },
    };
  });
