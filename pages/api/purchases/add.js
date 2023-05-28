import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";
import { createPurhcaseQuery } from "@/lib/dbQueries/purchase";

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
    const purchase = await prisma.purchase.create(
      createPurhcaseQuery(data, session)
    );
    return res.status(200).json({
      success: true,
      message: Messages[locale || "gb"].purchaseCreated,
      data: purchase,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].somethingWentWrong,
    });
  }
}
