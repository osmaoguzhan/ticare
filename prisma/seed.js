const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  let user = await prisma.user.findUnique({
    where: { id: "63ac04e41b39c40b983419f6" },
    select: {
      company: true,
    },
  });
  console.log(user);
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
