import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CustomerTable from "@/components/general/tables/CustomerTable";
import { useTranslation } from "next-i18next";
import { withHOC } from "@/hocs/ListHOC";

const Customers = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("customers"),
    component: <CustomerTable />,
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

Customers.Layout = Layout;

export default Customers;
