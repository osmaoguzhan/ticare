import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SalesForm from "@/components/forms/sales/SalesForm";
import { useSaleById } from "@/hooks/query/useSales";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";
import { withHOC } from "@/hocs/ListHOC";

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

  return withHOC({
    title: t("editSale"),
    component: <SalesForm values={sale} />,
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

SalesEdit.Layout = Layout;

export default SalesEdit;
