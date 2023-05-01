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
      const sales = await prisma.sale.aggregateRaw({
        pipeline: [
          {
            $lookup: {
              from: "ProductSale",
              localField: "_id",
              foreignField: "saleId",
              as: "sales",
            },
          },
          {
            $unwind: "$sales",
          },
          {
            $lookup: {
              from: "Customer",
              localField: "customerId",
              foreignField: "_id",
              as: "customer",
            },
          },
          {
            $lookup: {
              from: "Product",
              localField: "sales.productId",
              foreignField: "_id",
              as: "sales.item",
            },
          },
          {
            $group: {
              _id: {
                $toString: "$_id",
              },
              title: {
                $first: "$title",
              },
              description: {
                $first: "$description",
              },
              totalPrice: {
                $first: "$totalPrice",
              },
              companyId: {
                $first: "$companyId",
              },
              customerId: {
                $first: "$customerId",
              },
              createdAt: {
                $first: "$createdAt",
              },
              updatedAt: {
                $first: "$updatedAt",
              },
              sales: {
                $push: "$sales",
              },
              customer: {
                $first: "$customer",
              },
              status: {
                $first: "$status",
              },
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
              companyId: {
                $toString: "$companyId",
              },
              createdAt: {
                $toString: "$createdAt",
              },
              updatedAt: {
                $toString: "$updatedAt",
              },
              customer: { $arrayElemAt: ["$customer", 0] },
              sales: {
                $map: {
                  input: "$sales",
                  as: "sale",
                  in: {
                    id: {
                      $toString: "$$sale._id",
                    },
                    quantity: "$$sale.quantity",
                    price: "$$sale.price",
                    item: {
                      $arrayElemAt: ["$$sale.item", 0],
                    },
                  },
                },
              },
            },
          },
          {
            $sort: {
              createdAt: -1,
              updatedAt: -1,
            },
          },
        ],
      });
      res.status(200).json({
        success: true,
        data: sales,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: Messages[locale || "gb"].somethingWentWrong,
      });
    }
  }
}
