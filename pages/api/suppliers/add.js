import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";
import Constants from "@/utils/Constants";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { locale } = req.headers;
  const userid = session?.user?.id;
  if (!session || !userid) {
    return res.status(401).send({
      success: false,
      message: Messages[locale || "gb"].notPermitted,
    });
  }
  try {
    const data = req.body;
    if (session?.user?.role === Constants.ROLES.USER) {
      data.companyId = session?.user?.company.id;
    }
    const supplier = await prisma.supplier.create({ data });
    return res.status(200).json({
      success: true,
      message: Messages[locale || "gb"].supplierAdded,
      data: supplier,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].somethingWentWrong,
    });
  }
}
