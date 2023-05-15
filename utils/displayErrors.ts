import { Error } from "../types";

export const displayErrors = (err: any, setError:React.Dispatch<React.SetStateAction<Error>>) => {
    let errors = [];
      if (err?.message.startsWith("User validation failed")) {
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
      } else {
          if ( err?.message.includes("username_1 dup key"))
          {
            return setError({status: 400, message: "Username is used"})
          } else if(err?.message.includes("email_1 dup key"))
          {
            return setError({status: 400, message: "Email is used"})
          } else {
            return setError({status: err?.status,
               message: err?.message})
          }
      }
}