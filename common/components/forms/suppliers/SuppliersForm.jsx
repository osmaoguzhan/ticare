import { useTranslation } from "next-i18next";
import FormInput from "@/components/inputs/FormInput";
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import SelectInput from "@/components/inputs/SelectInput";
import Validator from "@/utils/validator/Validator";

const BrandsForm = (props) => {
  const { t } = useTranslation("label");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const validator = Validator("brand");
  const { values } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormInput
          label={t("supplierName")}
          name="supplierName"
          control={control}
          errors={errors}
          validation={validator.name}
          value={values?.name || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("supplierSurname")}
          name="supplierSurname"
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
          label={t("phoneNumber")}
          name="phoneNumber"
          control={control}
          errors={errors}
          validation={validator.phoneNumber}
          value={values?.phoneNumber || ""}
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

export default BrandsForm;
