import { Messages } from "@/utils/Messages";
import prisma from "@/lib/prismaConnector";

export default async function handler(req, res) {
  let { locale } = req.headers;
  locale = locale || "gb";
  if (req.method === "GET") {
    const { countryId, stateId } = req.query;
    try {
      if (countryId) {
        let result = {};
        let country = await prisma.country.findUnique({
          where: {
            id: countryId,
          },
        });
        if (stateId) {
          country.states = country.states.filter(
            (state) => state.id === parseInt(stateId)
          );
          result = country.states[0].cities.map((city) => {
            return { key: city.id, label: city.name };
          });
        } else {
          result.states = country.states.map((state) => {
            return { key: state.id, label: state.name };
          });
          result.timezones = country.timezones.map((timezone) => {
            return { key: timezone.gmtOffset, label: timezone.zoneName };
          });
          result.curreny = `${country.currency} - ${country.currency_symbol}`;
          result = {
            ...result,
            phone_code: country.phone_code,
            flag: country.flag,
            postalCodeRegex: country.postalCodeRegex,
            postalCodeFormat: country.postalCodeFormat,
          };
        }
        res.status(200).json({ success: true, data: result });
      } else {
        const returnData = [];
        const countries = await prisma.country.findMany({
          select: {
            id: true,
            name: true,
            translations: true,
          },
        });
        switch (locale) {
          case "pl":
            countries.forEach((country) => {
              returnData.push({
                key: country.id,
                label: country.translations.pl,
              });
            });
            break;
          case "tr":
            countries.forEach((country) => {
              returnData.push({
                key: country.id,
                label: country.translations.tr,
              });
            });
            break;
          case "gb":
          default:
            countries.forEach((country) => {
              returnData.push({
                key: country.id,
                label: country.name,
              });
            });
            break;
        }
        res.status(200).json({ success: true, data: returnData });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: Messages[locale].somethingWentWrong });
    }
  }
}
