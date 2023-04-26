import { useTranslation } from "next-i18next";
import FormInput from "@/components/inputs/FormInput";
import { Button, Grid, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import Validator from "@/utils/validator/Validator";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";
import { useRouter } from "next/router";

const ProductsForm = ({ values }) => {
  const { t } = useTranslation("label");
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { locale } = router;
  const validator = Validator("product");

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <FormInput
          label={t("name")}
          name="name"
          control={control}
          errors={errors}
          value={values?.name || ""}
          validation={validator.name}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("description")}
          name="description"
          control={control}
          errors={errors}
          value={values?.description || ""}
          validation={validator.description}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("productType")}
          name="productType"
          control={control}
          errors={errors}
          value={values?.productType || ""}
          validation={validator.productType}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <FormInput
          label={t("salePrice")}
          name="salePrice"
          control={control}
          errors={errors}
          value={values?.salePrice || ""}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          validation={validator.salePrice}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <FormInput
          label={t("purchasePrice")}
          name="purchasePrice"
          control={control}
          errors={errors}
          value={values?.purchasePrice || ""}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          validation={validator.purchasePrice}
        />
      </Grid>
      <Grid item xs={12} mt={1}>
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

export default ProductsForm;
