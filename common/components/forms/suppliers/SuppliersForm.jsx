import { useTranslation } from "next-i18next";
import FormInput from "@/components/inputs/FormInput";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Validator from "@/utils/validator/Validator";
import AddressAutoComplete from "@/components/inputs/AddressAutoComplete";
import { useSubmitSupplier } from "@/hooks/query/useSupplier";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";
import { useRouter } from "next/router";

const SuppliersForm = ({ values }) => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { locale } = router;
  const validator = Validator("supplier/customer");
  const { mutate: submitSupplier, isLoading: isSubmitSupplierLoading } =
    useSubmitSupplier({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: "success" });
        router.push(`/${locale}/suppliers`);
      },
      onError: (message) => {
        enqueueSnackbar(message, { variant: "error" });
      },
    });
  if (values) values = JSON.parse(values);

  if (isSubmitSupplierLoading) return <Loading />;

  return (
    <Grid container>
      <Grid item xs={12} mt={2} mb={2}>
        <Typography variant="h6">{t("generalInfo")}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("supplierName")}
          name="name"
          control={control}
          errors={errors}
          validation={validator.name}
          value={values?.name || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("supplierSurname")}
          name="surname"
          control={control}
          errors={errors}
          validation={validator.surname}
          value={values?.surname || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("email")}
          name="email"
          control={control}
          errors={errors}
          validation={validator.email}
          value={values?.email || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("phone")}
          name="phoneNumber"
          control={control}
          errors={errors}
          validation={validator.phoneNumber}
          value={values?.phoneNumber || ""}
        />
      </Grid>
      <Grid item xs={12} mt={2} mb={2}>
        <Typography variant="h6">{t("addressDetails")}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} mt={2}>
        <AddressAutoComplete
          control={control}
          errors={errors}
          address={values?.addressLine1}
        />
      </Grid>
      <Grid item xs={12} mt={1}>
        <FormInput
          label={t("addressLine2")}
          name="addressLine2"
          control={control}
          errors={errors}
          rows={4}
          value={values?.addressLine2 || ""}
          multiline
          validation={validator.addressLine2}
        />
      </Grid>

      <Grid item xs={12} mt={1}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit((d) =>
            submitSupplier({
              data: d,
              locale,
              supplierId: values?.id,
            })
          )}
        >
          {t("save")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SuppliersForm;
