import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const SaleValidator = () => {
  const { t } = useTranslation("error");

  return {
    title: {
      required: {
        value: true,
        message: t("requiredSaleTitle"),
      },
      minLength: {
        value: Constants.saleTitleMin,
        message: t("saleTitleMinLength").replace(
          "<<placeholder>>",
          Constants.saleTitleMin.toString()
        ),
      },
      maxLength: {
        value: Constants.saleTitleMax,
        message: t("saleTitleMaxLength").replace(
          "<<placeholder>>",
          Constants.saleTitleMax.toString()
        ),
      },
    },
    description: {
      minLength: {
        value: Constants.saleDescriptionMin,
        message: t("saleDescriptionMinLength").replace(
          "<<placeholder>>",
          Constants.saleDescriptionMin.toString()
        ),
      },
      maxLength: {
        value: Constants.saleDescriptionMax,
        message: t("saleDescriptionMaxLength").replace(
          "<<placeholder>>",
          Constants.saleDescriptionMax.toString()
        ),
      },
    },
    customer: {
      required: {
        value: true,
        message: t("requiredCustomer"),
      },
    },
  };
};

export default SaleValidator;
