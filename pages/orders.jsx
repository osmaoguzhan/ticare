import ResponsiveSidebar from "@/components/layouts/ResponsiveSidebar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Orders = () => {
  return <div>Orders</div>;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Orders.Layout = ResponsiveSidebar;

export default Orders;
