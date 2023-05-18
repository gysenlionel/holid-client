import React, { useState, useEffect } from "react";
import Input from "../Form/Input";
import { useRouter } from "next/router";
import { Error } from "../../types";
import Button from "../Button";
import ModalUi from "./ModalUi";
import { displayErrors } from "../../utils/displayErrors";
import { fetchPostJSON } from "../../utils/helpers/api-helpers";
import { Toaster, toast } from "react-hot-toast";

interface ILoginModalProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICredentials {
  username: string | undefined;
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

const LoginModal: React.FunctionComponent<ILoginModalProps> = ({
  isShowModal,
  setIsShowModal,
}) => {
  const [errors, setErrors] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState<ICredentials>({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const router = useRouter();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetchPostJSON("/api/login", {
      credentials: credentials,
    });
    if ((response as any)?.statusCode === 500) {
      setIsLoading(false);
      console.error(response?.message);
      displayErrors(response?.message, setErrors);
      if (errors?.status === 500)
        toast.error(`An error has occurred`, {
          duration: 8000,
          style: toastStyle,
        });
      return;
    }
    setIsLoading(false);
    setErrors(null);
    setIsShowModal(false);
    router.push("/stays");
  };

  useEffect(() => {
    toast.dismiss();
  }, []);
  return (
    <ModalUi
      isShowModal={isShowModal}
      onClose={setIsShowModal}
      title="Login"
      className="!w-72 sm:!w-96"
    >
      <Toaster position="top-center" />
      <form>
        <Input
          name="username"
          type="text"
          id="username"
          onChange={handleChange}
          placeholder="Username"
          globalError={errors?.status === 400 && true}
          rounded="rounded-2xl"
          className="!ml-0 w-full py-1 pl-4"
          classNameInputContainer="py-1"
          classNameContainer="pb-2"
          required={true}
        />
        <Input
          name="password"
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
          errors={errors?.message?.includes("password") && errors?.message}
          rounded="rounded-2xl"
          className="!ml-0 w-full py-1 pl-4"
          classNameInputContainer="py-1"
          classNameContainer="pb-4"
          required={true}
        />
        <Button
          children="Log In"
          className="rounded-2xl py-2"
          size="full"
          onClick={handleSubmit}
          isLoading={isLoading}
        />
      </form>
      <div className="m-auto mb-2 mt-4 w-max cursor-pointer border-b border-dotted font-body text-white/60 hover:text-white/80">
        Forgotten password ?
      </div>
    </ModalUi>
  );
};

export default LoginModal;
