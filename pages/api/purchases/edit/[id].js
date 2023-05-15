import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";
import _ from "lodash";
import { updatePurchaseQuery } from "@/lib/dbQueries/purchase";

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
    try {
      let data = req.body;
      let { id } = req.query;
      const purchase = await prisma.purchase.findUnique({
        where: { id },
      });
      if (!purchase) {
        res.status(404).json({
          success: false,
          message: Messages[locale || "gb"].purchaseNotFound,
        });
      } else {
        const productPurchases = await prisma.productPurchase.findMany({
          where: { purchaseId: id },
        });
        await prisma.purchase.update(
          updatePurchaseQuery(data, session, id, productPurchases)
        );
        res.status(200).json({
          success: true,
          message: Messages[locale || "gb"].purchaseUpdated,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: Messages[locale || "gb"].somethingWentWrong,
      });
    }
  }
}
