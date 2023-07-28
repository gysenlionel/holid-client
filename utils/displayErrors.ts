import { Error } from "../types";

export const displayErrors = (err: any, setError: React.Dispatch<React.SetStateAction<Error>>) => {
  let errors = [];

  if (typeof err?.message === 'object') return setError({ status: err?.message?.status, message: err?.message?.message })

  if (err?.message?.startsWith("User validation failed")) {
    errors = err?.message
      .replace("User validation failed:", "")
      .split(",")
      .map((error: string) => error.split(":").pop())
      .map((error: string) =>
        error
          .split("`email`")[0]
          .replace("Validator failed for path ", "Email is not valid")
      );

    setError({
      status: 400,
      message: errors,
    });
  } else if (err?.message?.startsWith("Validation failed")) {
    errors = err?.message
      .replace("Validation failed:", "")
      .split(",")
      .map((error: string) => error.split(": ").pop())

    setError({
      status: 400,
      message: errors,
    });
  } else if (err?.message?.startsWith("The image may not exceed 5mo.")) {
    errors = err?.message
    setError({
      status: 400,
      message: errors,
    });
  } else if (err?.message?.startsWith("The image format can only be jpeg or png.")) {
    errors = err?.message
    setError({
      status: 400,
      message: errors,
    });
  } else if (err?.message?.includes("username_1 dup key")) {
    return setError({ status: 400, message: "Username is used" })
  } else if (err?.message?.includes("email_1 dup key")) {
    return setError({ status: 400, message: "Email is used" })
  } else {
    return setError({
      status: err?.status,
      message: err?.message
    })
  }
}