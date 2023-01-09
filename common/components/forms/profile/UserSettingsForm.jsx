import SelectInput from "@/components/inputs/SelectInput";
import { Button, FormLabel, Grid, TextField } from "@mui/material";
import Constants from "@/utils/Constants";
import FormInput from "@/components/inputs/FormInput";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useTimezone } from "@/hooks/query/useTimezone";
import { useCurrency } from "@/hooks/query/useCurrency";
import Loading from "@/components/Loading";
import Validator from "@/utils/validator/Validator";

const UserSettingsForm = ({ locale, profile }) => {
  const { t } = useTranslation("label");
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const validator = Validator("profile");
  const { timezones, isTimezoneError, isTimezoneLoading } = useTimezone(locale);
  const { currencies, isCurrencyError, isCurrencyLoading } =
    useCurrency(locale);
  if (isTimezoneLoading || isCurrencyLoading) return <Loading />;
  if (isTimezoneError || isCurrencyError)
    return <div>Something went wrong.</div>;

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
          value={profile?.name}
          validation={validator.name}
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
          value={profile?.surname}
          validation={validator.surname}
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
          value={profile?.email}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"phoneNumber"}
          name={"phoneNumber"}
          id={"phoneNumber"}
          label={t("phone")}
          fullWidth
          control={control}
          errors={errors}
          value={profile?.phoneNumber}
          validation={validator.phoneNumber}
        />
      </Grid>
      <Grid item xs={12} mt={1.5}>
        <SelectInput
          name={"language"}
          label={t("language")}
          id={"language"}
          control={control}
          value={Constants.languageOptions[locale][profile.settings.language]}
          options={Constants.languageOptions[locale]}
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <SelectInput
          name={"timezones"}
          label={t("timezone")}
          id={"timezones"}
          control={control}
          value={timezones?.find((t) => t.key === profile.settings.timezone)}
          options={timezones}
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <SelectInput
          name={"currency"}
          label={t("currency")}
          id={"currency"}
          control={control}
          value={currencies?.find((c) => c.key === profile.settings.currency)}
          options={currencies}
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
