import SelectInput from "@/components/inputs/SelectInput";
import { Button, Grid } from "@mui/material";
import FormInput from "@/components/inputs/FormInput";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import Loading from "@/components/general/Loading";
import Validator from "@/utils/validator/Validator";
import { useRouter } from "next/router";
import {
  useCitiesByState,
  useCountries,
  useCountryData,
} from "@/hooks/query/useCountry";
import { useCompany, useSubmitCompany } from "@/hooks/query/useCompanySettings";
import { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { useSnackbar } from "notistack";

const SettingsForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["label", "error"]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });
  const validator = Validator("company");
  const router = useRouter();
  const { locale } = router;
  const { company, isCompanyLoading, isCompanyError } = useCompany(locale);
  const [countryId, setCountryId] = useState(
    company?.address?.country?.key || ""
  );
  const [stateId, setStateId] = useState(company?.address?.state?.key || "");
  const { countries, isCountryLoading } = useCountries(locale);
  const { countryData, refetchCountryData, isCountryDataFetching } =
    useCountryData(locale, countryId);
  const { cities, refetchCities, isCityFetching } = useCitiesByState(
    locale,
    stateId,
    countryId
  );

  const { mutate: submitCompany, isLoading: isSumbmitCompanyLoading } =
    useSubmitCompany({
      onSuccess: (message) => {
        enqueueSnackbar(message, { variant: "success" });
      },
      onError: (message) => {
        enqueueSnackbar(message, { variant: "error" });
      },
    });

  const refetchStatesCallback = useCallback(() => {
    if (countryId) refetchCountryData();
    if (!!!company) {
      reset(
        (formValues) => ({
          ...formValues,
          state: null,
          city: null,
        }),
        { keepErrors: true }
      );
      setStateId("");
    }
  }, [countryId]);

  const refetchCitiesCallback = useCallback(() => {
    if (stateId) refetchCities();
    if (!!!company) {
      reset(
        (formValues) => ({
          ...formValues,
          city: null,
        }),
        { keepErrors: true }
      );
    }
  }, [stateId]);

  useEffect(() => {
    refetchStatesCallback();
  }, [refetchStatesCallback]);

  useEffect(() => {
    refetchCitiesCallback();
  }, [refetchCitiesCallback]);

  if (isCompanyError)
    enqueueSnackbar(t("error:somethingWentWrong"), { variant: "error" });

  if (
    isCountryLoading ||
    isCountryDataFetching ||
    isCityFetching ||
    isCompanyLoading ||
    isSumbmitCompanyLoading
  ) {
    return <Loading />;
  }

  return (
    <Grid container spacing={0.5}>
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
      <Grid item xs={12} md={6} lg={6} sx={{ mt: 1.5 }}>
        <SelectInput
          name={"country"}
          id={"country"}
          label={t("country")}
          fullWidth
          control={control}
          errors={errors}
          options={countries}
          value={
            company
              ? company?.address?.country
              : countries?.find((c) => c.key === countryId)
          }
          onChange={(value) => {
            setCountryId(value);
          }}
          isEmpty={true}
          validation={validator.country}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} sx={{ mt: 1.5 }}>
        <SelectInput
          name={"state"}
          id={"state"}
          label={t("city-state")}
          fullWidth
          control={control}
          errors={errors}
          onChange={(value) => {
            setStateId(value);
          }}
          options={countryData?.states || []}
          value={company ? company?.address?.state : null}
          disabled={
            company ? _.isNil(company?.address?.state) : countryId === ""
          }
          isEmpty={_.isNil(company?.address?.state)}
          validation={validator["state-city"]}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ mt: 1.6, display: cities?.length === 0 ? "none" : "flex" }}
      >
        <SelectInput
          name={"city"}
          id={"city"}
          label={t("city-district")}
          fullWidth
          control={control}
          errors={errors}
          options={cities || []}
          value={company ? company?.address?.city : null}
          disabled={company ? _.isNil(company?.address?.city) : _.isNil(cities)}
          isEmpty={_.isNil(company?.address?.city)}
          validation={validator["city-district"](!_.isNil(cities))}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"zipCode"}
          name={"zipCode"}
          id={"zipCode"}
          label={t("zipCode")}
          fullWidth
          control={control}
          errors={errors}
          value={company?.address?.zipCode || ""}
          disabled={company ? _.isNil(company) : _.isNil(countryData)}
          validation={validator.postalCode(countryData?.postalCodeRegex)}
          placeholder={countryData?.postalCodeFormat || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"addressLine1"}
          name={"addressLine1"}
          id={"addressLine1"}
          label={t("addressLine1")}
          fullWidth
          rows={4}
          multiline
          value={company?.address?.addressLine1 || ""}
          control={control}
          errors={errors}
          validation={validator.addressLine1}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          autoComplete={"addressLine2"}
          name={"addressLine2"}
          id={"addressLine2"}
          label={t("addressLine2")}
          fullWidth
          rows={4}
          multiline
          value={company?.address?.addressLine2 || ""}
          control={control}
          errors={errors}
          validation={validator.addressLine2}
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
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#4e73df", mt: 2 }}
          onClick={handleSubmit((data) =>
            submitCompany({ locale, data, companyId: company?.id })
          )}
        >
          {t("saveSettings")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SettingsForm;
