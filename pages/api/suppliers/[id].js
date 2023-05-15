import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";
import { getSupplier } from "@/lib/dbQueries/supplier";

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
    let supplier = await prisma.supplier.findUnique(getSupplier(id));
    supplier = {
      ...supplier,
      company: {
        key: supplier.company.id,
        label: supplier.company.name,
      },
    };
    res.status(200).json({ success: true, data: supplier });
  }
}
