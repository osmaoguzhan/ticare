import Layout from "@/components/layouts/Layout";
import NewPasswordForm from "@/components/forms/profile/NewPasswordForm";
import UserSettingsForm from "@/components/forms/profile/UserSettingsForm";
import { Grid, Typography } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TabMenu from "@/components/profile/TabMenu";
import { useProfile } from "@/hooks/query/useProfile";
import Loading from "@/components/general/Loading";
import { useRouter } from "next/router";
import SettingsForm from "@/components/forms/settings/SettingsForm";

const Settings = ({ userid }) => {
  const { t } = useTranslation("label");
  const router = useRouter();
  const { locale } = router;

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "primary.white",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "#3a3b45",
          }}
        >
          {t("settings")}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        p={1}
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SettingsForm userid={userid} />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async (ctx) => {
  const { locale, req } = ctx;
  return {
    props: {
      userid: req.headers.userid,
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Settings.Layout = Layout;

export default Settings;
