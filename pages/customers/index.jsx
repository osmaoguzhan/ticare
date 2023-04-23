import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CustomerTable from "@/components/general/tables/CustomerTable";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const Customers = () => {
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
          {t("customers")}
        </Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <CustomerTable />
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

Customers.Layout = Layout;

export default Customers;
