import PasswordInput from "@/components/inputs/PasswordInput";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Validator from "@/utils/validator/Validator";
import { usePasswordMutation } from "@/hooks/query/usePasswordMutation";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import bcrypt from "bcryptjs";
import Loading from "@/components/Loading";
import { encrypt } from "@/utils/helpers/cipher";

const NewPasswordForm = ({ userid }) => {
  const { t } = useTranslation("label");
  usePasswordMutation;
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const validator = Validator("password");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: updatePassword, isLoading: isPasswordLoading } =
    usePasswordMutation({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: "success" });
        reset(
          {},
          {
            keepValues: false,
          }
        );
      },
      onError: (error) => {
        enqueueSnackbar(error, { variant: "error" });
      },
    });
  if (isPasswordLoading) return <Loading />;

  const onSubmit = async (data) => {
    delete data.confirmPassword;
    data.newPassword = await bcrypt.hash(data.newPassword, 10);
    data.currentPassword = JSON.stringify(encrypt(data.currentPassword));
    updatePassword({ userid, locale: router.locale, data });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label={t("currentPassword")}
          name="currentPassword"
          control={control}
          errors={errors}
          validation={validator.currentPassword}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label={t("newPassword")}
          name="newPassword"
          control={control}
          errors={errors}
          validation={validator.password(watch("currentPassword"))}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label={t("confirmPassword")}
          name="confirmPassword"
          control={control}
          errors={errors}
          validation={validator.passwordRepeat(watch("newPassword"))}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: "#4e73df",
            color: "white",
            mt: 2,
          }}
        >
          {t("updatePassword")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewPasswordForm;
