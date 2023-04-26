import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import SuppliersForm from "@/components/forms/suppliers/SuppliersForm";
import { useRouter } from "next/router";
import ProductsForm from "@/components/forms/products/ProductsForm";

const ProductsEdit = () => {
  const { t } = useTranslation("label");
  const { query } = useRouter();

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "primary.white",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            color: "primary.pageTitle",
          }}
        >
          {t("editProduct")}
        </Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <ProductsForm values={query?.data} />
      </Grid>
    </Grid>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

ProductsEdit.Layout = Layout;

export default ProductsEdit;
