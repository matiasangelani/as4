const bcryptjs = require('bcryptjs');
const { User } = require('../db');
const { jwtGenerator } = require('../helpers');

const postUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  let salt = '',
    encryptPassword = '',
    emailLowerCase = email.toLowerCase();

  try {
    const existUser = await User.findOne({
      where: {
        email: emailLowerCase,
      },
    });

    if (existUser) return res.json({ msg: `Email '${email}' already in use` });

    salt = bcryptjs.genSaltSync();
    encryptPassword = bcryptjs.hashSync(password, salt);

    const user = await User.create({
      name,
      lastname,
      email: emailLowerCase,
      password: encryptPassword,
    });

    res.json({ msg: 'User has been created successfully' });
  } catch (error) {
    res.json(error);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) return res.json({ msg: 'User not found' });

    res.json(user);
  } catch (error) {
    res.json({ msg: 'Get user error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users.length) return res.json({ msg: 'Users empty' });

    res.json(users);
  } catch (error) {
    res.json({ msg: 'Get users error' });
  }
};

const editUser = async (req, res) => {
  const { address, img, id } = req.body;
  const uid = req.uid;

  if (id !== uid) return res.status(401).json({ msg: 'Unauthorized' });

  try {
    const user = await User.findByPk(uid);

    //img debe pasar antes por un middleware de cloudinary

    user.update({ img, address });

    res.json({ msg: 'User has been updated successfully' });
  } catch (error) {
    res.status(404).json({ msg: 'Edit error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let validPassword = '',
    token = '';

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) return res.json({ msg: 'Incorrect email/password' });

    validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) return res.json({ msg: 'Incorrect email/password' });

    token = await jwtGenerator(user.id);

    res.json({ token });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  postUser,
  editUser,
  loginUser,
  getUser,
  getAllUsers,
};
