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
  const newUser = req.body;

  try {
    const createdUser = await user.create({
      data: newUser,
    });

    res.json(createdUser);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { getAllUsers, getUserById, createUser };
