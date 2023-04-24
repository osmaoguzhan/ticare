import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import DataTable from "./DataTable";
import { useMemo } from "react";
import { useSales } from "@/hooks/query/useSales";
import Loading from "../Loading";
import { useSnackbar } from "notistack";
import { Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { salesTemplate } from "@/utils/Constants";

const SalesTable = () => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { locale } = router;
  const columns = useMemo(() => {
    return [
      {
        field: "title",
        headerName: t("title"),
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
        field: "totalPrice",
        headerName: t("totalPrice"),
        flex: 1,
        editable: false,
      },
      {
        field: "customer",
        headerName: t("customer"),
        flex: 1,
        editable: false,
      },
      {
        field: "date",
        headerName: t("date"),
        flex: 1,
        editable: false,
      },
      {
        field: "details",
        headerName: t("details"),
        flex: 1,
        editable: false,
        renderCell: (params) => (
          <IconButton
            color="primary"
            aria-label="details"
            onClick={() => {
              Swal.fire({
                title: params.row.title,
                html: salesTemplate(locale, params.row.products),
                confirmButtonText: "Ok",
              });
            }}
          >
            <FontAwesomeIcon icon={faFileInvoice} />
          </IconButton>
        ),
      },
    ];
  }, []);

  const { isSaleLoading, isSaleError, sales } = useSales();

  if (isSaleLoading) return <Loading />;

  if (isSaleError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
      }}
    >
      <DataTable rows={sales} columns={columns} />
    </Box>
  );
};
export default SalesTable;
