import { appWithTranslation } from "next-i18next";

function Ticare({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(Ticare);
