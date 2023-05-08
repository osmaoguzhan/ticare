import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ProductTable from "@/components/general/tables/ProductTable";
import { withHOC } from "@/hocs/ListHOC";

const Products = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("products"),
    component: <ProductTable />,
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

Products.Layout = Layout;

export default Products;
