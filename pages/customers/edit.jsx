import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CustomersForm from "@/components/forms/customers/CustomersForm";
import { useRouter } from "next/router";
import { useCustomerById } from "@/hooks/query/useCustomer";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";
import { withHOC } from "@/hocs/ListHOC";

const CustomersEdit = () => {
  const { t } = useTranslation("label");
  const { query, locale } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { customer, isCustomerLoading, isCustomerError, isFetching } =
    useCustomerById({
      locale,
      customerId: query?.id,
    });

  if (isCustomerLoading || isFetching) return <Loading />;

  if (isCustomerError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return withHOC({
    title: t("editCustomer"),
    component: <CustomersForm values={customer} />,
  });
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

CustomersEdit.Layout = Layout;

export default CustomersEdit;
