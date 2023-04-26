import { Button, Divider, Grid, Typography } from "@mui/material";
import FormInput from "@/components/inputs/FormInput";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import Loading from "@/components/general/Loading";
import Validator from "@/utils/validator/Validator";
import { useRouter } from "next/router";
import { useCompany, useSubmitCompany } from "@/hooks/query/useCompanySettings";
import { useSnackbar } from "notistack";
import AddressAutoComplete from "../../inputs/AddressAutoComplete";

const SettingsForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["label", "error"]);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const validator = Validator("company");
  const router = useRouter();
  const { locale } = router;
  const { company, isCompanyLoading, isCompanyError } = useCompany(locale);

  const { mutate: submitCompany, isLoading: isSumbmitCompanyLoading } =
    useSubmitCompany({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: "success" });
      },
      onError: (message) => {
        enqueueSnackbar(message, { variant: "error" });
      },
    });

  if (isCompanyError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  if (isCompanyLoading || isSumbmitCompanyLoading) {
    return <Loading />;
  }

  return (
    <Grid container>
      <Grid item xs={12} mt={2} mb={2}>
        <Typography variant="h6">{t("generalInfo")}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          name={"name"}
          fullWidth
          id={"name"}
          label={t("companyName")}
          value={company?.name || ""}
          control={control}
          errors={errors}
          validation={validator.name}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"email"}
          name={"email"}
          id={"email"}
          label={t("email")}
          value={company?.email || ""}
          fullWidth
          control={control}
          errors={errors}
          validation={validator.email}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"phoneNumber"}
          name={"phoneNumber"}
          id={"phoneNumber"}
          label={t("phone")}
          value={company?.phoneNumber || ""}
          fullWidth
          control={control}
          errors={errors}
          validation={validator.phoneNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"website"}
          name={"website"}
          id={"website"}
          label={t("website")}
          value={company?.website || ""}
          fullWidth
          control={control}
          errors={errors}
          validation={validator.website}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("description")}
          name="description"
          control={control}
          errors={errors}
          rows={4}
          value={company?.description || ""}
          multiline
          validation={validator.description}
        />
      </Grid>
      <Grid item xs={12} mt={2} mb={3}>
        <Typography variant="h6">{t("addressDetails")}</Typography>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <AddressAutoComplete
          control={control}
          errors={errors}
          address={company?.addressLine1}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("addressLine2")}
          name="addressLine2"
          control={control}
          errors={errors}
          rows={4}
          value={company?.addressLine2 || ""}
          multiline
          validation={validator.addressLine2}
        />
      </Grid>
      <Grid item xs={12} mt={1}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit((data) => {
            return submitCompany({ locale, data, companyId: company?.id });
          })}
        >
          {t("saveSettings")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SettingsForm;
