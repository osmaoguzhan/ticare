import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const SupplierValidator = () => {
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
  };
};

export default SupplierValidator;
