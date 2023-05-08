import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import SalesTable from "@/components/general/tables/SalesTable";
import { withHOC } from "@/hocs/ListHOC";

const Sales = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("sales"),
    component: <SalesTable />,
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

Sales.Layout = Layout;

export default Sales;
