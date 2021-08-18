const { coffee } = require("../../utils/database");

const getAll = async (req, res) => {
  try {
    const allCoffee = await coffee.findMany();
    res.json(allCoffee);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getCoffeeByName = async (req, res) => {
  const name = req.params.name;
  try {
    const result = await coffee.findMany({
      where: { name },
    });
    if (result) res.json(result);
    if (!result) res.json({ msg: "Item not found" });
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

module.exports = { getAll, getCoffeeByName };
