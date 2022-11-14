import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

const SignupValidator = () => {
  const { t } = useTranslation("error");
  const { watch } = useForm();

  return {
    firstName: {
      required: {
        value: true,
        message: t("requiredFirstname"),
      },
      minLength: {
        value: Constants.firstNameMin,
        message: t("firstNameMinLength").replace(
          "<<placeholder>>",
          Constants.firstNameMin.toString()
        ),
      },
      maxLength: {
        value: Constants.firstNameMax,
        message: t("firstNameMinLength").replace(
          "<<placeholder>>",
          Constants.firstNameMax.toString()
        ),
      },
    },
    lastName: {
      required: {
        value: true,
        message: t("requiredLastname"),
      },
      minLength: {
        value: Constants.lastNameMin,
        message: t("lastNameMinLength").replace(
          "<<placeholder>>",
          Constants.lastNameMin.toString()
        ),
      },
      maxLength: {
        value: Constants.lastNameMax,
        message: t("lastNameMaxLength").replace(
          "<<placeholder>>",
          Constants.lastNameMax.toString()
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
    passwordRepeat: {
      required: true,
      validate: (val) => {
        if (watch("password") !== val) {
          return t("passwordsNotMatch");
        }
      },
    },
  };
};

export default SignupValidator;
