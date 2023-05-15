import { useTranslation } from "next-i18next";
import FormInput from "@/components/inputs/FormInput";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Validator from "@/utils/validator/Validator";
import AddressAutoComplete from "@/components/inputs/AddressAutoComplete";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useSubmitCustomer } from "@/hooks/query/useCustomer";
import { useSession } from "@/lib/sessionQuery";
import SelectInput from "@/components/inputs/SelectInput";
import { useCompanies } from "@/hooks/query/useCompanies";
import Constants from "@/utils/Constants";
import Loading from "@/components/general/Loading";

const CustomersForm = ({ values }) => {
  const { t } = useTranslation(["label", "tooltip"]);
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { locale } = router;
  const validator = Validator("supplier/customer");
  const [session, loading] = useSession();
  const { mutate: submitCustomer, isLoading: isSubmitCustomerLoading } =
    useSubmitCustomer({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: "success" });
        let path =
          session?.user?.role === Constants.ROLES.ADMIN
            ? `/${locale}/admin/customers`
            : `/${locale}/customers`;
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
    isSubmitCustomerLoading
  ) {
    return <Loading />;
  }

  if (isCompaniesError) {
    enqueueSnackbar(t("error:general"), { variant: "error" });
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} mt={2} mb={2}>
        <Typography variant="h6">{t("generalInfo")}</Typography>
        <Divider />
      </Grid>
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
          label={t("customerName")}
          name="name"
          control={control}
          errors={errors}
          validation={validator.name}
          value={values?.name || ""}
          tooltip={t("tooltip:customerName")}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          label={t("customerSurname")}
          name="surname"
          control={control}
          errors={errors}
          validation={validator.surname}
          value={values?.surname || ""}
          tooltip={t("tooltip:customerSurname")}
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
          tooltip={t("tooltip:emailAddress")}
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
          tooltip={t("tooltip:phoneNumber")}
        />
      </Grid>
      <Grid item xs={12} mt={2} mb={1}>
        <Typography variant="h6">{t("addressDetails")}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
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
          tooltip={t("tooltip:addressLine2")}
        />
      </Grid>
      <Grid item xs={12} mt={1}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit((d) =>
            submitCustomer({
              data: d,
              locale,
              customerId: values?.id,
            })
          )}
        >
          {t("save")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CustomersForm;
