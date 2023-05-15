import Constants from "@/utils/Constants";
import _ from "lodash";

export function getUniqueProduct(id) {
  return {
    where: { id },
    include: {
      company: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  };
}

export function getProducts(session, params) {
  let query = {
    pipeline: [
      {
        $match: {
          isActive: true,
        },
      },
      {
        $lookup: {
          from: "Company",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
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
          companyId: { $toString: "$companyId" },
          companyName: { $arrayElemAt: ["$company.name", 0] },
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
  };

  if (
    session?.user?.role === Constants.ROLES.USER ||
    !_.isNil(params?.companyId)
  ) {
    let companyId = params?.companyId || session?.user?.company.id;
    query.pipeline[0].$match.companyId = { $oid: companyId };
  }
  return query;
}

export function productRelationsQuery(ids) {
  return {
    pipeline: [
      {
        $match: {
          _id: {
            $in: ids.map((id) => {
              return { $oid: id };
            }),
          },
        },
      },
      {
        $lookup: {
          from: "ProductSale",
          localField: "_id",
          foreignField: "productId",
          as: "ProductSale",
        },
      },
      {
        $lookup: {
          from: "ProductPurchase",
          localField: "_id",
          foreignField: "productId",
          as: "ProductPurchase",
        },
      },
      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          isDeletable: {
            $eq: [
              {
                $add: [
                  { $size: "$ProductSale" },
                  { $size: "$ProductPurchase" },
                ],
              },
              0,
            ],
          },
        },
      },
    ],
  };
}
