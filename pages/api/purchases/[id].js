import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";
import { getUniquePurchaseQuery } from "@/lib/dbQueries/purchase";

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
      const { id } = req.query;
      let purchase = (
        await prisma.purchase.aggregateRaw(getUniquePurchaseQuery(id))
      )[0];
      purchase["company"] = {
        key: purchase.companyId,
        label: purchase.companyName,
      };
      purchase["supplier"] = {
        key: purchase.supplierId,
        label: purchase.supplierNameSurname,
      };
      if (!purchase) {
        res.status(404).json({
          success: false,
          message: Messages[locale || "gb"].purchaseNotFound,
        });
      } else {
        purchase.products.forEach((product) => {
          const productPurchase = purchase.productPurchases.find(
            (productPurchase) => productPurchase.productId === product.id
          );
          product.quantity = productPurchase?.quantity;
        });
        res.status(200).json({ success: true, data: purchase });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: Messages[locale || "gb"].somethingWentWrong,
      });
    }
  }
}
