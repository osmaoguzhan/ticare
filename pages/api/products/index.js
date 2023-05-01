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
      const products = await prisma.product.aggregateRaw({
        pipeline: [
          {
            $lookup: {
              from: "ProductSale",
              localField: "_id",
              foreignField: "productId",
              as: "productSales",
            },
          },
          {
            $lookup: {
              from: "ProductPurchase",
              localField: "_id",
              foreignField: "productId",
              as: "productPurchases",
            },
          },
          {
            $project: {
              _id: 0,
              id: { $toString: "$_id" },
              name: 1,
              description: 1,
              salePrice: 1,
              purchasePrice: 1,
              productType: 1,
              productSales: {
                $map: {
                  input: "$productSales",
                  as: "sale",
                  in: {
                    saleId: "$$sale.saleId",
                    quantity: "$$sale.quantity",
                  },
                },
              },
              productPurchases: {
                $map: {
                  input: "$productPurchases",
                  as: "purchase",
                  in: {
                    purchaseId: "$$purchase.purchaseId",
                    quantity: "$$purchase.quantity",
                  },
                },
              },
              quantity: {
                $subtract: [
                  {
                    $sum: "$productPurchases.quantity",
                  },
                  {
                    $sum: "$productSales.quantity",
                  },
                ],
              },
            },
          },
        ],
      });
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: Messages[locale || "gb"].somethingWentWrong,
      });
    }
  }
}
