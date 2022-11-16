const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const osma = await prisma.user.create({
    data: {
      name: "Oguzhan",
      surname: "Osma",
      email: "osmaoguzhan@outlook.com",
      password: "123456",
      role: "ADMIN",
      phoneNumber: "123456789",
      settings: {
        language: "gb",
        currency: "USD",
        timezone: "UTC",
        theme: "light",
      },
    },
  });
  console.log({ osma });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
