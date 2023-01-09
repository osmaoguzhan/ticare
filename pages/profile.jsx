import NewPasswordForm from "@/components/forms/profile/NewPasswordForm";
import UserSettingsForm from "@/components/forms/profile/UserSettingsForm";
import Layout from "@/components/layouts/Layout";
import { Grid, Typography } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TabMenu from "@/components/profile/TabMenu";
import { useProfile } from "@/hooks/query/useProfile";
import Loading from "@/components/Loading";

const Profile = ({ userid, locale }) => {
  const { t } = useTranslation("label");
  const { profile, isProfileError, isProfileLoading } = useProfile(
    userid,
    locale
  );

  if (isProfileLoading) return <Loading />;
  if (isProfileError) return <div>Something went wrong.</div>;

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "#3a3b45",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          {t("profile")}
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
        <TabMenu
          components={[
            <UserSettingsForm profile={profile} locale={locale} />,
            <NewPasswordForm />,
          ]}
          labels={[t("userSettings"), t("changePassword")]}
        />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async (ctx) => {
  const { locale, req } = ctx;
  return {
    props: {
      locale,
      userid: req.headers.userid,
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Profile.Layout = Layout;

export default Profile;
