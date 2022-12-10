import ResponsiveSidebar from "@/components/layouts/ResponsiveSidebar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Products = () => {
  return <div>Products</div>;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Products.Layout = ResponsiveSidebar;

export default Products;
