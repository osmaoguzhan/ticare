import Constants from "@/utils/Constants";
import _ from "lodash";

export function getSales(session) {
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
          company: {
            $first: "$company",
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
          companyName: { $arrayElemAt: ["$company.name", 0] },
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

export function getUniqueSale(id) {
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
        $lookup: {
          from: "Customer",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
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
          companyName: { $arrayElemAt: ["$company.name", 0] },
          companyId: { $toString: "$companyId" },
          createdAt: { $toString: "$createdAt" },
          customerId: { $toString: "$customerId" },
          customerNameSurname: {
            $concat: [
              { $arrayElemAt: ["$customer.name", 0] },
              " ",
              { $arrayElemAt: ["$customer.surname", 0] },
            ],
          },
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
  };
}

export function createSaleQuery(data, session) {
  let companyId = data.companyId || session?.user?.company.id;
  let query = {
    data: {
      title: data.title,
      description: data.description,
      totalPrice: data.products.reduce(
        (acc, product) => acc + product.salePrice * product.quantity,
        0
      ),
      status: data.status,
      customerId: data.customerId,
      productSale: {
        create: data.products.map((product) => ({
          quantity: product.quantity,
          price: product.salePrice,
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

export function updateSaleQuery(data, session, id, productSales) {
  let companyId = data.companyId || session?.user?.company.id;
  const toBeDeleted = _.differenceWith(
    productSales,
    data.products,
    (a, b) => a.productId === b.id
  );
  const toBeAdded = _.differenceWith(
    data.products,
    productSales,
    (a, b) => a.id === b.productId
  );
  const toBeUpdated = _.intersectionWith(
    productSales,
    data.products,
    (a, b) => a.productId === b.id && a.quantity !== b.quantity
  );
  let query = {
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      totalPrice: data.products.reduce(
        (acc, product) => acc + product.salePrice * product.quantity,
        0
      ),
      status: data.status,
      customerId: data.customerId,
      companyId,
      productSale: {
        deleteMany: toBeDeleted.map((d) => ({
          id: d.id,
        })),
        updateMany: toBeUpdated.map((d) => ({
          where: { id: d.id },
          data: {
            quantity: data.products.find((p) => p.id === d.productId).quantity,
            price: d.salePrice,
          },
        })),
        create: toBeAdded.map((d) => ({
          quantity: d.quantity,
          price: d.salePrice,
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
