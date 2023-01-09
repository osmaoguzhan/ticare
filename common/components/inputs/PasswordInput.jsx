import { useState } from "react";
import * as _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import FormInput from "./FormInput";
import { darken, InputAdornment } from "@mui/material/";

const PasswordInput = (props) => {
  const { name, label, control, value, errors, validation, ...other } = props;
  const [showPassword, setShowPassword] = useState({
    type: "password",
    icon: faEye,
  });

  return (
    <FormInput
      name={name}
      label={label}
      control={control}
      value={value}
      errors={errors}
      validation={validation}
      type={showPassword.type}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position={"end"}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: darken("rgb(78,115,223)", 0.4),
              },
            }}
            onClick={() =>
              setShowPassword((prev) => {
                return {
                  ...prev,
                  ...{
                    type: prev.type === "password" ? "text" : "password",
                    icon: prev.icon === faEye ? faEyeLowVision : faEye,
                  },
                };
              })
            }
          >
            <FontAwesomeIcon icon={showPassword.icon} />
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
};
export default PasswordInput;
