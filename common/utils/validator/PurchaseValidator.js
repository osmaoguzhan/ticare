import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const PurchaseValidator = () => {
  const { t } = useTranslation("error");

  return {
    title: {
      required: {
        value: true,
        message: t("requiredPurchaseTitle"),
      },
      minLength: {
        value: Constants.purchaseTitleMin,
        message: t("purchaseTitleMinLength").replace(
          "<<placeholder>>",
          Constants.purchaseTitleMin.toString()
        ),
      },
      maxLength: {
        value: Constants.purchaseTitleMax,
        message: t("purchaseTitleMaxLength").replace(
          "<<placeholder>>",
          Constants.purchaseTitleMax.toString()
        ),
      },
    },
    description: {
      minLength: {
        value: Constants.purchaseDescriptionMin,
        message: t("purchaseDescriptionMinLength").replace(
          "<<placeholder>>",
          Constants.purchaseDescriptionMin.toString()
        ),
      },
      maxLength: {
        value: Constants.purchaseDescriptionMax,
        message: t("purchaseDescriptionMaxLength").replace(
          "<<placeholder>>",
          Constants.purchaseDescriptionMax.toString()
        ),
      },
    },
    supplier: {
      required: {
        value: true,
        message: t("requiredSupplier"),
      },
    },
  };
};

export default PurchaseValidator;
