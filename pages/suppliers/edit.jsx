import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import SuppliersForm from "@/components/forms/suppliers/SuppliersForm";
import { useRouter } from "next/router";
import { useSupplierById } from "@/hooks/query/useSupplier";
import Loading from "@/components/general/Loading";
import { useSnackbar } from "notistack";

const SuppliersEdit = () => {
  const { t } = useTranslation("label");
  const { query, locale } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { supplier, isSupplierLoading, isSupplierError, isFetching } =
    useSupplierById({
      locale,
      supplierId: query?.id,
    });

  if (isSupplierLoading || isFetching) return <Loading />;

  if (isSupplierError)
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
          {t("editSupplier")}
        </Typography>
      </Grid>
      <Grid item xs={12} p={1}>
        <SuppliersForm values={supplier} />
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
