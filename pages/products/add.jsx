import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import ProductsForm from "@/components/forms/products/ProductsForm";
import { withHOC } from "@/hocs/ListHOC";

const ProductsAdd = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("addANewProduct"),
    component: <ProductsForm />,
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

ProductsAdd.Layout = Layout;

export default ProductsAdd;
