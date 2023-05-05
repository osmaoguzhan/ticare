import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";
import moment from "moment";
import _ from "lodash";

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
      const data = {};
      const now = moment(new Date());
      const beginningOfTheMonth = now
        .startOf("month")
        .hours(0)
        .minutes(0)
        .seconds(0)
        .toDate();

      // product Count
      data.productCount = await prisma.product.count({
        where: {
          companyId: session?.user?.companyId,
        },
      });

      // pending sales since the beginning of the month
      data.pendingSalesCount = await prisma.sale.count({
        where: {
          companyId: session?.user?.companyId,
          status: "PENDING",
          createdAt: {
            gte: beginningOfTheMonth,
          },
        },
      });

      // latest five completed sales
      data.latestFiveCompletedSales = await prisma.sale.findMany({
        where: {
          companyId: session?.user?.companyId,
          status: "COMPLETED",
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        select: {
          id: true,
          title: true,
          createdAt: true,
          totalPrice: true,
        },
      });
      data.latestFiveCompletedSales.forEach((sale) => {
        sale.createdAt = moment(sale.createdAt).format("DD/MM/YYYY");
      });

      // latest five completed purchases
      data.latestFiveCompletedPurchases = await prisma.purchase.findMany({
        where: {
          companyId: session?.user?.companyId,
          status: "COMPLETED",
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        select: {
          id: true,
          title: true,
          createdAt: true,
          totalPrice: true,
        },
      });
      data.latestFiveCompletedPurchases.forEach((purchase) => {
        purchase.createdAt = moment(purchase.createdAt).format("DD/MM/YYYY");
      });

      // distinct product types
      data.distinctTypes = (
        await prisma.product.aggregateRaw({
          pipeline: [
            {
              $group: {
                _id: "$productType",
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                productType: "$_id",
                count: 1,
              },
            },
            {
              $group: {
                _id: null,
                productTypes: {
                  $push: {
                    productType: "$productType",
                    count: "$count",
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                productTypes: {
                  $arrayToObject: {
                    $map: {
                      input: "$productTypes",
                      as: "type",
                      in: ["$$type.productType", "$$type.count"],
                    },
                  },
                },
              },
            },
          ],
        })
      )[0]["productTypes"];

      // out of stock products
      data.outOfStockProducts = (
        await prisma.product.aggregateRaw({
          pipeline: [
            { $match: { companyId: { $oid: session?.user?.company.id } } },
            {
              $lookup: {
                from: "ProductSale",
                localField: "_id",
                foreignField: "productId",
                as: "sales",
              },
            },
            {
              $lookup: {
                from: "ProductPurchase",
                localField: "_id",
                foreignField: "productId",
                as: "purchases",
              },
            },
            {
              $project: {
                stock: {
                  $subtract: [
                    { $sum: "$purchases.quantity" },
                    { $sum: "$sales.quantity" },
                  ],
                },
              },
            },
            { $match: { stock: { $lte: 0 } } },
            { $group: { _id: null, count: { $sum: 1 } } },
            { $project: { _id: 0, count: 1 } },
          ],
        })
      )[0].count;

      // sales total price since the beginning of the month
      let salesTotalPrice = (
        await prisma.sale.findMany({
          where: {
            companyId: session?.user?.companyId,
            status: "COMPLETED",
            createdAt: {
              gte: beginningOfTheMonth,
            },
          },
          select: { totalPrice: true },
        })
      ).reduce((a, b) => a + b.totalPrice, 0);

      // purchases total price since the beginning of the month
      let purchasesTotalPrice = (
        await prisma.purchase.findMany({
          where: {
            companyId: session?.user?.companyId,
            status: "COMPLETED",
            createdAt: {
              gte: beginningOfTheMonth,
            },
          },
          select: { totalPrice: true },
        })
      ).reduce((a, b) => a + b.totalPrice, 0);
      data.profit = Number(salesTotalPrice - purchasesTotalPrice).toFixed(2);

      const groupCorrection = (array) => {
        const groups = {};
        array.forEach((item) => {
          const day = moment(item.createdAt).format("DD/MM/YYYY");
          if (!groups[day]) {
            groups[day] = [];
          }
          groups[day].push(item._sum.totalPrice);
        });
        return groups;
      };
      // profit since the beginning of the month day by day
      const dayByDaySale = await prisma.sale.groupBy({
        by: ["createdAt"],
        where: {
          companyId: session?.user?.company.id,
          status: "COMPLETED",
          createdAt: {
            gte: beginningOfTheMonth,
          },
        },
        _sum: {
          totalPrice: true,
        },
      });

      const dayByDayPurchase = await prisma.purchase.groupBy({
        by: ["createdAt"],
        where: {
          companyId: session?.user?.company.id,
          status: "COMPLETED",
          createdAt: {
            gte: beginningOfTheMonth,
          },
        },
        _sum: {
          totalPrice: true,
        },
      });
      const correctedSale = groupCorrection(dayByDaySale);
      const correctedPurchase = groupCorrection(dayByDayPurchase);
      Object.keys(correctedSale).forEach((key) => {
        correctedSale[key] = _.sum(correctedSale[key]);
      });
      Object.keys(correctedPurchase).forEach((key) => {
        correctedPurchase[key] = _.sum(correctedPurchase[key]);
      });

      data.profitSinceTheBeginningOfTheMonth = _.mergeWith(
        correctedSale,
        correctedPurchase,
        (sale, purchase) =>
          _.isNumber(purchase) && _.isNumber(sale) ? sale - purchase : undefined
      );

      data.profitSinceTheBeginningOfTheMonth = Object.keys(
        data.profitSinceTheBeginningOfTheMonth
      )
        .sort((a, b) => moment(a, "DD/MM/YYYY") - moment(b, "DD/MM/YYYY"))
        .reduce((acc, key) => {
          acc[key] = data.profitSinceTheBeginningOfTheMonth[key];
          return acc;
        }, {});

      // top customers by the count of sales
      const topFiveCustomers = await prisma.sale.groupBy({
        by: ["customerId"],
        where: {
          companyId: session?.user?.company.id,
          status: "COMPLETED",
        },
        _count: {
          customerId: true,
        },
        _sum: {
          totalPrice: true,
        },
        orderBy: {
          _count: {
            customerId: "desc",
          },
        },
        take: 5,
      });
      data.topFiveCustomers = [];
      for (const customer of topFiveCustomers) {
        let customerData = await prisma.customer.findUnique({
          where: {
            id: customer.customerId,
          },
          select: {
            name: true,
            surname: true,
          },
        });
        data.topFiveCustomers.push({
          id: customer.customerId,
          count: customer._count.customerId,
          totalPrice: customer._sum.totalPrice,
          customer: `${customerData.name} ${customerData.surname}`,
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: Messages[locale || "gb"].somethingWentWrong,
      });
    }
  }
}
