const router = require('express').Router();
const { check, body } = require('express-validator');
const { postUser } = require('../controllers');

router.post('/', postUser);

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
