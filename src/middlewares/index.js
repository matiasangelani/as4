const { jwtValidator } = require('./jwt-validator');
const { adminValidator } = require('./admin-validator');
const { superAdminValidator } = require('./super-admin-validator');

module.exports = {
  jwtValidator,
  adminValidator,
  superAdminValidator,
};
