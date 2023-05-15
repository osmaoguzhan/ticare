import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import SuppliersForm from "@/components/forms/suppliers/SuppliersForm";
import { withHOC } from "@/hocs/ListHOC";

const SuppliersAdd = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("addANewSupplier"),
    component: <SuppliersForm />,
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

SuppliersAdd.Layout = Layout;

export default SuppliersAdd;
