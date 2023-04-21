import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import SuppliersForm from "@/components/forms/suppliers/SuppliersForm";

const SuppliersAdd = () => {
  const { t } = useTranslation("label");

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "primary.white",
        mt: 2,
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            color: "primary.pageTitle",
          }}
        >
          {t("addANewSupplier")}
        </Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <SuppliersForm />
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

SuppliersAdd.Layout = Layout;

export default SuppliersAdd;
