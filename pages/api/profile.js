import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";

export default async function handler(req, res) {
  const { userid, locale } = req.headers;
  if (!userid) {
    res.status(401).send({
      success: false,
      message: Messages[locale || "gb"].pleaseLogin,
    });
  } else {
    if (req.method === "GET") {
      try {
        const profile = await prisma.user.findUnique({
          where: {
            id: userid,
          },
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
            settings: true,
            phoneNumber: true,
          },
        });
        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: Messages[locale].somethingWentWrong,
        });
      }
    } else if (req.method === "PUT") {
      try {
        const { name, surname, phoneNumber, settings } = req.body;
        await prisma.user.update({
          where: {
            id: userid,
          },
          data: {
            name,
            surname,
            phoneNumber,
            settings,
          },
        });
        res.status(200).json({
          success: true,
          message: Messages[settings.language].profileUpdated,
          lang: settings.language,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: Messages[locale].somethingWentWrong,
          lang: settings.language,
        });
      }
    }
  }
}
