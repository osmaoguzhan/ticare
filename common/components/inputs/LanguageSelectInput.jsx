import Constants from "@/utils/Constants";
import { Box } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import SelectInput from "./SelectInput";

const LanguageSelectInput = (props) => {
  const { label, control, value } = props;
  return (
    <SelectInput
      name={"language"}
      label={label}
      id={"language"}
      control={control}
      value={value}
      options={Constants.languageOptions}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <ReactCountryFlag countryCode={option.key} svg /> - {option.label}
        </Box>
      )}
    />
  );
};

export default LanguageSelectInput;
