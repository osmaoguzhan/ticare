import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectInput = (props) => {
  const { name, label, control, value, options, onChange, isEmpty, ...other } =
    props;

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
          renderInput={(params) => <TextField {...params} label={label} />}
          {...other}
        />
      )}
      defaultValue={value ? value : isEmpty ? null : options[0]}
    />
  );
};

export default SelectInput;
