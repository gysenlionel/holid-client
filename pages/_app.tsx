import { UserProvider } from "../contexts/user-context";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider initialUser={pageProps?.user}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
