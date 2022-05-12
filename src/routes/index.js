const router = require('express').Router();
const usersRouter = require('./users');

router.use('/users', usersRouter);
//router.use('/products', productsRouter);

module.exports = router;
