import { UserProvider } from "../contexts/user-context";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { Suspense } from "react";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  const store: any = useStore();
  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <UserProvider initialUser={pageProps?.user}>
        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />
        </Suspense>
      </UserProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
