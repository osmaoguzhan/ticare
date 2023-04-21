import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SupplierTable from "@/components/general/tables/SupplierTable";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const Suppliers = () => {
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
          variant="h4"
          component="h1"
          sx={{
            color: "primary.pageTitle",
          }}
        >
          {t("suppliers")}
        </Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <SupplierTable />
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

Suppliers.Layout = Layout;

export default Suppliers;
