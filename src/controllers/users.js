const { User } = require('../db');

const postUser = async (req, res) => {
  const { name, lastname, email } = req.body;

  try {
    const user = await User.create({ name, lastname, email });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

// const editUser = async (req, res) => {
//   const { address, img } = req.body;
//   const uid = req.headers('uid');
//   //const user = req.vali
// };

module.exports = {
  postUser,
};
