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
      const data = req.body;
      const sale = await prisma.sale.create({
        data: {
          title: data.title,
          description: data.description,
          totalPrice: data.products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          ),
          customerId: data.customer.key,
          companyId: session?.user?.company.id,
        },
      });
      if (sale) {
        const productSales = await prisma.productSale.createMany({
          data: data.products.map((product, idx) => ({
            productId: "6447e72f2bab4537b8be2f1" + idx, // TODO: after product page is done, change this to product.id
            saleId: sale.id,
            quantity: product.quantity,
            price: product.price,
          })),
        });
        res.status(200).json({
          success: true,
          message: Messages[locale || "gb"].customerAdded,
          data: [productSales, sale],
        });
      } else {
        res.status(500).json({
          success: false,
          message: Messages[locale || "gb"].somethingWentWrong,
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
