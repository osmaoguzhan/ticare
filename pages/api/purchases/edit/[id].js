import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";
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
      let data = req.body;
      let { id } = req.query;
      const purchase = await prisma.purchase.findUnique({
        where: { id },
      });
      if (!purchase) {
        res.status(404).json({
          success: false,
          message: Messages[locale || "gb"].purchaseNotFound,
        });
      } else {
        await prisma.purchase.update({
          where: { id },
          data: {
            title: data.title,
            description: data.description,
            totalPrice: data.products.reduce(
              (acc, product) => acc + product.purchasePrice * product.quantity,
              0
            ),
            status: data.status,
            customerId: data.customer.key,
          },
        });

        const productPurchases = await prisma.productPurchase.findMany({
          where: { purchaseId: id },
        });

        const toBeDeleted = _.differenceWith(
          productPurchases,
          data.products,
          (a, b) => a.productId === b.id
        );
        if (toBeDeleted.length > 0) {
          await prisma.productPurchase.deleteMany({
            where: {
              id: {
                in: toBeDeleted.map((d) => d.id),
              },
            },
          });
        }
        const toBeAdded = _.differenceWith(
          data.products,
          productPurchases,
          (a, b) => a.id === b.productId
        );
        if (toBeAdded.length > 0) {
          await prisma.productPurchase.createMany({
            data: toBeAdded.map((d) => ({
              purchaseId: id,
              productId: d.id,
              quantity: d.quantity,
              price: d.purchasePrice,
            })),
          });
        }
        const toBeUpdated = _.intersectionWith(
          productPurchases,
          data.products,
          (a, b) => a.productId === b.id && a.quantity !== b.quantity
        );
        if (toBeUpdated.length > 0) {
          toBeUpdated.forEach(async (d) => {
            await prisma.productPurchase.update({
              where: { id: d.id },
              data: {
                quantity: data.products.find((p) => p.id === d.productId)
                  .quantity,
              },
            });
          });
        }

        res.status(200).json({
          success: true,
          message: Messages[locale || "gb"].purchaseUpdated,
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
