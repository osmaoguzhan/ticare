import nodemailer from "nodemailer";

const sendMail = (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: process.env.EMAIL,
    to,
    subject,
    text: message,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) return { error: true, message: "E-Mail couldn't sent." };
    else return { error: false, message: "E-Mail sent successfully." };
  });
};

export default sendMail;
