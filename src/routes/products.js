const router = require('express').Router();
const {
  postProduct,
  getProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
} = require('../controllers');

//Solo podrá ser hecho por ADMINS y SUPER ADMINS
router.post('/', postProduct);
router.get('/:id', getProduct);
router.get('/', getAllProducts);
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
