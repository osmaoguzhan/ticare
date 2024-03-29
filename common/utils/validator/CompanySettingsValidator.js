import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const CompanyValidator = () => {
  const { t } = useTranslation("error");

  return {
    name: {
      required: {
        value: true,
        message: t("companyNameRequired"),
      },
      minLength: {
        value: Constants.companyNameMin,
        message: t("companyNameMinLength").replace(
          "<<placeholder>>",
          Constants.nameMin.toString()
        ),
      },
      maxLength: {
        value: Constants.companyNameMax,
        message: t("companyNameMaxLength").replace(
          "<<placeholder>>",
          Constants.nameMax.toString()
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
    phoneNumber: {
      required: {
        value: true,
        message: t("phoneNumberRequired"),
      },
      pattern: {
        value: Constants.phoneNumberRegex,
        message: t("invalidPhoneNumber"),
      },
    },
    website: {
      required: false,
      pattern: {
        value: Constants.websiteRegex,
        message: t("invalidWebsite"),
      },
    },
    addressLine2: {
      required: {
        value: true,
        message: t("error:addressLine2Required"),
      },
      minLength: {
        value: Constants.addressLineMin,
        message: t("addressLineMinLength").replace(
          "<<placeholder>>",
          Constants.addressLineMin.toString()
        ),
      },
      maxLength: {
        value: Constants.addressLineMax,
        message: t("addressLineMaxLength").replace(
          "<<placeholder>>",
          Constants.addressLineMax.toString()
        ),
      },
    },
    description: {
      required: false,
      maxLength: {
        value: Constants.descriptionMax,
        message: t("descriptionMaxLength").replace(
          "<<placeholder>>",
          Constants.descriptionMax.toString()
        ),
      },
    },
  };
};

export default CompanyValidator;
