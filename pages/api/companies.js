import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";

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
    let companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    companies = companies.map((company) => ({
      key: company.id,
      label: company.name,
    }));
    return res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].somethingWentWrong,
    });
  }
}
