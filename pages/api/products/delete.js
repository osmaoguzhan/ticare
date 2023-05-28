import { Messages } from "@/utils/Messages";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prismaConnector";
import { productRelationsQuery } from "@/lib/dbQueries/product";
import _ from "lodash";

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
    const data = req.body;
    const result = await prisma.product.aggregateRaw(
      productRelationsQuery(data)
    );
    let [toBeDeleted, toBeInactivated] = _.partition(result, {
      isDeletable: true,
    });
    toBeDeleted.length > 0 &&
      (await prisma.product.deleteMany({
        where: {
          id: {
            in: toBeDeleted.map((i) => i.id),
          },
        },
      }));
    toBeInactivated.length > 0 &&
      (await prisma.product.updateMany({
        where: {
          id: {
            in: toBeInactivated.map((i) => i.id),
          },
        },
        data: {
          isActive: false,
        },
      }));

    return res.status(200).json({
      success: true,
      data: result,
      message: Messages[locale || "gb"].productDeleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: Messages[locale || "gb"].somethingWentWrong,
    });
  }
}
