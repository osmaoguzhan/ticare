import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import BrandsForm from "@/components/forms/brands/BrandsForm";

const SuppliersEdit = () => {
  const { t } = useTranslation("label");

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
          {t("editSupplier")}
        </Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <BrandsForm
          // TODO : Get data by id from API and pass it to the form
          values={{ name: "test", status: false, description: "rwerewrewrew" }}
        />
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

SuppliersEdit.Layout = Layout;

export default SuppliersEdit;
