import ResponsiveSidebar from "@/components/layouts/ResponsiveSidebar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Brands = () => {
  return <div>Brands</div>;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Brands.Layout = ResponsiveSidebar;

export default Brands;
