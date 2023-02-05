import NewPasswordForm from "@/components/forms/profile/NewPasswordForm";
import UserSettingsForm from "@/components/forms/profile/UserSettingsForm";
import Layout from "@/components/layouts/Layout";
import { Grid, Typography } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TabMenu from "@/components/profile/TabMenu";
import { useProfile } from "@/hooks/query/useProfile";
import Loading from "@/components/general/Loading";
import { useRouter } from "next/router";

const Profile = ({ userid }) => {
  const { t } = useTranslation("label");
  const router = useRouter();
  const { locale } = router;
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
            <UserSettingsForm profile={profile} />,
            <NewPasswordForm userid={userid} />,
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
      userid: req.headers.userid,
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Profile.Layout = Layout;

export default Profile;
