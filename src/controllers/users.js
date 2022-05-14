const bcryptjs = require('bcryptjs');
const { User } = require('../db');

const postUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  let salt = '',
    encrypPassword = '';

  try {
    const existUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existUser) {
      return res.json({ msg: `Existent email ${email}` });
    }

    salt = bcryptjs.genSaltSync();
    encrypPassword = bcryptjs.hashSync(password, salt);

    const user = await User.create({
      name,
      lastname,
      email,
      password: encrypPassword,
    });

    res.json({ msg: 'User has been created successfully' });
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
