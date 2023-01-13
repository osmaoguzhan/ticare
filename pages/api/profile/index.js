import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { userid, locale } = req.headers;
  if (!session || !userid) {
    res.status(401).send({
      success: false,
      message: Messages[locale || "gb"].notPermitted,
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
          message: Messages[locale || "gb"].somethingWentWrong,
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
          message: Messages[locale || "gb"].somethingWentWrong,
          lang: settings.language,
        });
      }
    }
  }
}
