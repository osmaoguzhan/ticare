import { LoadingProvider } from "@/contexts/LoadingContext";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";

function Ticare({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider session={session}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
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
        </SnackbarProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(Ticare);
