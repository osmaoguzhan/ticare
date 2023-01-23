import SelectInput from "@/components/inputs/SelectInput";
import { Button, Grid } from "@mui/material";
import Constants from "@/utils/Constants";
import FormInput from "@/components/inputs/FormInput";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useTimezone } from "@/hooks/query/useTimezone";
import { useCurrency } from "@/hooks/query/useCurrency";
import Loading from "@/components/general/Loading";
import Validator from "@/utils/validator/Validator";
import { useUpdateProfile } from "@/hooks/query/useProfile";
import { useRouter } from "next/router";
import LanguageSelectInput from "@/components/inputs/LanguageSelectInput";
import { useSnackbar } from "notistack";

const SettingsForm = ({ profile }) => {
  const { t } = useTranslation(["label", "error"]);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const router = useRouter();
  const { locale } = router;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormInput
          name={"name"}
          fullWidth
          id={"name"}
          label={t("companyName")}
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"country"}
          name={"country"}
          id={"country"}
          label={t("country")}
          fullWidth
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"city"}
          name={"city"}
          id={"city"}
          label={t("city")}
          fullWidth
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"address"}
          name={"address"}
          id={"address"}
          label={t("address")}
          fullWidth
          control={control}
          errors={errors}
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
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("description")}
          name="description"
          control={control}
          errors={errors}
          rows={4}
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#4e73df", mt: 2 }}
          onClick={handleSubmit((data) => console.log(data))}
        >
          {t("saveSettings")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SettingsForm;
