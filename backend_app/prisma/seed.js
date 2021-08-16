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
  const coffeeListPromises = await coffeeList.map(async (coffee) => {
    return await prisma.coffee.create({
      data: coffee,
    });
  });
  const createdCoffeeList = await Promise.all(coffeeListPromises);
  console.log(createdCoffeeList);

  //   const specialRequestListPromises = await specialRequestList.map(
  //     async (specialRequest) => {
  //       return await prisma.special_request.create({
  //         data: specialRequest,
  //       });
  //     }
  //   );
  //   const createdSpecialRequestList = await Promise.all(
  //     specialRequestListPromises
  //   );
  // const specialRequestIds = createdSpecialRequestList.map(
  //   (request) => request.id
  // );
  // console.log(createdSpecialRequestList);
  //   const shopListPromises = await shopList.map(async (shop) => {
  //     return await prisma.shop.create({
  //       data: shop,
  //     });
  //   });
  //   const createdShopList = await Promise.all(shopListPromises);
  //   const shopIds = createdShopList.map((shop) => shop.id);
  //   console.log(createdShopList);
  // const users = buildUserList();
  // const usersPromises = await users.map(async (user) => {
  //   return await prisma.user.create({
  //     data: user,
  //   });
  // });
  // const createdUser = await Promise.all(usersPromises);
  // const userId = createdUser.map((shop) => shop.id);
  // console.log(createdUser);
  //   for (let j = 0; j < 5; j++) {
  //     let transactionList = buildTransactionsList();
  //     for (const oneTransaction of transactionList) {
  //       oneTransaction.user_id = j + 1;
  //       oneTransaction.shop_id = getRandomInt(1, 2);
  //       const createdTransaction = await prisma.transaction.create({
  //         data: oneTransaction,
  //       });
  //       console.log(createdTransaction);
  //       const numOfOrder = getRandomInt(1, 3);
  //       for (let i = 0; i < numOfOrder; i++) {
  //         let orderData = {
  //           quantity: getRandomInt(1, 3),
  //           transaction_id: createdTransaction.id,
  //           coffee_id: getRandomInt(1, 40),
  //   special_request: {
  //     create: [{ name: getRandomInt(1, 10) }],
  //   },
  //         };
  //         const createdOrder = await prisma.coffee_order.create({
  //           data: orderData,
  //         });
  //         console.log(createdOrder);
  //       }
  //     }
  //   }
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
