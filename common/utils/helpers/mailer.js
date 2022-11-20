import nodemailer from "nodemailer";

const send = async (options) => {
  try {
    let returnData = {};
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    options = {
      ...options,
      from: process.env.EMAIL,
    };

    let mail = await transporter.sendMail(options);
    if (mail?.messageId) {
      returnData = {
        success: true,
        message: "Email sent successfully.",
      };
    } else {
      returnData = {
        success: false,
        message: "Email not sent.",
      };
    }
    return returnData;
  } catch (err) {
    return { success: false, message: "E-Mail couldn't sent." };
  }
};

export default send;
