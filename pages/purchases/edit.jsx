import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";
import { withHOC } from "@/hocs/ListHOC";
import { usePurchaseById } from "@/hooks/query/usePurchase";
import PurchasesForm from "@/components/forms/purchases/PurchasesForm";

const PurchasesEdit = () => {
  const { t } = useTranslation("label");
  const { query, locale } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { isPurchaseLoading, isPurchaseError, purchase } = usePurchaseById({
    locale,
    purchaseId: query.id,
  });

  if (isPurchaseLoading) return <Loading />;

  if (isPurchaseError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return withHOC({
    title: t("editPurchase"),
    component: <PurchasesForm values={purchase} />,
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

PurchasesEdit.Layout = Layout;

export default PurchasesEdit;
