import SignupValidator from "./SignupValidator";
import ProfileValidator from "./ProfileValidator";
import PasswordValidator from "./PasswordValidator";
import CompanyValidator from "./CompanySettingsValidator";
import SupplierValidator from "./SupplierValidator";
import ProductValidator from "./ProductValidator";
import SaleValidator from "./SaleValidator";
import PurchaseValidator from "./PurchaseValidator";

const Validator = (type) => {
  switch (type) {
    case "signup":
      return SignupValidator();
    case "profile":
      return ProfileValidator();
    case "password":
      return PasswordValidator();
    case "company":
      return CompanyValidator();
    case "supplier/customer":
      return SupplierValidator();
    case "product":
      return ProductValidator();
    case "sale":
      return SaleValidator();
    case "purchase":
      return PurchaseValidator();
    default:
      return {};
  }
};

export default Validator;
