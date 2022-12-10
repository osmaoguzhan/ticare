import ResponsiveSidebar from "@/components/layouts/ResponsiveSidebar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Profile = () => {
  return <div>Profile Page</div>;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Profile.Layout = ResponsiveSidebar;

export default Profile;
