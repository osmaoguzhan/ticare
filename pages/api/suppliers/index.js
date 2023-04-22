import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { locale } = req.headers;
  const userid = session?.user?.id;
  if (!session || !userid) {
    res.status(401).send({
      success: false,
      message: Messages[locale || "gb"].notPermitted,
    });
  } else {
    const suppliers = await prisma.supplier.findMany({
      where: {
        companyId: session?.user?.companyId,
      },
    });
    res.status(200).json({
      success: true,
      data: suppliers,
    });
  }
}
