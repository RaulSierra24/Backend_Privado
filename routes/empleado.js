
const { Router } = require('express');
// const { check } = require('express-validator');


// const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');
// const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const { getList, getItem, saveItem, editItem, deleteItem } = require('../controllers/empleado');

const router = Router();

router.get('/', getList);

router.get('/one/', getItem);

router.put('/', [
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    // validarCampos
], editItem);

router.post('/', [
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    // check('correo', 'El correo no es válido').isEmail(),
    // check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom(esRoleValido),
    // validarCampos
], saveItem);

router.delete('/', [
    // validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    // validarCampos
], deleteItem);


module.exports = router;