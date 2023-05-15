const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const sale = await prisma.sale.update({
    where: { id: "646222be7f12ec35c37d2c11" },
    data: {
      productSale: {
        updateMany: [
          {
            where: { id: "646227e37f12ec35c37d2c14" },
            data: { quantity: 2 },
          },
          {
            where: { id: "6462282c7f12ec35c37d2c17" },
            data: { quantity: 3 },
          },
        ],
      },
    },
  });
  console.log(sale);
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
