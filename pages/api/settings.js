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
    switch (req.method) {
      case "GET":
        try {
          const user = await prisma.user.findUnique({
            where: { id: userid },
          });
          if (!user?.company) {
            res.status(200).json({ success: true, data: null });
          } else {
            const company = await prisma.company.findUnique({
              where: {
                id: user.companyId,
              },
            });
            res.status(200).json({ success: true, data: company });
          }
        } catch (error) {
          res.status(500).json({
            success: false,
            message: Messages[locale || "gb"].somethingWentWrong,
          });
        }
        break;
      case "POST":
        try {
          const data = req.body;
          const company = await prisma.company.create({
            data: {
              name: data.name,
              address: data.address,
              description: data.description,
              phoneNumber: data.phoneNumber,
              email: data.email,
              website: data.website,
            },
          });
          await prisma.user.update({
            where: {
              id: userid,
            },
            data: {
              companyId: company.id,
            },
          });
          res.status(200).json({
            success: true,
            data: company,
            message: Messages[locale || "gb"].companyCreated,
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: Messages[locale || "gb"].somethingWentWrong,
          });
        }
        break;
      case "PUT":
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
            },
          });
          res.status(200).json({
            success: true,
            data: company,
            message: Messages[locale || "gb"].companyUpdated,
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: Messages[locale || "gb"].somethingWentWrong,
          });
        }
        break;
    }
  }
}
