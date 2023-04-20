const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  let countries = await prisma.country.findMany();
  console.log("====================================");
  console.log("countries", countries);
  console.log("====================================");
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
