// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import sendMail from "@/utils/helpers/mailer";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, surname } = req.body;
    sendMail(
      email,
      "From Ticare App",
      `Hello ${name} ${surname}, welcome to Ticare App.`
    );
  }
}
