import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const ProfileValidator = () => {
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
    phoneNumber: {
      required: false,
      pattern: {
        value: Constants.phoneNumberRegex,
        message: t("invalidPhoneNumber"),
      },
    },
  };
};

export default ProfileValidator;
