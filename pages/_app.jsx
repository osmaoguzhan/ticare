import { LoadingProvider } from "@/contexts/LoadingContext";
import { appWithTranslation } from "next-i18next";

function Ticare({ Component, pageProps }) {
  return (
    <LoadingProvider>
      <Component {...pageProps} />
    </LoadingProvider>
  );
}

export default appWithTranslation(Ticare);
