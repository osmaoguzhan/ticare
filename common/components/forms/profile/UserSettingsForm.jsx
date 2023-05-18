import { Button, Grid } from "@mui/material";
import Constants from "@/utils/Constants";
import FormInput from "@/components/inputs/FormInput";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import Loading from "@/components/general/Loading";
import Validator from "@/utils/validator/Validator";
import { useUpdateProfile } from "@/hooks/query/useProfile";
import { useRouter } from "next/router";
import LanguageSelectInput from "@/components/inputs/LanguageSelectInput";
import { useSnackbar } from "notistack";

const UserSettingsForm = ({ profile }) => {
  const { t } = useTranslation(["label", "error", "tooltip"]);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const validator = Validator("profile");
  const router = useRouter();
  const { locale } = router;
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: updateProfile,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = useUpdateProfile({
    onSuccess: (lang, message) => {
      enqueueSnackbar(message, { variant: "success" });
      router.replace(router.asPath, router.asPath, { locale: lang });
    },
    onError: (message) => {
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  if (isUpdateLoading) return <Loading />;
  if (isUpdateError) {
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });
  }

  const onSubmit = (data) => {
    updateProfile({
      userid: profile.id,
      locale,
      data: {
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
        settings: {
          ...profile.settings,
          language: data.language.key,
        },
      },
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
          tooltip={t("tooltip:profileName")}
        />
      </Grid>
      <Grid item xs={12}>
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
          tooltip={t("tooltip:profileSurname")}
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
          tooltip={t("tooltip:profileEmail")}
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
          tooltip={t("tooltip:profilePhoneNumber")}
        />
      </Grid>
      <Grid item xs={12}>
        <LanguageSelectInput
          control={control}
          label={t("language")}
          value={Constants.languageOptions?.find(
            (l) => l.key === profile.settings.language
          )}
          tooltip={t("tooltip:language")}
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
