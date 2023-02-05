import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const CompanyValidator = () => {
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

    phoneNumber: {
      required: false,
      pattern: {
        value: Constants.phoneNumberRegex,
        message: t("invalidPhoneNumber"),
      },
    },
    postalCode: (postalCodeRegex) => {
      return {
        required: t("error:zipCodeRequired"),
        validate: (value) => {
          postalCodeRegex = postalCodeRegex || Constants.postalCodeRegex;
          const regex = new RegExp(postalCodeRegex);
          if (!regex.test(value)) return t("error:zipCodeInvalid");
          return true;
        },
      };
    },
  };
};

export default CompanyValidator;
