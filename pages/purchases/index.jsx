import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PurchasesTable from "@/components/general/tables/PurchasesTable";
import { withHOC } from "@/hocs/ListHOC";
import { useTranslation } from "next-i18next";

const Purchases = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("purchases"),
    component: <PurchasesTable />,
  });
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", [
        "label",
        "error",
        "tooltip",
      ])),
    },
  };
};

Purchases.Layout = Layout;
export default Purchases;
