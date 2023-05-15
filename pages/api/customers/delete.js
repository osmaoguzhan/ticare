import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";
import { customerRelationsQuery } from "@/lib/dbQueries/customer";
import _ from "lodash";

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
      const result = await prisma.customer.aggregateRaw(
        customerRelationsQuery(data)
      );
      let [toBeDeleted, toBeInactivated] = _.partition(result, {
        isDeletable: true,
      });
      toBeDeleted.length > 0 &&
        (await prisma.customer.deleteMany({
          where: {
            id: {
              in: toBeDeleted.map((i) => i.id),
            },
          },
        }));
      toBeInactivated.length > 0 &&
        (await prisma.customer.updateMany({
          where: {
            id: {
              in: toBeInactivated.map((i) => i.id),
            },
          },
          data: {
            isActive: false,
          },
        }));

      res.status(200).json({
        success: true,
        data: result,
        message: Messages[locale || "gb"].customerDeleted,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: Messages[locale || "gb"].somethingWentWrong,
      });
    }
  }
}
