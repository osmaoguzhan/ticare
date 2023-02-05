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
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import _ from "lodash";
import Constants from "@/utils/Constants";

const SettingsForm = () => {
  const { t } = useTranslation(["label", "error"]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const validator = Validator("company");
  const router = useRouter();
  const { locale } = router;
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const { countries, isCountryLoading } = useCountries(locale);
  const { countryData, refetchCountryData, isCountryDataFetching } =
    useCountryData(locale, countryId);
  const { cities, refetchCities, isCityFetching } = useCitiesByState(
    locale,
    stateId,
    countryId
  );

  const refetchStatesCallback = useCallback(() => {
    if (countryId) refetchCountryData();
    reset({ state: null });
  }, [countryId]);

  const refetchCitiesCallback = useCallback(() => {
    if (stateId) refetchCities();
  }, [stateId]);

  useEffect(() => {
    refetchStatesCallback();
  }, [refetchStatesCallback]);

  useEffect(() => {
    refetchCitiesCallback();
  }, [refetchCitiesCallback]);

  if (isCountryLoading || isCountryDataFetching || isCityFetching)
    return <Loading />;

  return (
    <Grid container spacing={0.5}>
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
          autoComplete={"website"}
          name={"website"}
          id={"website"}
          label={t("website")}
          fullWidth
          control={control}
          errors={errors}
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
          value={countries.find((c) => c.key === countryId)} // TODO: this part will come from the backend
          onChange={(value) => {
            setCountryId(value);
          }}
          isEmpty={true}
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
          value={null}
          options={countryData?.states || []}
          disabled={countryId === ""}
          isEmpty={true}
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
          value={null}
          disabled={_.isNil(cities)}
          isEmpty={true}
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
          disabled={_.isNil(countryData)}
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
          control={control}
          errors={errors}
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
