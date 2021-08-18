const { transaction, coffeeOrder } = require("../../utils/database");

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
      include: { coffeeOrder: { include: { coffee: true } } },
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

const createTransaction = async (req, res) => {
  const { coffee_orders, ...newTransaction } = req.body;

  try {
    const createdTransaction = await transaction.create({
      data: newTransaction,
    });
    for (const coffeeOrderData of coffee_orders) {
      const { specialRequests, quantity, coffee_id } = coffeeOrderData;
      const createdOrder = await coffeeOrder.create({
        data: {
          quantity,
          transaction: { connect: { id: createdTransaction.id } },
          coffee: { connect: { id: coffee_id } },
          specialRequests: { create: specialRequests },
        },
      });
    }

    const createdTransactionWithOrder = await transaction.findUnique({
      where: { id: createdTransaction.id },
      include: { coffeeOrder: { include: { specialRequests: true } } },
    });

    if (createdTransactionWithOrder) res.json(createdTransactionWithOrder);
    if (!createdTransactionWithOrder) res.json({ msg: "Item not found" });
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

const patchTransaction = async (req, res) => {
  const id = Number(req.params.id);
  const updateInfo = req.body;
  try {
    const transactionExist = await transaction.findUnique({
      where: { id },
    });
    if (transactionExist) {
      const result = await transaction.update({
        where: {
          id,
        },
        data: { ...transactionExist, ...updateInfo },
      });

      if (result) res.json(result);
      if (!transactionExist || !result) res.json({ msg: "Item not found" });
    }
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

const deleteTrascaction = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await transaction.delete({
      where: { id },
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
  createTransaction,
  patchTransaction,
  deleteTrascaction,
};
