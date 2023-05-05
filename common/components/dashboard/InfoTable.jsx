import * as React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { uniqueId } from "lodash";

const InfoTable = ({ title, headers, rows, isCustomer = false }) => {
  return (
    <>
      <Typography variant="p" sx={{ mb: 2, fontWeight: "bold" }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={uniqueId()}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {isCustomer ? row.customer : row.title}
                </TableCell>
                <TableCell align="left">{row.totalPrice}</TableCell>
                <TableCell align="left">
                  {isCustomer ? row.count : row.createdAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InfoTable;
