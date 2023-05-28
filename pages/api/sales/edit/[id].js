import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";
import _ from "lodash";
import { crudProductSaleQuery, updateSaleQuery } from "@/lib/dbQueries/sale";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { locale } = req.headers;
  const userid = session?.user?.id;
  if (!session || !userid) {
    return res.status(401).send({
      success: false,
      message: Messages[locale || "gb"].notPermitted,
    });
  }
  try {
    let data = req.body;
    let { id } = req.query;
    const sale = await prisma.sale.findUnique({
      where: { id },
    });
    if (!sale) {
      return res.status(404).json({
        success: false,
        message: Messages[locale || "gb"].saleNotFound,
      });
    }
    const productSales = await prisma.productSale.findMany({
      where: { saleId: id },
    });
    await prisma.sale.update(updateSaleQuery(data, session, id, productSales));
    return res.status(200).json({
      success: true,
      message: Messages[locale || "gb"].saleUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].somethingWentWrong,
    });
  }
}
