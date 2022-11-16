const Constants = {
  languageOptions: ["pl", "tr", "gb"],
  nameMin: 2,
  nameMax: 30,
  surnameMin: 2,
  surnameMax: 30,
  emailRegex: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/,
  passwordMin: 6,
  passwordMax: 18,
};

module.exports = Constants;
