// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import sendMail from "@/utils/helpers/mailer";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, firstName, lastName } = req.body;
    sendMail(
      email,
      "From Ticare App",
      `Hello ${firstName} ${lastName}, welcome to Ticare App.`
    );
  }
}
