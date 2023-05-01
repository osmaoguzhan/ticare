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
      const purchases = await prisma.purchase.aggregateRaw({
        pipeline: [
          {
            $lookup: {
              from: "ProductPurchase",
              localField: "_id",
              foreignField: "purchaseId",
              as: "purchases",
            },
          },
          {
            $unwind: "$purchases",
          },
          {
            $lookup: {
              from: "Supplier",
              localField: "supplierId",
              foreignField: "_id",
              as: "supplier",
            },
          },
          {
            $lookup: {
              from: "Product",
              localField: "purchases.productId",
              foreignField: "_id",
              as: "purchases.item",
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
              supplierId: {
                $first: "$customerId",
              },
              createdAt: {
                $first: "$createdAt",
              },
              updatedAt: {
                $first: "$updatedAt",
              },
              purchases: {
                $push: "$purchases",
              },
              supplier: {
                $first: "$supplier",
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
              supplier: { $arrayElemAt: ["$supplier", 0] },
              purchases: {
                $map: {
                  input: "$purchases",
                  as: "purchase",
                  in: {
                    id: {
                      $toString: "$$purchase._id",
                    },
                    quantity: "$$purchase.quantity",
                    price: "$$purchase.price",
                    item: {
                      $arrayElemAt: ["$$purchase.item", 0],
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
        data: purchases,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: Messages[locale || "gb"].somethingWentWrong,
      });
    }
  }
}
