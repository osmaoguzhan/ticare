import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const BrandValidator = () => {
  const { t } = useTranslation("error");

  return {
    name: {
      required: {
        value: true,
        message: t("brandNameRequired"),
      },
      minLength: {
        value: Constants.brandNameMin,
        message: t("brandNameMinLength").replace(
          "<<placeholder>>",
          Constants.brandNameMin.toString()
        ),
      },
      maxLength: {
        value: Constants.brandNameMax,
        message: t("brandNameMaxLength").replace(
          "<<placeholder>>",
          Constants.brandNameMax.toString()
        ),
      },
    },
    description: {
      minLength: {
        value: Constants.brandDescriptionMin,
        message: t("brandDescriptionMinLength").replace(
          "<<placeholder>>",
          Constants.brandDescriptionMin.toString()
        ),
      },
      maxLength: {
        value: Constants.brandDescriptionMax,
        message: t("brandDescriptionMaxLength").replace(
          "<<placeholder>>",
          Constants.brandDescriptionMax.toString()
        ),
      },
    },
  };
};

export default BrandValidator;
