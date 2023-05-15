import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Controller } from "react-hook-form";

const SelectInput = (props) => {
  const {
    name,
    label,
    control,
    value,
    options,
    onChange,
    isEmpty,
    validation,
    errors,
    tooltip,
    ...other
  } = props;

  const { t } = useTranslation("label");

  const setError = () => {
    return errors && errors[name] && errors[name].message
      ? errors[name].message
      : undefined;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <Autocomplete
          options={options}
          disableClearable
          onChange={(_, value) => {
            if (onChange) onChange(value.key);
            props.field.onChange(value);
          }}
          value={props.field.value}
          isOptionEqualToValue={(option, value) => option.key === value.key}
          getOptionLabel={(option) => option.label}
          noOptionsText={t("noOptionsText")}
          renderInput={(params) => (
            <Tooltip title={tooltip}>
              <TextField
                {...params}
                label={label}
                helperText={errors && setError()}
                error={!!(errors && setError())}
              />
            </Tooltip>
          )}
          {...other}
        />
      )}
      rules={validation}
      defaultValue={value ? value : isEmpty ? null : options[0]}
      error={!!(errors && setError())}
    />
  );
};

export default SelectInput;
