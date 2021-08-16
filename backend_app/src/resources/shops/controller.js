const { shop } = require("../../utils/database");

const getAll = async (req, res) => {
  try {
    const allshops = await shop.findMany();
    res.json(allshops);
  } catch (error) {
    res.json({ error: error.message });
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

module.exports = { getAll, getUniqueShop };
