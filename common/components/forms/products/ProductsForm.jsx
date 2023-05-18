import { useTranslation } from "next-i18next";
import FormInput from "@/components/inputs/FormInput";
import { Button, Grid, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import Validator from "@/utils/validator/Validator";
import { useSnackbar } from "notistack";
import Loading from "@/components/general/Loading";
import { useRouter } from "next/router";
import { useSubmitProduct } from "@/hooks/query/useProduct";
import { useSession } from "@/lib/sessionQuery";
import SelectInput from "@/components/inputs/SelectInput";
import { useCompanies } from "@/hooks/query/useCompanies";
import Constants from "@/utils/Constants";
import { useCompany } from "@/hooks/query/useCompanySettings";

const ProductsForm = ({ values }) => {
  const { t } = useTranslation(["label", "tooltip"]);
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { locale } = router;
  const { company: settings } = useCompany({
    locale,
    enabled: false,
  });
  const validator = Validator("product");
  const [session, loading] = useSession();

  const { mutateAsync: submitProduct, isLoading: isSubmitProductLoading } =
    useSubmitProduct({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: "success" });
        let path =
          session?.user?.role === Constants.ROLES.ADMIN
            ? `/${locale}/admin/products`
            : `/${locale}/products`;
        router.push(path);
      },
      onError: (message) => {
        enqueueSnackbar(message, { variant: "error" });
      },
    });
  const { isCompaniesLoading, isCompaniesError, companies } = useCompanies(
    locale,
    session?.user?.role
  );

  if (
    loading ||
    (session?.user?.role === Constants.ROLES.ADMIN && isCompaniesLoading) ||
    isSubmitProductLoading
  ) {
    return <Loading />;
  }

  if (isCompaniesError) {
    enqueueSnackbar(t("error:general"), { variant: "error" });
  }

  return (
    <Grid container spacing={2}>
      {session?.user?.role === Constants.ROLES.ADMIN && (
        <Grid item xs={12}>
          <SelectInput
            name={"companies"}
            label={t("companies")}
            id={"companies"}
            control={control}
            options={companies}
            tooltip={t("tooltip:companiesField")}
            value={values?.company || null}
            disabled={!!values?.company}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <FormInput
          label={t("name")}
          name="name"
          control={control}
          errors={errors}
          value={values?.name || ""}
          validation={validator.name}
          tooltip={t("tooltip:productName")}
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
          tooltip={t("tooltip:productDescription")}
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
          tooltip={t("tooltip:productType")}
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
            startAdornment: (
              <InputAdornment position="start">
                {settings?.currency?.symbol}
              </InputAdornment>
            ),
          }}
          validation={validator.salePrice}
          type="number"
          tooltip={t("tooltip:productSalePrice")}
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
            startAdornment: (
              <InputAdornment position="start">
                {settings?.currency?.symbol}
              </InputAdornment>
            ),
          }}
          validation={validator.purchasePrice}
          type="number"
          tooltip={t("tooltip:productPurchasePrice")}
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
