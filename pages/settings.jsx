import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import SettingsForm from "@/components/forms/settings/SettingsForm";
import { withHOC } from "@/hocs/ListHOC";

const Settings = () => {
  const { t } = useTranslation("label");

  return withHOC({
    title: t("settings"),
    component: <SettingsForm />,
  });
};

export const getServerSideProps = async (ctx) => {
  const { locale } = ctx;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Settings.Layout = Layout;

export default Settings;
