import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const PasswordValidator = () => {
  const { t } = useTranslation("error");

  return {
    currentPassword: {
      required: {
        value: true,
        message: t("currentPasswordIsRequired"),
      },
    },
    password: (current) => {
      return {
        required: {
          value: true,
          message: t("newPasswordIsRequired"),
        },

        minLength: {
          value: Constants.passwordMin,
          message: t("passwordMinLength").replace(
            "<<placeholder>>",
            Constants.passwordMin.toString()
          ),
        },
        maxLength: {
          value: Constants.passwordMax,
          message: t("passwordMaxLength").replace(
            "<<placeholder>>",
            Constants.passwordMax.toString()
          ),
        },
        validate: (value) => {
          if (value === current) {
            return t("passwordsCantBeSame");
          }
        },
      };
    },
    passwordRepeat: (current) => {
      return {
        required: {
          value: true,
          message: t("requiredPasswordRepeat"),
        },
        validate: (value) => {
          return value === current || t("passwordsNotMatch");
        },
      };
    },
  };
};

export default PasswordValidator;
