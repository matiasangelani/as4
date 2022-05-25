const { User } = require('../db');

const adminValidator = async (req, res, next) => {
  const uid = req.uid;

  try {
    const admin = await User.findByPk(uid);

    if (!admin || admin.role === 'USER') {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    next();
  } catch (error) {
    res.json({ msg: 'Error' });
  }
};

module.exports = {
  adminValidator,
};
