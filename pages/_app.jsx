import { LoadingProvider } from "@/contexts/LoadingContext";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";

function Ticare({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <CssBaseline />
      <LoadingProvider>
        {Component.Layout ? (
          <Component.Layout>
            <Component {...pageProps} />
          </Component.Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </LoadingProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(Ticare);
