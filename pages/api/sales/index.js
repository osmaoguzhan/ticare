import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";
import { getSales } from "@/lib/dbQueries/sale";

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
    const sales = await prisma.sale.aggregateRaw(getSales(session));
    return res.status(200).json({
      success: true,
      data: sales,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].somethingWentWrong,
    });
  }
}
