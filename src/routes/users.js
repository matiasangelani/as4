const router = require('express').Router();
const { check, body } = require('express-validator');
const {
  postUser,
  editUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  postSuperAdmin,
  editUserRole,
} = require('../controllers');
const { jwtGenerator } = require('../helpers');
const {
  jwtValidator,
  adminValidator,
  superAdminValidator,
} = require('../middlewares');

router.post('/', postUser);
router.post('/auth', loginUser);
router.post('/superadmin', postSuperAdmin);
router.get(
  '/:id',
  [
    jwtValidator,
    //adminValidator
  ],
  getUser
);
router.get('/', [jwtValidator, adminValidator], getAllUsers);
router.put('/', [jwtValidator], editUser);
router.put('/edit', [jwtValidator, superAdminValidator], editUserRole);
router.delete('/:id', deleteUser);

module.exports = router;

//postUsers middlewares
// [
//     check('name', 'Debe tener un nombre').not().isEmpty(),
//     check('lastname', 'Debe tener un apellido').not().isEmpty(),
//     check('email', 'El email es obligatorio').not().isEmpty(),
//     check('email', 'El email no es valido').isEmail(),
//     check('password', 'La constraseña es obligatoria').not().isEmpty(),
//     check(
//       'password',
//       'El password debe tener 8 caracteres como mínimo'
//     ).isLength({ min: 8 }),
//   ],
