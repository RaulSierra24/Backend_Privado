const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');


const { login, signUp } = require('../controllers/auth');


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/signUp',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('dpi', 'El DPI es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty().isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],signUp);

module.exports = router;