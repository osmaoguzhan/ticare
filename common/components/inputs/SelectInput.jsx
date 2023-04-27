import { Autocomplete, TextField } from "@mui/material";
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
    ...other
  } = props;

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
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              helperText={errors && setError()}
              error={!!(errors && setError())}
            />
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
