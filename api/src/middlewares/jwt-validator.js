const jwt = require('jsonwebtoken');

const jwtValidator = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.uid = uid;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized' });
  }
};

module.exports = {
  jwtValidator,
};
