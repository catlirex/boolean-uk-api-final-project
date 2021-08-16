const { user } = require("../../utils/database");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await user.findMany();

    res.json(allUsers);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const aUser = await user.findUnique({
      where: {
        id,
      },
    });

    res.json(aUser);
  } catch (error) {
    res.json({ error: error.message });
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

module.exports = { getAllUsers, getUserById, createUser };
