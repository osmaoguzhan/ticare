import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import send from "@/utils/helpers/mailer";
import Constants from "@/utils/Constants";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: Messages.methodNotAllowed,
    });
  }
  try {
    const { locale } = req.headers;
    const { email } = req.query;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { resetTokens: true },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: Messages[locale].noEmailFound,
      });
    }
    let token = crypto.randomUUID();
    if (user.resetTokens.length > 0) {
      await prisma.resetPasswordTokens.update({
        where: { id: user.resetTokens[0].id },
        data: {
          token,
          expireDatetime: new Date(Date.now() + 600000),
          isUsed: false,
        },
      });
    } else {
      await prisma.resetPasswordTokens.create({
        data: {
          token,
          userId: user.id,
          expireDatetime: new Date(Date.now() + 3600000),
        },
      });
    }
    const response = await send({
      to: email,
      ...Constants.resetPasswordTemplate(locale, token),
    });
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: Messages[locale].somethingWentWrong,
      });
    }
    return res.status(200).json({
      success: true,
      message: Messages[locale].resetPasswordEmailSent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale].somethingWentWrong,
    });
  }
}
