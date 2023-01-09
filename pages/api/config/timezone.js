import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";

export default async function handler(req, res) {
  const { locale } = req.headers;
  if (req.method === "GET") {
    try {
      let timezones = await prisma.timezone.findMany();
      timezones = timezones.map((timezone) => {
        return {
          label: timezone.text,
          key: timezone.value,
        };
      });
      res.status(200).json({ success: true, data: timezones });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: Messages[locale].somethingWentWrong });
    }
  }
}
