import {
  faCogs,
  faCubes,
  faDashboard,
  faEuro,
  faSignOut,
  faUser,
  faTruck,
  faPerson,
  faCashRegister,
  faTicket,
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
  phoneNumberRegex: /^\+[1-9]\d{10,14}$/,
  postalCodeRegex: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/,
  websiteRegex:
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
  companyNameMin: 2,
  companyNameMax: 64,
  addressLineMin: 3,
  addressLineMax: 120,
  descriptionMax: 1000,
  productNameMin: 2,
  productNameMax: 100,
  productDescriptionMin: 3,
  productDescriptionMax: 100,
  productTypeMin: 2,
  productTypeMax: 30,
  productSalePriceMin: 0.01,
  productSalePriceMax: 1000000,
  productPurchasePriceMin: 0.01,
  productPurchasePriceMax: 1000000,
  saleTitleMin: 2,
  saleTitleMax: 100,
  saleDescriptionMin: 3,
  saleDescriptionMax: 100,
  purchaseTitleMin: 2,
  purchaseTitleMax: 100,
  purchaseDescriptionMin: 3,
  purchaseDescriptionMax: 100,
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
  getMenuItems: (role, companyCount) => {
    let commonMenuItems = [
      { key: "purchases", icon: faCashRegister },
      { key: "sales", icon: faEuro },
      { key: "products", icon: faCubes },
      { key: "customers", icon: faPerson },
      { key: "suppliers", icon: faTruck },
    ];
    switch (role) {
      case "ADMIN":
        //let tickets = { key: "tickets", icon: faTicket };
        if (companyCount > 0) {
          return [...commonMenuItems];
        }
        return [tickets];
      case "USER":
      default:
        return [
          { key: "dashboard", icon: faDashboard },
          ...commonMenuItems,
          { key: "settings", icon: faCogs, divider: true },
        ];
    }
  },
  menuItems: {
    ADMIN: [
      { key: "purchases", icon: faCashRegister },
      { key: "sales", icon: faEuro },
      { key: "products", icon: faCubes },
      { key: "customers", icon: faPerson },
      { key: "suppliers", icon: faTruck },
      { key: "tickets", icon: faTicket },
    ],
    USER: [
      { key: "dashboard", icon: faDashboard },
      { key: "purchases", icon: faCashRegister },
      { key: "sales", icon: faEuro },
      { key: "products", icon: faCubes },
      { key: "customers", icon: faPerson },
      { key: "suppliers", icon: faTruck },
      { key: "settings", icon: faCogs, divider: true },
    ],
  },
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
  salesTemplate: (language, products) => {
    let translations = {};
    switch (language) {
      case "pl":
        translations = {
          product: "Produkt",
          price: "Cena",
          quantity: "Ilość",
          total: "Razem",
        };
        break;
      case "tr":
        translations = {
          product: "Ürün",
          price: "Fiyat",
          quantity: "Miktar",
          total: "Toplam",
        };
        break;
      case "gb":
      default:
        translations = {
          product: "Product",
          price: "Price",
          quantity: "Quantity",
          total: "Total",
        };
    }
    let totalPrice = products?.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    let template = `<table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="border: 1px solid #ddd; padding: 8px;">${
          translations.product
        }</th>
        <th style="border: 1px solid #ddd; padding: 8px;">${
          translations.price
        }</th>
        <th style="border: 1px solid #ddd; padding: 8px;">${
          translations.quantity
        }</th>
        <th style="border: 1px solid #ddd; padding: 8px;">${
          translations.total
        }</th>
      </tr>
    </thead>
    <tbody>
      ${products?.map(
        (product) => `
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${product.name}
            <td style="border: 1px solid #ddd; padding: 8px;">$${
              product.price
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              product.quantity
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${
              product.price * product.quantity
            }</td>
        </tr>
        `
      )}
      <tr>
        <td colspan="3" style="text-align: right; border: 1px solid #ddd; padding: 8px;">${
          translations.total
        }:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${totalPrice}</td>
      </tr>
    </tbody>
  </table>`;
    return template;
  },
  ROLES: {
    ADMIN: "ADMIN",
    USER: "USER",
  },
  resetPasswordTemplate: (language, token) => {
    switch (language) {
      case "pl":
        return {
          subject: "Zresetuj hasło",
          html: `
            <h3>Witaj,</h3>
            <p>Jeśli chcesz zresetować hasło, kliknij w poniższy link:</p>
            <p><a target="_" href="${process.env.NEXTAUTH_URL}/pl/auth/reset-password/${token}">${process.env.NEXTAUTH_URL}/pl/auth/reset-password/${token}</a></p>
            <p>Jeśli nie chcesz zresetować hasła, zignoruj tę wiadomość.</p>
            <p>Pozdrawiamy,</p>
            <p>Zespół wsparcia Ticare</p>
          `,
        };
      case "tr":
        return {
          subject: "Şifreyi sıfırla",
          html: `
            <h3>Merhaba,</h3>
            <p>Şifrenizi sıfırlamak istiyorsanız, aşağıdaki bağlantıya tıklayın:</p>
            <p><a target="_" href="${process.env.NEXTAUTH_URL}/tr/auth/reset-password/${token}">${process.env.NEXTAUTH_URL}/tr/auth/reset-password/${token}</a></p>
            <p>Şifrenizi sıfırlamak istemiyorsanız, bu mesajı görmezden gelin.</p>
            <p>İyi günler,</p>
            <p>Ticare Destek Ekibi</p>
          `,
        };
      case "gb":
      default:
        return {
          subject: "Reset password",
          html: `
            <h3>Hello,</h3>
            <p>If you want to reset your password, click on the link below:</p>
            <p><a target="_" href="${process.env.NEXTAUTH_URL}/gb/auth/reset-password/${token}">${process.env.NEXTAUTH_URL}/gb/auth/reset-password/${token}</a></p>
            <p>If you don't want to reset your password, ignore this message.</p>
            <p>Best regards,</p>
            <p>Ticare Support Team</p>
          `,
        };
    }
  },
};

module.exports = Constants;
