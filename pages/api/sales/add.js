import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";
import { createSaleProductQuery, createSaleQuery } from "@/lib/dbQueries/sale";

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
    const sale = await prisma.sale.create(createSaleQuery(data, session));
    return res.status(200).json({
      success: true,
      message: Messages[locale || "gb"].saleCreated,
      data: sale,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].somethingWentWrong,
    });
  }
}
