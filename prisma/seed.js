const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const [country] = await prisma.country.findMany({
    where: {
      name: "Turkey",
    },
  });
  const osma = await prisma.user.create({
    data: {
      name: "Oguzhan",
      surname: "Osma",
      email: "osmaoguzhan@outlook.com",
      password: "123456",
      role: "USER",
      phoneNumber: "123456789",
      settings: {
        language: "gb",
        currency: "USD",
        timezone: "UTC",
        theme: "light",
      },
    },
  });
  const company = await prisma.company.create({
    data: {
      name: "Company",
      description: "Company Description",
      address: "Company Address",
      city: country.states[0].name,
      country: country.name,
      zipCode: "Company Zip Code",
      phoneNumber: "Company Phone Number",
      email: "Company Email",
      website: "Company Website",
      ownerId: osma.id,
    },
  });
  // console.log(turkey.states[0].name);
  console.log(osma);
  console.log(company);
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
