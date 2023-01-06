import SelectInput from "@/components/inputs/SelectInput";
import { Button, FormLabel, Grid, TextField } from "@mui/material";
import Constants from "@/utils/Constants";
import FormInput from "@/components/inputs/FormInput";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

const UserSettingsForm = ({ locale }) => {
  const { t } = useTranslation("label");
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6} lg={6}>
        <FormInput
          autoComplete={"name"}
          name={"name"}
          fullWidth
          id={"name"}
          label={t("name")}
          control={control}
          errors={errors}
          // validation={validator.name}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <FormInput
          autoComplete={"surname"}
          name={"surname"}
          id={"surname"}
          label={t("surname")}
          fullWidth
          control={control}
          errors={errors}
          // validation={validator.surname}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"email"}
          name={"email"}
          id={"email"}
          label={t("email")}
          fullWidth
          control={control}
          errors={errors}
          disabled
          // validation={validator.email}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"phone"}
          name={"phone"}
          id={"phone"}
          label={t("phone")}
          fullWidth
          control={control}
          errors={errors}
          // validation={validator.email}
        />
      </Grid>
      <Grid item xs={12} mt={1.5}>
        <SelectInput
          name={"language"}
          label={"Language"}
          id={"language"}
          control={control}
          options={Constants.languageOptions[locale]}
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <SelectInput
          name={"language"}
          label={"Language"}
          id={"language"}
          control={control}
          options={Constants.languageOptions[locale]}
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <SelectInput
          name={"language"}
          label={"Language"}
          id={"language"}
          control={control}
          options={Constants.languageOptions[locale]}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#4e73df", mt: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          {t("saveSettings")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserSettingsForm;
