import { UserProvider } from "../contexts/user-context";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  const store: any = useStore();
  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <UserProvider initialUser={pageProps?.user}>
        <Component {...pageProps} />
      </UserProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
