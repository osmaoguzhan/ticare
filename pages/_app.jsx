import { LoadingProvider } from "@/contexts/LoadingContext";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";
import "@fortawesome/fontawesome-svg-core/styles.css";

function Ticare({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
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
