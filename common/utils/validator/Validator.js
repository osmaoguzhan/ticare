import SignupValidator from "./SignupValidator";
import ProfileValidator from "./ProfileValidator";
import PasswordValidator from "./PasswordValidator";

const Validator = (type) => {
  switch (type) {
    case "signup":
      return SignupValidator();
    case "profile":
      return ProfileValidator();
    case "password":
      return PasswordValidator();
    default:
      return {};
  }
};

export default Validator;
