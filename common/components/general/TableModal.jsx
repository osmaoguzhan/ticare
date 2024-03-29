import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from "@mui/material";
import { uniqueId } from "lodash";
import { useTranslation } from "next-i18next";
import { useCompany } from "@/hooks/query/useCompanySettings";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

const TableModal = ({ title, content, isOpen, onClose }) => {
  const { t } = useTranslation("label");
  const { locale } = useRouter();
  const { company: settings } = useCompany({
    locale,
    enabled: false,
  });
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Card style={style}>
        <CardHeader title={title} />
        <CardContent>
          <TableContainer
            sx={{
              minWidth: 300,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">{t("productName")}</TableCell>
                  <TableCell align="center">
                    {t("price") + " (" + settings?.currency?.symbol + ")"}
                  </TableCell>
                  <TableCell align="center">{t("quantity")}</TableCell>
                  <TableCell align="center">
                    {t("subtotal") + " (" + settings?.currency?.symbol + ")"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {content?.map((item, idx) => {
                  return (
                    <TableRow key={uniqueId()}>
                      <TableCell align="center">{item.item.name}</TableCell>
                      <TableCell align="center">{item.price}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">
                        {item.price * item.quantity}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <strong>{t("totalPrice")}: </strong>
                  </TableCell>
                  <TableCell align="right">
                    {settings?.currency?.symbol +
                      " " +
                      content
                        ?.map((item) => item.price * item.quantity)
                        .reduce((acc, value) => acc + value)
                        .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default TableModal;
