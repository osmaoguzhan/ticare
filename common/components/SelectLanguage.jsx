import Constants from "@/utils/Constants";
import { Select, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ReactCountryFlag from "react-country-flag";
import { useRouter } from "next/router";

const SelectLanguage = () => {
  const router = useRouter();
  const flagOnclick = (language) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: language });
  };

  return (
    <Select
      defaultValue={router.locale || "en"}
      sx={{
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
      }}>
      {Constants.languageOptions.map((language) => {
        return (
          <MenuItem
            key={uuidv4()}
            value={language}
            sx={{ display: "flex", justifyContent: "center" }}
            onClick={() => flagOnclick(language)}>
            <ReactCountryFlag
              key={language}
              name={language}
              style={{
                cursor: "pointer",
                marginRight: "10px",
                width: "1.5em",
                height: "1.5em",
              }}
              countryCode={language}
              svg
            />
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectLanguage;
