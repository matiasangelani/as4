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

const editUser = async (req, res) => {
  const { address, img, id } = req.body;
  const { uid } = req.uid;
  //const uid = req.header('uid');

  if (id !== uid) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const user = await User.findByPk(uid);

    //img debe pasar antes por un middleware de cloudinary

    user.update({ img, address });

    res.json({ msg: 'User has been updated successfully' });
  } catch (error) {
    res.status(404).json({ msg: 'Edit error' });
  }
};

//const loginUser = () => {};

module.exports = {
  postUser,
  editUser,
  //loginUser,
};
