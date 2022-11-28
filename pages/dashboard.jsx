import Layout from "@/components/layouts/Layout";
import useLoading from "@/hooks/useLoading";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <div>This is the dashboard page</div>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Dashboard.Layout = Layout;

export default Dashboard;
