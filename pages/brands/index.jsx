import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BrandTable from "@/components/general/tables/BrandTable";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const Brands = () => {
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
          variant="h4"
          component="h1"
          sx={{
            color: "#3a3b45",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          {t("brands")}
        </Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <BrandTable />
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

Brands.Layout = Layout;

export default Brands;
