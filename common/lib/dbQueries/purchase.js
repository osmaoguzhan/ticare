import Constants from "@/utils/Constants";
import _ from "lodash";

export function getPurhcases(session) {
  let query = {
    pipeline: [
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
          company: {
            $first: "$company",
          },
          supplierId: {
            $first: "$supplierId",
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
          companyName: { $arrayElemAt: ["$company.name", 0] },
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
  };
  if (session?.user?.role === Constants.ROLES.USER) {
    query = {
      ...query,
      pipeline: [
        {
          $match: {
            companyId: { $oid: session?.user?.company.id },
          },
        },
        ...query.pipeline,
      ],
    };
  }
  return query;
}

export function createPurhcaseQuery(data, session) {
  let companyId = data.companyId || session?.user?.company.id;
  let query = {
    data: {
      title: data.title,
      description: data.description,
      totalPrice: data.products.reduce(
        (acc, product) => acc + product.purchasePrice * product.quantity,
        0
      ),
      status: data.status,
      supplierId: data.supplierId,
      productPurchase: {
        create: data.products.map((product) => ({
          quantity: product.quantity,
          price: product.purchasePrice,
          product: {
            connect: {
              id: product.id,
            },
          },
        })),
      },
      companyId,
    },
  };
  return query;
}

export function getUniquePurchaseQuery(id) {
  return {
    pipeline: [
      {
        $match: {
          _id: { $oid: id },
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
          from: "Supplier",
          localField: "supplierId",
          foreignField: "_id",
          as: "supplier",
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
          companyName: { $arrayElemAt: ["$company.name", 0] },
          supplierId: { $toString: "$supplierId" },
          supplierNameSurname: {
            $concat: [
              { $arrayElemAt: ["$supplier.name", 0] },
              " ",
              { $arrayElemAt: ["$supplier.surname", 0] },
            ],
          },
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
  };
}

export function updatePurchaseQuery(data, session, id, productPurchases) {
  let companyId = data.companyId || session?.user?.company.id;
  const toBeDeleted = _.differenceWith(
    productPurchases,
    data.products,
    (a, b) => a.productId === b.id
  );
  const toBeAdded = _.differenceWith(
    data.products,
    productPurchases,
    (a, b) => a.id === b.productId
  );
  const toBeUpdated = _.intersectionWith(
    productPurchases,
    data.products,
    (a, b) => a.productId === b.id && a.quantity !== b.quantity
  );
  let query = {
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      totalPrice: data.products.reduce(
        (acc, product) => acc + product.purchasePrice * product.quantity,
        0
      ),
      status: data.status,
      supplierId: data.supplierId,
      companyId,
      productPurchase: {
        deleteMany: toBeDeleted.map((d) => ({
          id: d.id,
        })),
        updateMany: toBeUpdated.map((d) => ({
          where: { id: d.id },
          data: {
            quantity: data.products.find((p) => p.id === d.productId).quantity,
            price: d.purchasePrice,
          },
        })),
        create: toBeAdded.map((d) => ({
          quantity: d.quantity,
          price: d.purchasePrice,
          product: {
            connect: {
              id: d.id,
            },
          },
        })),
      },
    },
  };
  return query;
}
