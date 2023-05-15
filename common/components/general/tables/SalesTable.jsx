import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import DataTable from "./DataTable";
import { useMemo, useState } from "react";
import { useSales } from "@/hooks/query/useSales";
import Loading from "../Loading";
import { useSnackbar } from "notistack";
import { Typography, lighten, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";
import { useTheme } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "@/lib/sessionQuery";
import Constants from "@/utils/Constants";

const SalesTable = () => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const theme = useTheme();
  const [session, loading] = useSession();

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
    let cols = [
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
        renderCell: (params) => {
          return params.row.description || "-";
        },
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
        renderCell: (params) => {
          return `${params.row.customer?.name} ${params.row.customer?.surname}`;
        },
      },
      {
        field: "status",
        headerName: t("status"),
        flex: 1,
        editable: false,
        renderCell: (params) => {
          if (params.row.status === "PENDING") {
            return (
              <Typography>
                <FontAwesomeIcon
                  icon={faHourglass1}
                  color="darkorange"
                  size="lg"
                ></FontAwesomeIcon>{" "}
                {t("PENDING")}
              </Typography>
            );
          } else if (params.row.status === "COMPLETED") {
            return (
              <Typography>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color="green"
                  size="lg"
                ></FontAwesomeIcon>{" "}
                {t("COMPLETED")}
              </Typography>
            );
          }
        },
      },
      {
        field: "date",
        headerName: t("date"),
        flex: 1,
        editable: false,
        renderCell: (params) => {
          return new Date(params.row.createdAt).toLocaleDateString();
        },
      },
    ];
    if (session?.user?.role === Constants.ROLES.ADMIN) {
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
    }

    return cols;
  }, []);

  const { isSaleLoading, isSaleError, sales } = useSales(locale);

  if (isSaleLoading || loading) return <Loading />;

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
          setCurrentSelected(params.row.sales);
          toggle(!open);
        }}
        isRowSelectable={(params) =>
          params.row.status !== "COMPLETED" || session?.user?.role === "ADMIN"
        }
        sx={style}
      />
      <Modal title={t("saleDetails")} content={currentSelected} />
    </Box>
  );
};
export default SalesTable;
