import React, { useState } from "react";
import Input from "../Form/Input";
import { Error } from "../../types";
import Button from "../Button";
import ModalUi from "./ModalUi";
import { displayErrors } from "../../utils/displayErrors";
import toast, { Toaster } from "react-hot-toast";
import { fetchPostJSON } from "../../utils/helpers/api-helpers";

interface ISignUpModalProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IInput {
  lastname: string | undefined;
  firstname: string | undefined;
  email: string | undefined;
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

const SignUpModal: React.FunctionComponent<ISignUpModalProps> = ({
  isShowModal,
  setIsShowModal,
}) => {
  const [errors, setErrors] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<IInput>({
    lastname: undefined,
    firstname: undefined,
    email: undefined,
    username: undefined,
    password: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetchPostJSON("/api/sign_up", {
      credentials: credentials,
    });

    if ((response as any).statusCode === 500) {
      setIsLoading(false);
      displayErrors(response?.message, setErrors);

      console.error(response?.message);
      if (errors?.status === 500)
        toast.error(`An error has occurred`, {
          duration: 1500,
          style: toastStyle,
        });
      return;
    }

    setIsLoading(false);
    setErrors(null);
    toast.success(`Your account has been created`, {
      duration: 8000,
      style: toastStyle,
    });
    setTimeout(() => {
      setIsShowModal(false);
      toast.dismiss();
    }, 1500);
  };
  return (
    <ModalUi
      isShowModal={isShowModal}
      onClose={setIsShowModal}
      title="Sign"
      className="!w-72 sm:!w-96"
    >
      <Toaster position="top-center" />
      <form>
        <Input
          name="lastname"
          type="text"
          id="lastname"
          onChange={handleChange}
          placeholder="Lastname"
          errors={
            Array.isArray(errors?.message)
              ? errors?.message.find((mess) => mess.includes("Lastname"))
              : errors?.message?.includes("Lastname") && errors?.message
          }
          rounded="rounded-2xl"
          className="!ml-0 w-full py-1 pl-4"
          classNameInputContainer="py-1"
          classNameContainer="pb-2"
          required={true}
        />
        <Input
          name="firstname"
          type="text"
          id="firstname"
          onChange={handleChange}
          placeholder="Firstname"
          errors={
            Array.isArray(errors?.message)
              ? errors?.message.find((mess) => mess.includes("Firstname"))
              : errors?.message?.includes("Firstname") && errors?.message
          }
          rounded="rounded-2xl"
          className="!ml-0 w-full py-1 pl-4"
          classNameInputContainer="py-1"
          classNameContainer="pb-2"
          required={true}
        />
        <Input
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
          placeholder="Email"
          errors={
            Array.isArray(errors?.message)
              ? errors?.message.find((mess) => mess.includes("Email"))
              : errors?.message?.includes("Email") && errors?.message
          }
          rounded="rounded-2xl"
          className="!ml-0 w-full py-1 pl-4"
          classNameInputContainer="py-1"
          classNameContainer="pb-2"
          required={true}
        />
        <Input
          name="username"
          type="text"
          id="username"
          onChange={handleChange}
          placeholder="Username"
          errors={
            Array.isArray(errors?.message)
              ? errors?.message.find((mess) => mess.includes("Username"))
              : errors?.message?.includes("Username") && errors?.message
          }
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
          errors={
            Array.isArray(errors?.message)
              ? errors?.message.find((mess) => mess.includes("Password"))
              : errors?.message?.includes("Password") && errors?.message
          }
          rounded="rounded-2xl"
          className="!ml-0 w-full py-1 pl-4"
          classNameInputContainer="py-1"
          classNameContainer="pb-2"
          required={true}
        />
        <Button
          children="Sign Up"
          className="rounded-2xl py-2"
          size="full"
          onClick={handleSubmit}
          isLoading={isLoading}
        />
      </form>
    </ModalUi>
  );
};

export default SignUpModal;
