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
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Profile = ({ locale }) => {
  const { t } = useTranslation("label");
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#f8f9fc",
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
        md={12}
        lg={12}
        p={1}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <Grid item xs={12} sx={{ p: 1 }}>
          <Card sx={{ p: 2 }}>
            <CardHeader
              title={t("userSettings")}
              sx={{ backgroundColor: "#f8f9fc", color: "#4e73df" }}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <UserSettingsForm locale={locale} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ p: 1 }}>
          <Card sx={{ p: 2 }}>
            <CardHeader
              title={t("changePassword")}
              sx={{ backgroundColor: "#f8f9fc", color: "#4e73df" }}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <NewPasswordForm />
            </CardContent>
          </Card>
        </Grid>
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
