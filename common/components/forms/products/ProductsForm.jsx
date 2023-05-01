import { useTranslation } from "next-i18next";
import FormInput from "@/components/inputs/FormInput";
import { Button, Grid, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import Validator from "@/utils/validator/Validator";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";
import { useRouter } from "next/router";
import { useSubmitProduct } from "@/hooks/query/useProduct";

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

  const { mutateAsync: submitProduct, isLoading: isSubmitProductLoading } =
    useSubmitProduct({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: "success" });
        router.push(`/${locale}/products`);
      },
      onError: (message) => {
        enqueueSnackbar(message, { variant: "error" });
      },
    });

  if (isSubmitProductLoading) return <Loading />;

  return (
    <Grid container spacing={2}>
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
          type="number"
        />
      </Grid>
      <Grid item xs={12} mt={1}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit(async (d) => {
            await submitProduct({
              locale,
              data: d,
              productId: values?.id,
            });
          })}
        >
          {t("save")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductsForm;
