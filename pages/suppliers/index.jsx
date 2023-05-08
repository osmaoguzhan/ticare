import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SupplierTable from "@/components/general/tables/SupplierTable";
import { useTranslation } from "next-i18next";
import { withHOC } from "@/hocs/ListHOC";

const Suppliers = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("suppliers"),
    component: <SupplierTable />,
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

Suppliers.Layout = Layout;

export default Suppliers;
