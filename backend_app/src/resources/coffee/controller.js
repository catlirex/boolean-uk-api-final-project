const { coffee } = require("../../utils/database");

const getAll = async (req, res) => {
  try {
    const allCoffee = await coffee.findMany();
    res.json(allCoffee);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { getAll };
