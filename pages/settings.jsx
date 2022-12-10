import ResponsiveSidebar from "@/components/layouts/ResponsiveSidebar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Settings = () => {
  return <div>Settings Page</div>;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Settings.Layout = ResponsiveSidebar;

export default Settings;
