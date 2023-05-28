import { getPurhcases } from "@/lib/dbQueries/purchase";
import handleRequest from "@/lib/handleRequest";
import prisma from "@/lib/prismaConnector";

export default async function handler(req, res) {
  return handleRequest(req, res, async (req, res, session) => {
    let purchases = await prisma.purchase.aggregateRaw(getPurhcases(session));
    return res.status(200).json({
      success: true,
      data: purchases,
    });
  });
}
