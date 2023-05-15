import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import SuppliersForm from "@/components/forms/suppliers/SuppliersForm";
import { useRouter } from "next/router";
import { useSupplierById } from "@/hooks/query/useSupplier";
import Loading from "@/components/general/Loading";
import { useSnackbar } from "notistack";
import { withHOC } from "@/hocs/ListHOC";

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

  return withHOC({
    title: t("editSupplier"),
    component: <SuppliersForm values={supplier} />,
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

SuppliersEdit.Layout = Layout;

export default SuppliersEdit;
