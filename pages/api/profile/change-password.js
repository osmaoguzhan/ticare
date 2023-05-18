import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";
import { decrypt } from "@/utils/helpers/cipher";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { userid, locale } = req.headers;
  if (!session || !userid) {
    return res.status(401).send({
      success: false,
      message: Messages[locale || "gb"].notPermitted,
    });
  }
  if (req.method === "PUT") {
    try {
      let { currentPassword, newPassword } = req.body;
      currentPassword = decrypt(currentPassword);
      const user = await prisma.user.findUnique({
        where: {
          id: userid,
        },
        select: {
          password: true,
        },
      });
      let match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res.status(400).json({
          success: false,
          message: Messages[locale || "gb"].wrongPassword,
        });
      }
      await prisma.user.update({
        where: {
          id: userid,
        },
        data: {
          password: newPassword,
        },
      });
      return res.status(200).json({
        success: true,
        message: Messages[locale || "gb"].passwordChanged,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: Messages[locale || "gb"].somethingWentWrong,
      });
    }
  }
}
