import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";
import { getUniqueSale } from "@/lib/dbQueries/sale";

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
    const { id } = req.query;
    let sale = (await prisma.sale.aggregateRaw(getUniqueSale(id)))[0];
    sale["company"] = {
      key: sale.companyId,
      label: sale.companyName,
    };
    sale["customer"] = {
      key: sale.customerId,
      label: sale.customerNameSurname,
    };
    if (!sale) {
      res.status(404).json({
        success: false,
        message: Messages[locale || "gb"].saleNotFound,
      });
    } else {
      sale.products.forEach((product) => {
        const productSale = sale.productSales.find(
          (productSale) => productSale.productId === product.id
        );
        product.quantity = productSale?.quantity;
      });
      res.status(200).json({ success: true, data: sale });
    }
  }
}
