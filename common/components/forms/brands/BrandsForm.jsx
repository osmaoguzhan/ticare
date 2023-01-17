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
          label={t("brandName")}
          name="brandName"
          control={control}
          errors={errors}
          validation={validator.name}
          value={values?.name || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectInput
          name={"status"}
          label={t("status")}
          id={"status"}
          control={control}
          value={
            values
              ? {
                  label: values?.status ? t("active") : t("inactive"),
                  key: values?.status,
                }
              : { label: t("active"), key: true }
          }
          options={[
            { label: t("active"), key: true },
            { label: t("inactive"), key: false },
          ]}
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
          validation={validator.description}
          value={values?.description || ""}
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
