import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";

export default async function handler(req, res) {
  const { locale } = req.headers;
  if (req.method === "GET") {
    try {
      let currencies = await prisma.country.aggregateRaw({
        pipeline: [
          {
            $project: {
              currency_with_symbol: {
                $concat: ["$currency", " - ", "$currency_symbol"],
              },
            },
          },
          {
            $group: {
              _id: null,
              currency: { $addToSet: "$currency_with_symbol" },
            },
          },
          { $project: { _id: 0 } },
        ],
      });
      currencies = currencies[0].currency.map((currency) => {
        return {
          label: currency,
          key: currency.split(" - ")[0],
        };
      });
      res.status(200).json({ success: true, data: currencies });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: Messages[locale].somethingWentWrong });
    }
  }
}
