import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";
import { getSession } from "next-auth/react";

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
    if (req.method === "GET") {
      try {
        const company = await prisma.company.findUnique({
          where: { userId: userid },
        });
        return res.status(200).json({ success: true, data: company });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: Messages[locale || "gb"].somethingWentWrong,
        });
      }
    }
    if (req.method === "POST") {
      try {
        const data = req.body;
        const company = await prisma.company.create({
          data: {
            name: data.name,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            description: data.description,
            phoneNumber: data.phoneNumber,
            email: data.email,
            website: data.website,
            currency: data.currency,
            userId: userid,
          },
        });
        return res.status(200).json({
          success: true,
          data: company,
          message: Messages[locale || "gb"].companyCreated,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: Messages[locale || "gb"].somethingWentWrong,
        });
      }
    }
    if (req.method === "PUT") {
      try {
        const data = req.body;
        const company = await prisma.company.update({
          where: {
            id: data.id,
          },
          data: {
            name: data.name,
            address: data.address,
            description: data.description,
            phoneNumber: data.phoneNumber,
            email: data.email,
            website: data.website,
            currency: data.currency,
          },
        });
        return res.status(200).json({
          success: true,
          data: company,
          message: Messages[locale || "gb"].companyUpdated,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: Messages[locale || "gb"].somethingWentWrong,
        });
      }
    }
  }
}
