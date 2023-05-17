import { Button, Grid, Box, Typography, darken } from "@mui/material/";
import Link from "next/link";
import FormInput from "../../inputs/FormInput";
import PasswordInput from "../../inputs/PasswordInput";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import Swal from "sweetalert2";
import Constants from "@/utils/Constants";
import _ from "lodash";
import { useRouter } from "next/router";

const SigninForm = ({ handleOnSubmit, t }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const router = useRouter();

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant={"h4"}>{t("signIn")}</Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit((d) => handleOnSubmit(d))}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInput
              autoComplete={"email"}
              name={"email"}
              id={"email"}
              label={t("label:email")}
              fullWidth
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <PasswordInput
              autoComplete={"password"}
              name={"password"}
              id={"password"}
              label={t("password")}
              fullWidth
              control={control}
              errors={errors}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 1,
            backgroundColor: "primary.main",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: darken(theme.palette.primary.main, 0.4),
            },
          }}
        >
          {t("signIn")}
        </Button>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link href={"/auth/signup"}>{t("dontYouHaveAnAccount")}</Link>
          </Grid>
        </Grid>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link
              href={""}
              onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: t("forgottenPassword"),
                  html: t("forgotPasswordDescription"),
                  input: "text",
                  icon: "info",
                  showCancelButton: true,
                  confirmButtonText: t("submit"),
                  cancelButtonText: t("cancel"),
                  preConfirm: (email) => {
                    if (_.isNil(email.match(Constants.emailRegex))) {
                      Swal.showValidationMessage(t("error:invalidEmail"));
                      return;
                    }
                    return email;
                  },
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    const response = await (
                      await fetch(`/api/auth/forgot-password/${result.value}`, {
                        method: "GET",
                        headers: {
                          locale: router.locale,
                          "Content-Type": "application/json",
                        },
                      })
                    ).json();
                    Swal.fire({
                      title: response.success ? t("success") : t("error"),
                      text: response.message,
                      icon: response.success ? "success" : "error",
                    });
                  }
                });
              }}
            >
              {t("forgotPasswordQuestion")}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SigninForm;
