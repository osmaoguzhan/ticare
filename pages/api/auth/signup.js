import prisma from "@/lib/prismaConnector";
import Constants from "@/utils/Constants";
import send from "@/utils/helpers/mailer";
import { Messages } from "@/utils/Messages";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, surname, email, password } = req.body;
    const { locale } = req.headers;
    try {
      const { id, settings } = await prisma.user.create({
        data: {
          name,
          surname,
          email,
          password,
          settings: Constants.defaultSettings(locale),
          company: undefined,
        },
      });
      const response = await send({
        to: email,
        ...Constants.getMailTemplate(locale, `${name} ${surname}`, id),
      });
      if (response.success) {
        return res.status(200).json({
          success: true,
          message: Messages[locale].successfullyAdded,
          data: { id, name, surname, email, settings },
        });
      }
      return res.status(500).json({
        success: false,
        message: Messages[locale].somethingWentWrong,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: Messages[locale].errorOccurred,
        data: null,
      });
    }
  }
}
