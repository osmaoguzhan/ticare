import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ProductsForm from "@/components/forms/products/ProductsForm";
import { useProductById } from "@/hooks/query/useProduct";
import Loading from "@/components/general/Loading";
import { useSnackbar } from "notistack";
import { withHOC } from "@/hocs/ListHOC";

const ProductsEdit = () => {
  const { t } = useTranslation("label");
  const { query, locale } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = query;
  const { isProductLoading, isProductError, product } = useProductById({
    productId: id,
    locale,
  });

  if (isProductLoading) return <Loading />;

  if (isProductError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return withHOC({
    title: t("editProduct"),
    component: <ProductsForm values={product} />,
  });
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

ProductsEdit.Layout = Layout;

export default ProductsEdit;
