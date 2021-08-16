const { special_request } = require("../../utils/database");

const getAll = async (req, res) => {
  try {
    const allSpecialRequests = await special_request.findMany();
    res.json(allSpecialRequests);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { getAll };