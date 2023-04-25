import TableModal from "@/components/general/TableModal";
import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  const Modal = ({ children, ...props }) => (
    <TableModal isOpen={open} onClose={toggle} {...props}>
      {children}
    </TableModal>
  );

  return [Modal, toggle, open];
};

export default useModal;
