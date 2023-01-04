import PasswordInput from "@/components/inputs/PasswordInput";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

const NewPasswordForm = () => {
  const { t } = useTranslation("label");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
          type="password"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label={t("newPassword")}
          name="newPassword"
          type="password"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          fullWidth
          label={t("confirmPassword")}
          name="confirmPassword"
          type="password"
          control={control}
          errors={errors}
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
