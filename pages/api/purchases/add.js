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
    try {
      const data = req.body;
      const purchase = await prisma.purchase.create({
        data: {
          title: data.title,
          description: data.description,
          totalPrice: data.products.reduce(
            (acc, product) => acc + product.purchasePrice * product.quantity,
            0
          ),
          status: data.status,
          supplierId: data.supplier.key,
          companyId: session?.user?.company.id,
        },
      });
      if (purchase) {
        const productPurchases = await prisma.productPurchase.createMany({
          data: data.products.map((product) => ({
            productId: product.id,
            purchaseId: purchase.id,
            quantity: product.quantity,
            price: product.purchasePrice,
          })),
        });
        res.status(200).json({
          success: true,
          message: Messages[locale || "gb"].purchaseCreated,
          data: [productPurchases, purchase],
        });
      } else {
        res.status(500).json({
          success: false,
          message: Messages[locale || "gb"].somethingWentWrong,
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
