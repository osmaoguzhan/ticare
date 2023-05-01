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
    let sale = (
      await prisma.sale.aggregateRaw({
        pipeline: [
          {
            $match: {
              _id: { $oid: id },
            },
          },
          {
            $lookup: {
              from: "ProductSale",
              localField: "_id",
              foreignField: "saleId",
              as: "productSales",
            },
          },
          {
            $lookup: {
              from: "Product",
              localField: "productSales.productId",
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
              productSales: {
                $map: {
                  input: "$productSales",
                  as: "sale",
                  in: {
                    id: { $toString: "$$sale._id" },
                    quantity: "$$sale.quantity",
                    price: "$$sale.price",
                    productId: {
                      $toString: "$$sale.productId",
                    },
                  },
                },
              },
            },
          },
        ],
      })
    )[0];
    if (!sale) {
      res.status(404).json({
        success: false,
        message: Messages[locale || "gb"].saleNotFound,
      });
    } else {
      sale.products.forEach((product) => {
        const productSale = sale.productSales.find(
          (productSale) => productSale.productId === product.id
        );
        product.quantity = productSale?.quantity;
      });
      res.status(200).json({ success: true, data: sale });
    }
  }
}
