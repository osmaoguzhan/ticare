import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Grid } from "@mui/material";
import useArray from "@/hooks/useArray";
import { useState } from "react";
import { useTheme } from "@emotion/react";

const DataTable = ({ columns, rows, ...other }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const rowList = useArray(rows);
  const theme = useTheme();

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <ButtonGroup variant="text" aria-label="text button group">
          {selectedRows.length === 0 ? (
            <Button
              startIcon={<FontAwesomeIcon icon={faAdd} />}
              sx={{ fontSize: "0.8rem", color: theme.palette.primary.main }}
            >
              Add
            </Button>
          ) : null}
          {selectedRows.length === 1 ? (
            <Button
              startIcon={<FontAwesomeIcon icon={faEdit} />}
              sx={{ fontSize: "0.8rem", color: theme.palette.primary.main }}
            >
              Edit
            </Button>
          ) : null}
          {selectedRows.length > 0 ? (
            <Button
              startIcon={<FontAwesomeIcon icon={faTrash} />}
              sx={{ fontSize: "0.8rem", color: theme.palette.primary.main }}
            >
              Delete
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
        selectionModel={selectedRows.map((item) => item["id"])}
        {...other}
      />
    </Box>
  );
};
export default DataTable;
