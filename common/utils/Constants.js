import {
  faCogs,
  faCubes,
  faDashboard,
  faEuro,
  faStore,
  faTags,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Constants = {
  languages: ["pl", "tr", "gb"],
  nameMin: 2,
  nameMax: 30,
  surnameMin: 2,
  surnameMax: 30,
  emailRegex: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/,
  passwordMin: 6,
  passwordMax: 18,
  phoneNumberRegex: /^\+[1-9]\d{1,14}$/,
  brandNameMin: 2,
  brandNameMax: 30,
  brandDescriptionMin: 3,
  brandDescriptionMax: 100,
  defaultSettings: (language) => {
    let defaultSettings = {
      theme: "light",
      language: "gb",
      currency: "GBP",
      timezone: "Europe/London",
    };
    switch (language) {
      case "pl":
        return {
          theme: "light",
          language: "pl",
          currency: "PLN",
          timezone: "Europe/Warsaw",
        };
      case "tr":
        return {
          theme: "light",
          language: "tr",
          currency: "TRY",
          timezone: "Europe/Istanbul",
        };
      case "gb":
      default:
        return defaultSettings;
    }
  },
  getMailTemplate: (language, fullname, id) => {
    switch (language) {
      case "pl":
        return {
          subject: "Aktywuj swoje konto",
          html: `
            <h3>Witaj ${fullname},</h3>
            <p>Dziękujemy za rejestrację. Twoje konto zostało utworzone.</p>
            <p>Aby aktywować konto, kliknij następujący link: <a target="_" href="${process.env.NEXTAUTH_URL}/${language}/auth/activate/${id}">${process.env.NEXTAUTH_URL}/${language}/auth/activate/${id}</a></p>
            <p>Zespół wsparcia Ticare</p>
          `,
        };
      case "tr":
        return {
          subject: "Hesabınızı etkinleştirin",
          html: `
            <h3>Merhaba ${fullname},</h3>
            <p>Kaydolduğunuz için teşekkür ederiz. Hesabınız oluşturuldu.</p>
            <p>Hesabınızı etkinleştirmek için lütfen şu bağlantıya tıklayın: <a target="_" href="${process.env.NEXTAUTH_URL}/${language}/auth/activate/${id}">${process.env.NEXTAUTH_URL}/${language}/auth/activate/${id}</a></p>
            <p>Ticare Destek Ekibi</p>
          `,
        };
      case "gb":
      default:
        return {
          subject: "Activate your account",
          html: `
            <h3>Hello ${fullname},</h3>
            <p>Thank you for registering. Your account has been created.</p>
            <p>To activate your account please click the following link: <a target="_" href="${process.env.NEXTAUTH_URL}/${language}/auth/activate/${id}">${process.env.NEXTAUTH_URL}/${language}/auth/activate/${id}</a></p>
            <p>Ticare Support Team</p>
          `,
        };
    }
  },
  menuItems: [
    { key: "dashboard", icon: faDashboard },
    { key: "brands", icon: faTags },
    { key: "stores", icon: faStore },
    { key: "orders", icon: faEuro },
    { key: "products", icon: faCubes },
    { key: "settings", icon: faCogs },
  ],
  avatarOnClick: [
    { key: "profile", icon: faUser },
    { key: "logout", icon: faSignOut },
  ],
  languageOptions: [
    { key: "gb", label: "English" },
    { key: "pl", label: "Polski" },
    { key: "tr", label: "Türkçe" },
  ],
  pagination: ({ from, to, count, locale }) => {
    let text = "";
    switch (locale) {
      case "pl":
        text = `Wyświetlanie ${from} do ${to} z ${count} wyników`;
        break;
      case "tr":
        text = `${count} sonuçtan ${from} - ${to} arası gösteriliyor`;
        break;
      case "gb":
      default:
        text = `Showing ${from} to ${to} of ${count} results`;
        break;
    }
    return text;
  },
};

module.exports = Constants;
