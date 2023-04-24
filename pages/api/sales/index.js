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
    const sales = [
      {
        id: 1,
        title: "Sale 1",
        description: "Sale 1 description",
        totalPrice: 100 + 122 * 12 + 44 * 3,
        customer: "Customer 1 name and surname",
        products: [
          {
            id: 1,
            name: "Product 1",
            price: 100,
            quantity: 1,
          },
          {
            id: 1,
            name: "Product 2",
            price: 122,
            quantity: 12,
          },
          {
            id: 1,
            name: "Product 3",
            price: 44,
            quantity: 3,
          },
        ],
        date: "2021-01-01",
      },
    ];
    res.status(200).json({
      success: true,
      data: sales,
    });
  }
}
