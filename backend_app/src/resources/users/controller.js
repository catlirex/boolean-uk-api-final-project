const { user } = require("../../utils/database");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await user.findMany();

    res.json(allUsers);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getUserByPhone = async (req, res) => {
  const phone = parseInt(req.params.phone);

  try {
    const aUser = await user.findUnique({
      where: {
        phone_number: phone,
      },
    });

    res.json(aUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, phone_number } = req.body;

  try {
    if (name && typeof phone_number === "number") {
      const createdUser = await user.create({
        data: { name, phone_number },
      });

      res.json(createdUser);
    } else {
      res.json({ Error: "Info. not correct" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { getAllUsers, getUserByPhone, createUser };
