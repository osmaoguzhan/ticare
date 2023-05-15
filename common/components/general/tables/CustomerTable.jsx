import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import DataTable from "./DataTable";
import { useMemo } from "react";
import { useCustomer, useDeleteCustomer } from "@/hooks/query/useCustomer";
import Loading from "../Loading";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { Tooltip, Typography } from "@mui/material";
import { useSession } from "@/lib/sessionQuery";

const CustomerTable = () => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const { locale } = useRouter();
  const [session, loading] = useSession();
  const columns = useMemo(() => {
    let cols = [
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

        renderCell: (params) => {
          return (
            <Tooltip title={params.row.addressLine1} placement="top">
              <Typography noWrap>{params.row.addressLine1}</Typography>
            </Tooltip>
          );
        },
      },
      {
        field: "addressLine2",
        headerName: t("addressLine2"),
        flex: 1,
        editable: false,

        renderCell: (params) => {
          return (
            <Tooltip title={params.row.addressLine2} placement="top">
              <Typography noWrap>{params.row.addressLine2}</Typography>
            </Tooltip>
          );
        },
      },
    ];
    if (session?.user?.role === "ADMIN")
      cols.push({
        field: "companyName",
        headerName: t("company"),
        flex: 1,
        editable: false,
        renderCell: (params) => {
          return (
            <Tooltip title={params.row.companyName} placement="top">
              <Typography noWrap>{params.row.companyName}</Typography>
            </Tooltip>
          );
        },
      });
    return cols;
  }, []);

  const { isCustomerLoading, isCustomerError, customers } = useCustomer(locale);
  const { mutateAsync: deleteCustomer, isLoading: isDeleteCustomerLoading } =
    useDeleteCustomer({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: "success" });
      },
      onError: (message) => {
        enqueueSnackbar(message, { variant: "error" });
      },
    });

  if (isCustomerLoading || loading || isDeleteCustomerLoading)
    return <Loading />;

  if (isCustomerError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
      }}
    >
      <DataTable
        rows={customers}
        columns={columns}
        deleteFunc={deleteCustomer}
      />
    </Box>
  );
};
export default CustomerTable;
