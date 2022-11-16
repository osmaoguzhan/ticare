import prisma from "@/lib/Prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, surname, email, password } = req.body;
    try {
      await prisma.user.create({
        data: {
          name,
          surname,
          email,
          password,
        },
      });
      console.log("====================================");
      console.log(req.body);
      console.log("====================================");
      res.status(200).send({
        success: true,
        message: "Successfully added.",
        data: { name, surname, email },
      });
    } catch (err) {
      res.status(400).send({
        success: false,
        message: "Error occured.",
        data: null,
      });
    }
  }
}
