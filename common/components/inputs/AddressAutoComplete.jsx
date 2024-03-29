import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { useTranslation } from "next-i18next";
import Loading from "../general/Loading";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import { Controller } from "react-hook-form";
import { env } from "next.config";
const libraries = ["places"];

const AddressAutoComplete = ({ address, errors, control }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.GOOGLE_API_KEY,
    libraries,
  });
  if (!isLoaded) return <Loading />;

  return (
    <ControlledAutoComplete
      address={address}
      errors={errors}
      control={control}
    />
  );
};

const ControlledAutoComplete = ({ address, errors, control, ...other }) => {
  const { t } = useTranslation(["label", "error", "tooltip"]);
  let {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();

  value = address || "";

  const setError = () => {
    return errors && errors["addressLine1"] && errors["addressLine1"].message
      ? errors["addressLine1"].message
      : undefined;
  };

  return (
    <Controller
      name={"addressLine1"}
      control={control}
      render={(props) => (
        <Autocomplete
          options={status === "OK" ? data : []}
          getOptionLabel={(option) => {
            return typeof option === "string" ? option : option.description;
          }}
          freeSolo={true}
          onChange={(_, value) => {
            if (typeof value === "string") {
              setValue(value);
              props.field.onChange(value);
            } else if (value && value.place_id) {
              setValue(value);
              props.field.onChange(value.description);
            }
          }}
          loading={status === "OK" ? false : true}
          loadingText={t("searching")}
          value={value}
          renderInput={(params) => (
            <Tooltip title={t("tooltip:addressLine1")}>
              <TextField
                {...params}
                label={t("addressLine1")}
                variant="outlined"
                fullWidth
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder={t("searchAddress")}
                helperText={setError()}
                error={!!(errors && setError())}
              />
            </Tooltip>
          )}
        />
      )}
      rules={{
        required: { value: true, message: t("error:addressLine1Required") },
      }}
      defaultValue={address ? address : value || ""}
    />
  );
};

export default AddressAutoComplete;
