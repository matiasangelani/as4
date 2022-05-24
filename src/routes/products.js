const router = require('express').Router();
const {
  postProduct,
  getProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
} = require('../controllers');
const { jwtValidator, adminValidator } = require('../middlewares');

//Solo podrá ser hecho por ADMINS y SUPER ADMINS
router.post('/', [jwtValidator, adminValidator], postProduct);
router.get('/:id', [jwtValidator, adminValidator], getProduct);
router.get('/', [jwtValidator, adminValidator], getAllProducts);
router.put('/:id', [jwtValidator, adminValidator], editProduct);
router.delete('/:id', [jwtValidator, adminValidator], deleteProduct);

module.exports = router;
