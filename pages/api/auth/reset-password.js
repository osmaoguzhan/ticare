import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: Messages.methodNotAllowed,
    });
  } else {
    try {
      const { locale, userid } = req.headers;
      if (!userid) {
        return res.status(404).json({
          success: false,
          message: Messages[locale].somethingWentWrong,
        });
      }
      const { password, token } = req.body;
      const user = await prisma.user.findUnique({
        where: { id: userid },
        select: { email: true },
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: Messages[locale].somethingWentWrong,
        });
      }
      await prisma.$transaction([
        prisma.resetPasswordTokens.update({
          where: { token },
          data: { isUsed: true },
        }),
        prisma.user.update({
          where: { id: userid },
          data: { password },
        }),
      ]);
      return res.status(200).json({
        success: true,
        message: Messages[locale].passwordChanged,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: Messages[locale].somethingWentWrong,
      });
    }
  }
}
