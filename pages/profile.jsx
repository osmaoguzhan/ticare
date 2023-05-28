import NewPasswordForm from "@/components/forms/profile/NewPasswordForm";
import UserSettingsForm from "@/components/forms/profile/UserSettingsForm";
import Layout from "@/components/layouts/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TabMenu from "@/components/profile/TabMenu";
import { useProfile } from "@/hooks/query/useProfile";
import Loading from "@/components/general/Loading";
import { useRouter } from "next/router";
import { withHOC } from "@/hocs/ListHOC";
import { useSnackbar } from "notistack";

const Profile = ({ userid }) => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { locale } = router;
  const { profile, isProfileError, isProfileLoading } = useProfile(
    userid,
    locale
  );

  if (isProfileLoading) return <Loading />;
  if (isProfileError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  return withHOC({
    title: t("profile"),
    component: (
      <TabMenu
        components={[
          <UserSettingsForm profile={profile} key={"profile"} />,
          <NewPasswordForm userid={userid} key={"password"} />,
        ]}
        labels={[t("userSettings"), t("changePassword")]}
      />
    ),
  });
};

export const getServerSideProps = async (ctx) => {
  const { locale, req } = ctx;
  return {
    props: {
      userid: req.headers.userid,
      ...(await serverSideTranslations(locale ?? "gb", [
        "label",
        "error",
        "tooltip",
      ])),
    },
  };
};

Profile.Layout = Layout;

export default Profile;
