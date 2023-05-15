import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { withHOC } from "@/hocs/ListHOC";
import PurchasesForm from "@/components/forms/purchases/PurchasesForm";

const PurchasesAdd = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("addANewPurchase"),
    component: <PurchasesForm />,
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

PurchasesAdd.Layout = Layout;

export default PurchasesAdd;
