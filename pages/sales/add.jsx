import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import SalesForm from "@/components/forms/sales/SalesForm";
import { withHOC } from "@/hocs/ListHOC";

const SalesAdd = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("addANewSale"),
    component: <SalesForm />,
  });
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

SalesAdd.Layout = Layout;

export default SalesAdd;
