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
    res.status(404).json({ msg: 'Post user error' });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const uid = req.uid;

  if (role === 'USER' && id !== uid)
    return res.status(401).json({ msg: 'Unauthorized' });

  try {
    const user = await User.findByPk(id);

    if (!user) return res.json({ msg: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(404).json({ msg: 'Get user error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users.length) return res.json({ msg: 'Users empty' });

    res.json(users);
  } catch (error) {
    res.status(404).json({ msg: 'Get users error' });
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
    res.status(404).json({ msg: 'Error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) return res.json({ msg: 'User not found' });

    await user.update({ active: false });

    res.json({
      msg: `User '${user.name}' deleted successfully`,
    });
  } catch (error) {
    res.status(404).json({ msg: 'Delete user error' });
  }
};

const postSuperAdmin = async (req, res) => {
  const { name, lastname, email, password, superpass } = req.body;
  let salt = '',
    encryptPassword = '',
    emailLowerCase = email.toLowerCase();

  try {
    if (superpass !== process.env.SUPERPASS || !superpass)
      return res.status(401).json({ msg: 'Unauthorized' });

    const existUser = await User.findOne({
      where: {
        email: emailLowerCase,
      },
    });

    if (existUser) return res.json({ msg: `Email '${email}' already in use` });

    salt = bcryptjs.genSaltSync();
    encryptPassword = bcryptjs.hashSync(password, salt);

    await User.create({
      name,
      lastname,
      email: emailLowerCase,
      password: encryptPassword,
      role: 'SUPER_ADMIN',
    });

    res.json({ msg: 'Super Admin has been created successfully' });
  } catch (error) {
    res.status(404).json({ msg: 'Error' });
  }
};

const editUserRole = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) return res.json({ msg: 'User not found' });

    await user.update({ role: 'ADMIN' });

    res.json({ msg: `User '${user.name}' has been made Admin` });
  } catch (error) {
    res.status(404).json({ msg: 'Error' });
  }
};

module.exports = {
  postUser,
  editUser,
  loginUser,
  getUser,
  getAllUsers,
  deleteUser,
  postSuperAdmin,
  editUserRole,
};
