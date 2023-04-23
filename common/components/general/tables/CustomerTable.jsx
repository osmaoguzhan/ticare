import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import DataTable from "./DataTable";
import { useMemo } from "react";
import { useCustomer } from "@/hooks/query/useCustomer";
import Loading from "../Loading";
import { useSnackbar } from "notistack";

const CustomerTable = () => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const columns = useMemo(() => {
    return [
      {
        field: "name",
        headerName: t("customerName"),
        flex: 1,
        editable: false,
      },
      {
        field: "surname",
        headerName: t("customerSurname"),
        flex: 1,
        editable: false,
      },
      {
        field: "email",
        headerName: t("email"),
        flex: 1,
        editable: false,
      },
      {
        field: "phoneNumber",
        headerName: t("phone"),
        flex: 1,
        editable: false,
      },
      {
        field: "addressLine1",
        headerName: t("addressLine1"),
        flex: 1,
        editable: false,
      },
      {
        field: "addressLine2",
        headerName: t("addressLine2"),
        flex: 1,
        editable: false,
      },
    ];
  }, []);

  const { isCustomerLoading, isCustomerError, customers } = useCustomer();

  if (isCustomerLoading) return <Loading />;

  if (isCustomerError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
      }}
    >
      <DataTable rows={customers} columns={columns} />
    </Box>
  );
};
export default CustomerTable;
