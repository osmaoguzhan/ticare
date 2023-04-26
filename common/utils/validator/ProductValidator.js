import Constants from "@/utils/Constants";
import { useTranslation } from "next-i18next";

const ProductValidator = () => {
  const { t } = useTranslation("error");

  return {
    name: {
      required: {
        value: true,
        message: t("productNameRequired"),
      },
      minLength: {
        value: Constants.productNameMin,
        message: t("productNameMinLength").replace(
          "<<placeholder>>",
          Constants.productNameMin.toString()
        ),
      },
      maxLength: {
        value: Constants.productNameMax,
        message: t("productNameMaxLength").replace(
          "<<placeholder>>",
          Constants.productNameMax.toString()
        ),
      },
    },
    description: {
      minLength: {
        value: Constants.productDescriptionMin,
        message: t("productDescriptionMinLength").replace(
          "<<placeholder>>",
          Constants.productDescriptionMin.toString()
        ),
      },
      maxLength: {
        value: Constants.productDescriptionMax,
        message: t("productDescriptionMaxLength").replace(
          "<<placeholder>>",
          Constants.productDescriptionMax.toString()
        ),
      },
    },
    productType: {
      required: {
        value: true,
        message: t("productTypeRequired"),
      },
      minLength: {
        value: Constants.productTypeMin,
        message: t("productTypeMinLength").replace(
          "<<placeholder>>",
          Constants.productTypeMin.toString()
        ),
      },
      maxLength: {
        value: Constants.productTypeMax,
        message: t("productTypeMaxLength").replace(
          "<<placeholder>>",
          Constants.productTypeMax.toString()
        ),
      },
    },
    salePrice: {
      required: {
        value: true,
        message: t("salePriceRequired"),
      },
      min: {
        value: Constants.productSalePriceMin,
        message: t("salePriceMin").replace(
          "<<placeholder>>",
          Constants.productSalePriceMin.toString()
        ),
      },
      max: {
        value: Constants.productSalePriceMax,
        message: t("salePriceMax").replace(
          "<<placeholder>>",
          Constants.productSalePriceMax.toString()
        ),
      },
      validate: (value) => {
        if (!_.isNumber(Number(value))) return t("salePriceInvalid");
        return true;
      },
    },
    purchasePrice: {
      required: {
        value: true,
        message: t("purchasePriceRequired"),
      },
      min: {
        value: Constants.productPurchasePriceMin,
        message: t("purchasePriceMin").replace(
          "<<placeholder>>",
          Constants.productPurchasePriceMin.toString()
        ),
      },
      max: {
        value: Constants.productPurchasePriceMax,
        message: t("purchasePriceMax").replace(
          "<<placeholder>>",
          Constants.productPurchasePriceMax.toString()
        ),
      },
      validate: (value) => {
        if (!_.isNumber(Number(value))) return t("purchasePriceInvalid");
        return true;
      },
    },
  };
};

export default ProductValidator;
