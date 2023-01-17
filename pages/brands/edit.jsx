import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import BrandsForm from "@/components/forms/brands/BrandsForm";

const BrandsEdit = () => {
  const { t } = useTranslation("label");

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            color: "#3a3b45",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          {t("addANewBrand")}
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

BrandsEdit.Layout = Layout;

export default BrandsEdit;
