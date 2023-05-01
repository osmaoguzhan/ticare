import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import DataTable from "./DataTable";
import { useMemo } from "react";
import Loading from "../Loading";
import { useSnackbar } from "notistack";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useProducts } from "@/hooks/query/useProduct";
import { useRouter } from "next/router";

const ProductTable = () => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const { locale } = useRouter();
  const columns = useMemo(() => {
    return [
      {
        field: "name",
        headerName: t("name"),
        flex: 1,
        editable: false,
      },
      {
        field: "description",
        headerName: t("description"),
        flex: 1,
        editable: false,
      },
      {
        field: "productType",
        headerName: t("productType"),
        flex: 1,
        editable: false,
      },
      {
        field: "purchasePrice",
        headerName: t("purchasePrice"),
        flex: 1,
        editable: false,
      },
      {
        field: "salePrice",
        headerName: t("salePrice"),
        flex: 1,
        editable: false,
      },
    ];
  }, []);
  const { isProductLoading, isProductError, products } = useProducts(locale);

  if (isProductLoading) return <Loading />;

  if (isProductError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
      }}
    >
      <DataTable rows={products} columns={columns} />
    </Box>
  );
};
export default ProductTable;
