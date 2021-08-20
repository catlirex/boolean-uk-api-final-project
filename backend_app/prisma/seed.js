const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getRandomInt,
  coffeeList,
  specialRequestList,
  shopList,
  buildUserList,
  buildTransactionsList,
} = require("../src/utils/mockData");

const getRandomElement = (array) => {
  const number = Math.floor(Math.random() * array.length);
  return array[number];
};

async function seed() {
  const createdCoffeeList = [];

  for (coffeeData of coffeeList) {
    const createdCoffee = await prisma.coffee.create({
      data: coffeeData,
    });
    console.log(createdCoffee);
    createdCoffeeList.push(createdCoffee);
  }

  const createdSpecialRequestList = [];
  for (const specialRequest of specialRequestList) {
    const createdRequest = await prisma.specialRequest.create({
      data: specialRequest,
    });

    console.log(createdRequest);
    createdSpecialRequestList.push(createdRequest);
  }

  const createdShopList = [];
  for (const shopData of shopList) {
    const createdShop = await prisma.shop.create({
      data: shopData,
    });

    console.log(createdShop);
    createdShopList.push(createdShop);
  }

  // const usersList = buildUserList();
  // const createdUsersList = [];

  // for (const userData of usersList) {
  //   const createdUser = await prisma.user.create({
  //     data: userData,
  //   });

  //   console.log(createdUser);
  //   createdUsersList.push(createdUser);
  // }

  // for (const user of createdUsersList) {
  //   let transactionList = buildTransactionsList();
  //   for (const oneTransaction of transactionList) {
  //     oneTransaction.user_id = user.id;
  //     oneTransaction.shop_id = getRandomInt(1, 3);
  //     const createdTransaction = await prisma.transaction.create({
  //       data: oneTransaction,
  //     });
  //     console.log(createdTransaction);
  //     const numOfOrder = getRandomInt(1, 3);
  //     for (let i = 0; i < numOfOrder; i++) {
  //       let orderData = {
  //         quantity: getRandomInt(1, 3),
  //         transaction_id: createdTransaction.id,
  //         coffee_id: getRandomInt(1, 40),
  //         specialRequests: {
  //           create: [
  //             {
  //               specialRequest: {
  //                 connect: {
  //                   id: getRandomInt(1, 10),
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       };
  //       const createdOrder = await prisma.coffeeOrder.create({
  //         data: orderData,
  //       });
  //       console.log(createdOrder);
  //     }
  //   }
  // }
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
