import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectInput = (props) => {
  const { name, label, control, value, options, ...other } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <Autocomplete
          options={options}
          disableClearable
          onChange={(_, value) => {
            props.field.onChange(value);
          }}
          value={props.field.value}
          isOptionEqualToValue={(option, value) => option.key === value.key}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label={label} />}
          {...other}
        />
      )}
      defaultValue={value ? value : options[0]}
    />
  );
};

export default SelectInput;
