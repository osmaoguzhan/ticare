import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";

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
    const { id } = req.query;
    let purchase = (
      await prisma.purchase.aggregateRaw({
        pipeline: [
          {
            $match: {
              _id: { $oid: id },
            },
          },
          {
            $lookup: {
              from: "ProductPurchase",
              localField: "_id",
              foreignField: "purchaseId",
              as: "productPurchases",
            },
          },
          {
            $lookup: {
              from: "Product",
              localField: "productPurchases.productId",
              foreignField: "_id",
              as: "products",
            },
          },
          {
            $project: {
              _id: 0,
              id: { $toString: "$_id" },
              title: 1,
              description: 1,
              totalPrice: 1,
              status: 1,
              companyId: { $toString: "$companyId" },
              createdAt: { $toString: "$createdAt" },
              products: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: {
                    id: { $toString: "$$product._id" },
                    description: "$$product.description",
                    name: "$$product.name",
                    productType: "$$product.productType",
                    purchasePrice: "$$product.purchasePrice",
                    salePrice: "$$product.salePrice",
                  },
                },
              },
              productPurchases: {
                $map: {
                  input: "$productPurchases",
                  as: "purchase",
                  in: {
                    id: { $toString: "$$purchase._id" },
                    quantity: "$$purchase.quantity",
                    price: "$$purchase.price",
                    productId: {
                      $toString: "$$purchase.productId",
                    },
                  },
                },
              },
            },
          },
        ],
      })
    )[0];
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
  }
}
