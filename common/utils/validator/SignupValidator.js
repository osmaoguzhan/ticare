import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const SignupValidator = () => {
  const { t } = useTranslation("error");

  return {
    name: {
      required: {
        value: true,
        message: t("requiredName"),
      },
      minLength: {
        value: Constants.nameMin,
        message: t("nameMinLength").replace(
          "<<placeholder>>",
          Constants.nameMin.toString()
        ),
      },
      maxLength: {
        value: Constants.nameMax,
        message: t("nameMaxLength").replace(
          "<<placeholder>>",
          Constants.nameMax.toString()
        ),
      },
    },
    surname: {
      required: {
        value: true,
        message: t("requiredSurname"),
      },
      minLength: {
        value: Constants.surnameMin,
        message: t("surnameMinLength").replace(
          "<<placeholder>>",
          Constants.surnameMin.toString()
        ),
      },
      maxLength: {
        value: Constants.surnameMax,
        message: t("surnameMaxLength").replace(
          "<<placeholder>>",
          Constants.surnameMax.toString()
        ),
      },
    },
    email: {
      required: {
        value: true,
        message: t("requiredEmail"),
      },
      pattern: {
        value: Constants.emailRegex,
        message: t("invalidEmail"),
      },
    },
    password: {
      required: {
        value: true,
        message: t("requiredPassword"),
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
    },
    passwordRepeat: (current) => {
      return {
        required: {
          value: true,
          message: t("requiredPasswordRepeat"),
        },
        validate: (value) => value === current || t("passwordsNotMatch"),
      };
    },
  };
};

export default SignupValidator;
