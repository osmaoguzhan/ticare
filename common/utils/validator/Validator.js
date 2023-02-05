import SignupValidator from "./SignupValidator";
import ProfileValidator from "./ProfileValidator";
import PasswordValidator from "./PasswordValidator";
import BrandValidator from "./BrandValidator";
import CompanyValidator from "./CompanySettingsValidator";

const Validator = (type) => {
  switch (type) {
    case "signup":
      return SignupValidator();
    case "profile":
      return ProfileValidator();
    case "password":
      return PasswordValidator();
    case "brand":
      return BrandValidator();
    case "company":
      return CompanyValidator();
    default:
      return {};
  }
};

export default Validator;
