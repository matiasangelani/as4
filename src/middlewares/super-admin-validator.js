const { User } = require('../db');

const superAdminValidator = async (req, res, next) => {
  const uid = req.uid;

  try {
    const superAdmin = await User.findByPk(uid);

    if (
      !superAdmin ||
      superAdmin.role === 'ADMIN' ||
      superAdmin.role === 'USER'
    ) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    next();
  } catch (error) {
    res.json({ msg: 'Error' });
  }
};

module.exports = {
  superAdminValidator,
};
