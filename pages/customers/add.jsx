import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CustomersForm from "@/components/forms/customers/CustomersForm";
import { withHOC } from "@/hocs/ListHOC";

const CustomersAdd = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("addANewCustomer"),
    component: <CustomersForm />,
  });
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

CustomersAdd.Layout = Layout;

export default CustomersAdd;
