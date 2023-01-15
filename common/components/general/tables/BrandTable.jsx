import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import DataTable from "./DataTable";

const BrandTable = () => {
  const theme = useTheme();

  const columns = [
    {
      field: "name",
      headerName: "Brand Name",
      width: 100,
      editable: false,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              theme.palette.primary[params.row.isActive ? "success" : "error"],
            color: "white",
            borderRadius: 3,
            boxShadow: 2,
            padding: 0.5,
            width: 75,
            textAlign: "center",
          }}
        >
          {params.row.isActive ? "Active" : "Inactive"}
        </Box>
      ),
    },
  ];

  const rows = [
    { id: 1, name: "Snow", isActive: true },
    { id: 2, name: "Lannister", isActive: true },
    { id: 3, name: "Lannister", isActive: true },
    { id: 4, name: "Stark", isActive: true },
    { id: 5, name: "Targaryen", isActive: true },
    { id: 6, name: "Melisandre", isActive: true },
    { id: 7, name: "Clifford", isActive: false },
    { id: 8, name: "Frances", isActive: true },
    { id: 9, name: "Roxie", isActive: true },
  ];
  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
      }}
    >
      <DataTable rows={rows} columns={columns} />
    </Box>
  );
};
export default BrandTable;
