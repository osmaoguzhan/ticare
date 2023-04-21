import { useTranslation } from "next-i18next";
import FormInput from "@/components/inputs/FormInput";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import Validator from "@/utils/validator/Validator";
import AddressAutoComplete from "@/components/inputs/AddressAutoComplete";

const SuppliersForm = (props) => {
  const { t } = useTranslation("label");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const validator = Validator("supplier");
  const { values } = props;

  return (
    <Grid container spacing={2}>
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
      <Grid item xs={12} mt={2}>
        <AddressAutoComplete
          control={control}
          errors={errors}
          address={values?.addressLine1}
        />
      </Grid>
      <Grid item xs={12}>
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

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit((d) => console.log(d))}
        >
          {t("save")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SuppliersForm;
