import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import { getGridBooleanOperators } from "@mui/x-data-grid";
import { useTranslation } from "next-i18next";
import DataTable from "./DataTable";
import BrandsForm from "@/components/forms/brands/BrandsForm";

const BrandTable = () => {
  const theme = useTheme();
  const { t } = useTranslation("label");

  const columns = [
    {
      field: "name",
      headerName: t("brandName"),
      width: 100,
      editable: false,
    },
    {
      field: "isActive",
      headerName: t("isActive"),
      width: 100,
      editable: false,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              theme.palette.primary[params.row.isActive ? "success" : "error"],
            color: theme.palette.primary.white,
            borderRadius: 3,
            boxShadow: 2,
            padding: 0.5,
            width: 80,
            textAlign: "center",
          }}
        >
          {params.row.isActive ? t("active") : t("inactive")}
        </Box>
      ),
      filterOperators: getGridBooleanOperators(),
    },
    {
      field: "description",
      headerName: t("description"),
      width: 250,
      editable: false,
    },
  ];

  // TODO : Get data from API
  const rows = [
    { id: 1, name: "Snow", isActive: true, description: "Test deneme" },
    { id: 2, name: "Lannister", isActive: true, description: "Test deneme" },
    { id: 3, name: "Lannister", isActive: true, description: "Test deneme" },
    { id: 4, name: "Stark", isActive: true, description: "Test deneme" },
    { id: 5, name: "Targaryen", isActive: true, description: "Test deneme" },
    { id: 6, name: "Melisandre", isActive: true, description: "Test deneme" },
    { id: 7, name: "Clifford", isActive: false, description: "Test deneme" },
    { id: 8, name: "Frances", isActive: true, description: "Test deneme" },
    { id: 9, name: "Roxie", isActive: true, description: "Test deneme" },
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
