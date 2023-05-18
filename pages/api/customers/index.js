import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";
import { getCustomers } from "@/lib/dbQueries/customer";

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
    const params = req.query;
    const customers = await prisma.customer.findMany(
      getCustomers(session, params)
    );
    customers.forEach((customer) => {
      customer.companyName = customer.company.name;
      delete customer.company;
    });
    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].somethingWentWrong,
    });
  }
}
