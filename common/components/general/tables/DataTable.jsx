import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  trTR,
  plPL,
} from "@mui/x-data-grid";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useArray from "@/hooks/useArray";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useCallback } from "react";
import Swal from "sweetalert2";

const DataTable = ({ columns, rows, ...other }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const rowList = useArray(rows);
  const theme = useTheme();
  const router = useRouter();
  const [localeText, setLocaleText] = useState({});
  const { t } = useTranslation("label");

  const tableLocale = useCallback(() => {
    if (router.locale === "tr") {
      setLocaleText(trTR.components.MuiDataGrid.defaultProps.localeText);
    } else if (router.locale === "pl") {
      setLocaleText(plPL.components.MuiDataGrid.defaultProps.localeText);
    }
  }, [router.locale]);

  useEffect(() => {
    tableLocale();
  }, [tableLocale]);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <ButtonGroup variant="text" aria-label="text button group">
          {selectedRows.length === 0 ? (
            <Button
              startIcon={<FontAwesomeIcon icon={faAdd} />}
              sx={{ fontSize: "0.8rem", color: theme.palette.primary.main }}
              onClick={() => {
                router.push({
                  pathname: router.pathname + "/add",
                });
              }}
            >
              {t("add")}
            </Button>
          ) : null}
          {selectedRows.length === 1 ? (
            <Button
              startIcon={<FontAwesomeIcon icon={faEdit} />}
              sx={{ fontSize: "0.8rem", color: theme.palette.primary.main }}
              onClick={() => {
                router.push({
                  pathname: router.pathname + "/edit",
                  query: { id: selectedRows[0].id },
                });
              }}
            >
              {t("edit")}
            </Button>
          ) : null}
          {selectedRows.length > 0 ? (
            <Button
              startIcon={<FontAwesomeIcon icon={faTrash} />}
              sx={{ fontSize: "0.8rem", color: theme.palette.primary.main }}
              onClick={() => {
                Swal.fire({
                  title: t("delete"),
                  text: t("deleteConfirmation"),
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: theme.palette.primary.success,
                  cancelButtonColor: theme.palette.primary.error,
                  confirmButtonText: t("yes"),
                  cancelButtonText: t("no"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    setSelectedRows([]);
                    Swal.fire(
                      t("deleted"),
                      t("deletedSuccessfully"),
                      "success"
                    );
                  }
                });
              }}
            >
              {t("delete")}
            </Button>
          ) : null}
          <GridToolbarFilterButton sx={{ color: theme.palette.primary.main }} />
          <GridToolbarColumnsButton
            sx={{ color: theme.palette.primary.main }}
          />
          <GridToolbarExport sx={{ color: theme.palette.primary.main }} />
        </ButtonGroup>
      </GridToolbarContainer>
    );
  };
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selected = rowList.value.filter((row) =>
            selectedIDs.has(row.id)
          );
          setSelectedRows(selected);
        }}
        localeText={{
          ...localeText,
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) =>
              Constants.pagination({
                from,
                to,
                count,
                locale: router.locale,
              }),
          },
        }}
        {...other}
      />
    </Box>
  );
};
export default DataTable;
