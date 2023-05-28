import { Messages } from "@/utils/Messages";
import send from "@/utils/helpers/mailer";

export default async function handler(req, res) {
  const { locale } = req.headers;
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: Messages.methodNotAllowed,
    });
  }
  try {
    const { name, surname, email, message } = req.body;
    const response = await send({
      to: process.env.CONTACT_EMAIL,
      subject: `Contact Form Submission from ${name} ${surname}`,
      html: `
      Full Name: ${name} ${surname}<br/>
      Email: ${email}<br/>
      Message: ${message}`,
    });
    if (response.success) {
      return res.status(200).json({
        success: true,
        message: Messages[locale || "gb"].thankYouForContactingUs,
      });
    }
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].facedSomeIssuesWhileSendingEmail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].somethingWentWrong,
    });
  }
}
