import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SalesForm from "@/components/forms/sales/SalesForm";
import { useSaleById } from "@/hooks/query/useSales";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";

const SalesEdit = () => {
  const { t } = useTranslation("label");
  const { query, locale } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { isSaleLoading, isSaleError, sale } = useSaleById({
    locale,
    saleId: query.id,
  });

  if (isSaleLoading) return <Loading />;

  if (isSaleError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

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
          {t("editSale")}
        </Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <SalesForm values={sale} />
      </Grid>
    </Grid>
  );
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

SalesEdit.Layout = Layout;

export default SalesEdit;
