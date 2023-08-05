import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { UserProvider } from "../contexts/user-context";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
const Loading = dynamic(() => import("../components/Loading"), { ssr: false });
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const store: any = useStore();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <UserProvider initialUser={pageProps?.user}>
        {loading ? (
          <Loading className="flex h-screen items-center justify-center" />
        ) : (
          <Component {...pageProps} />
        )}
      </UserProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
