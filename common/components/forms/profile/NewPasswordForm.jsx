import PasswordInput from "@/components/inputs/PasswordInput";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Validator from "@/utils/validator/Validator";

const NewPasswordForm = () => {
  const { t } = useTranslation("label");
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const validator = Validator("password");

  const onSubmit = (data) => {
    console.log(data);
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
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label={t("newPassword")}
          name="newPassword"
          control={control}
          errors={errors}
          validation={validator.password}
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
