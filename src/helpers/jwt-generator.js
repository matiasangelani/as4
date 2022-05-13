const jwt = require('jsonwebtoken');

const jwtGenerator = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '24h',
      },
      (error, token) => {
        error
          ? reject('It has been impossible to generate JWT')
          : resolve(token);
      }
    );
  });
};

module.exports = {
  jwtGenerator,
};
