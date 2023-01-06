import NewPasswordForm from "@/components/forms/profile/NewPasswordForm";
import UserSettingsForm from "@/components/forms/profile/UserSettingsForm";
import FormInput from "@/components/inputs/FormInput";
import Layout from "@/components/layouts/Layout";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormLabel,
  Grid,
  Box,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TabMenu from "@/components/profile/TabMenu";

const Profile = ({ locale }) => {
  const { t } = useTranslation("label");
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
            <UserSettingsForm locale={locale} />,
            <NewPasswordForm />,
            <NewPasswordForm />,
            <NewPasswordForm />,
          ]}
          labels={[
            "User Settings",
            "Change Password",
            "Company Settings",
            "Delete Account",
          ]}
        />
      </Grid>
    </Grid>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Profile.Layout = Layout;

export default Profile;
