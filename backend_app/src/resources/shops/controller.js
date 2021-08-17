const { shop } = require("../../utils/database");

const getAll = async (req, res) => {
  try {
    const allShops = await shop.findMany();
    res.json(allShops);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

const getUniqueShop = async (req, res) => {
  const { postcode } = req.params;
  try {
    const uniqueShop = await shop.findUnique({
      where: { postcode },
    });
    res.json(uniqueShop);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getShopsEstimateTime = async (req, res) => {
  try {
    const shopsPendingQuantity = await shop.findMany({
      select: {
        postcode: true,
        transactions: {
          where: { status: "pending" },
          select: {
            coffeeOrder: {
              select: { quantity: true },
            },
          },
        },
      },
    });

    const result = shopsPendingQuantity.map((target) => {
      let totalPendingCoffee = 0;
      for (const transaction of target.transactions) {
        transaction.coffeeOrder.map(
          (order) => (totalPendingCoffee = totalPendingCoffee + order.quantity)
        );
      }

      return {
        postcode: target.postcode,
        pendingCupOfCoffee: totalPendingCoffee,
        estimateTime: totalPendingCoffee * 2,
      };
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

module.exports = { getAll, getUniqueShop, getShopsEstimateTime };
