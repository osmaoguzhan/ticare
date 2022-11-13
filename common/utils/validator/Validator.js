import SignupValidator from "./SignupValidator";

const Validator = (type) => {
  switch (type) {
    case "signup":
      return SignupValidator();
    default:
      return {};
  }
};

export default Validator;
