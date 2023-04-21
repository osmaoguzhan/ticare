import Box from "@mui/material/Box";
import { getGridBooleanOperators } from "@mui/x-data-grid";
import { useTranslation } from "next-i18next";
import DataTable from "./DataTable";
import { useMemo } from "react";

const SupplierTable = () => {
  const { t } = useTranslation("label");

  const columns = useMemo(() => {
    return [
      {
        field: "name",
        headerName: t("supplierName"),
        flex: 1,
        editable: false,
      },
      {
        field: "surname",
        headerName: t("supplierSurname"),
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
        field: "address",
        headerName: t("address"),
        flex: 1,
        editable: false,
      },
    ];
  }, []);

  // TODO : Get data from API
  const rows = [
    {
      id: 1,
      name: "Snow",
      surname: "Snow",
      email: " Snow",
      phoneNumber: "Snow",
      address: "Snow",
    },
    {
      id: 2,
      name: "Lannister",
      surname: "Snow",
      email: " Snow",
      phoneNumber: "Snow",
      address: "Snow",
    },
    {
      id: 3,
      name: "Lannister",
      surname: "Snow",
      email: " Snow",
      phoneNumber: "Snow",
      address: "Snow",
    },
    {
      id: 4,
      name: "Stark",
      surname: "Snow",
      email: " Snow",
      phoneNumber: "Snow",
      address: "Snow",
    },
    {
      id: 5,
      name: "Targaryen",
      surname: "Snow",
      email: " Snow",
      phoneNumber: "Snow",
      address: "Snow",
    },
    {
      id: 6,
      name: "Melisandre",
      surname: "Snow",
      email: " Snow",
      phoneNumber: "Snow",
      address: "Snow",
    },
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
export default SupplierTable;
