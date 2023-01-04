const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJWT } = require('../middlewares/validate-jwt.middleware');
const { generarJWT } = require('../Utils/jwt.util');


const router = Router();

// Crear nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe contener mínimo 6 caracteres').isLength(6),
    validarCampos
], crearUsuario)

// Login usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe contener mínimo 6 caracteres').isLength(6),
    validarCampos
], loginUsuario)

// validar y revalidar Token
router.get('/renew', validarJWT, revalidarToken, generarJWT)

module.exports = router;