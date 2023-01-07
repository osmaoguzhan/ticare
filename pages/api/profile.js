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
    res.status(200).send();
  }
}
