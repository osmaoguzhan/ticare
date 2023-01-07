import { LoadingProvider } from "@/contexts/LoadingContext";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

function Ticare({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default appWithTranslation(Ticare);
