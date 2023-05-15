import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";
import { getCustomer } from "@/lib/dbQueries/customer";

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
      const { id } = req.query;
      let customer = await prisma.customer.findUnique(getCustomer(id));
      customer = {
        ...customer,
        company: {
          key: customer.company.id,
          label: customer.company.name,
        },
      };
      res.status(200).json({ success: true, data: customer });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: Messages[locale || "gb"].somethingWentWrong,
      });
    }
  }
}
