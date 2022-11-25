import prisma from "@/lib/prismaConnector";
import { Messages } from "@/utils/Messages";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const id = req.body;
    const { locale } = req.headers;
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (user) {
        if (user.isActivated) {
          res.status(200).json({
            success: true,
            message: Messages[locale].alreadyActivated,
          });
        } else {
          await prisma.user.update({
            where: { id },
            data: {
              isActivated: true,
            },
          });
          res.status(200).json({
            success: true,
            message: Messages[locale].userActivated,
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: Messages[locale].contactSupport,
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: Messages[locale].contactSupport,
      });
    }
  }
}
