import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import DataTable from "./DataTable";
import { useMemo, useState } from "react";
import { useSales } from "@/hooks/query/useSales";
import Loading from "../Loading";
import { useSnackbar } from "notistack";
import { Button, IconButton, colors, lighten } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";
import { useTheme } from "@emotion/react";

const SalesTable = () => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const theme = useTheme();

  const style = {
    "& .MuiDataGrid-row": {
      cursor: "pointer",
      ":hover": {
        backgroundColor: lighten(theme.palette.primary.main, 0.9),
      },
    },
    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
      {
        outline: "none",
      },
  };
  const { locale } = router;
  const [Modal, toggle, open] = useModal(false);
  const [currentSelected, setCurrentSelected] = useState(null);
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
    ];
  }, []);

  const { isSaleLoading, isSaleError, sales } = useSales(locale);

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
      <DataTable
        rows={sales}
        columns={columns}
        onRowClick={(params) => {
          setCurrentSelected(params.row.products);
          toggle(!open);
        }}
        sx={style}
      />
      <Modal title={t("saleDetails")} content={currentSelected} />
    </Box>
  );
};
export default SalesTable;
