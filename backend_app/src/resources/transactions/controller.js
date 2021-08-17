const { transaction } = require("../../utils/database");

const getTransactionDetailsById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await transaction.findUnique({
      where: { id },
      include: {
        coffeeOrder: {
          include: {
            specialRequests: { include: { specialRequest: true } },
            coffee: { select: { name: true, size: true } },
          },
        },
      },
    });
    if (result) res.json(result);
    if (!result) res.json({ msg: "Item not found" });
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

const getAllTransactionsForOneUser = async (req, res) => {
  const id = Number(req.params.userId);
  try {
    const result = await transaction.findMany({
      where: { user: { id } },
    });
    if (result) res.json(result);
    if (!result) res.json({ msg: "Item not found" });
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

const todaysDate = () => {
  const todaysDate = new Date();
  const strTodaysDate = todaysDate.toISOString();
  const dateOnly = strTodaysDate.slice(0, 10);
  const finalDate = dateOnly + "T00:00:00.000Z";
  return finalDate;
};

const todaysTransactionsForOneShop = async (req, res) => {
  const id = Number(req.params.shopId);
  const today = todaysDate();
  try {
    const result = await transaction.findMany({
      where: {
        shop: { id },
        transaction_time: {
          gte: new Date(today),
        },
      },
    });

    if (result) res.json(result);
    if (!result) res.json({ msg: "Item not found" });
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

module.exports = {
  getTransactionDetailsById,
  getAllTransactionsForOneUser,
  todaysTransactionsForOneShop,
};
