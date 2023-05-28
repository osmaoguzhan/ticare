import { Button, Grid, Box, Typography, darken } from "@mui/material/";
import PasswordInput from "../../inputs/PasswordInput";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import Swal from "sweetalert2";
import _ from "lodash";
import { useTranslation } from "next-i18next";
import Validator from "@/utils/validator/Validator";
import { useForgotPassword } from "@/hooks/query/useForgotPassword";
import bcrypt from "bcryptjs";
import useLoading from "@/hooks/useLoading";
import { useRouter } from "next/router";

const ResetPasswordForm = ({ userid, token }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const { t } = useTranslation(["label"]);
  const validator = Validator("signup");
  const { setLoading } = useLoading();
  const router = useRouter();

  const { mutateAsync: updatePassword, isLoading: isPasswordLoading } =
    useForgotPassword({
      onSuccess: (message) => {
        setLoading(false);
        Swal.fire({
          title: t("success"),
          text: message,
          icon: "success",
          confirmButtonText: t("ok"),
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/auth/signin");
          }
        });
      },
      onError: (error) => {
        setLoading(false);
        Swal.fire({
          title: t("error"),
          text: error,
          icon: "error",
          confirmButtonText: t("ok"),
        });
      },
    });
  if (isPasswordLoading) return setLoading(true);

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px",
      }}
    >
      <Typography variant={"h4"}>{t("resetPassword")}</Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit(async (d) => {
          delete d.passwordRepeat;
          d.password = await bcrypt.hash(d.password, 10);
          updatePassword({
            userid,
            locale: router.locale,
            token,
            password: d.password,
          });
        })}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PasswordInput
              autoComplete={"password"}
              name={"password"}
              id={"password"}
              label={t("password")}
              fullWidth
              control={control}
              errors={errors}
              validation={validator.password}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordInput
              autoComplete={"password"}
              name={"passwordRepeat"}
              id={"passwordRepeat"}
              label={t("passwordRepeat")}
              fullWidth
              control={control}
              errors={errors}
              validation={validator.passwordRepeat(watch("password"))}
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
          {t("resetPassword")}
        </Button>
      </Box>
    </Grid>
  );
};

export default ResetPasswordForm;
