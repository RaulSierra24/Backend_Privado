const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { Usuario } = require('../models/init-models');

const { generarJWT } = require('../helpers/generar-jwt');
const { errorMessages, successMessages } = require('../helpers/mensages');
const { error, success } = require('../helpers/respuestas');


const login = async (req, res = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({
            where: {
                correo
            }
        });
        if (usuario.length===0) {
            return res.status(400).json(error(errorMessages.ERROR_LOGIN, ''));
        }
        // SI el usuario está activo
        if (usuario.estado !== 1) {
            return res.status(400).json(error(errorMessages.ERROR_USUARO_BLOQUEADO, 'Comuniquese con el administrador'));
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json(error(errorMessages.ERROR_LOGIN, ''));
        }
        usuario.password = undefined;
        usuario.estado = undefined;

        // Generar el JWT
        const token = await generarJWT(usuario);

        res.status(200).json(success(successMessages.SUCCESS_ADD, {token}));

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

const signUp = async (req, res = response) => {
    const { nombre, apellido, dpi, idRol, correo, password } = req.body;
    try {
        const usuario = await Usuario.count({
            where: {
                correo
            }
        });
        console.log('pase',usuario);
        if (usuario > 0) {
            return res.status(400).json(error(errorMessages.ERROR_CORREO, ''));
        }

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        const passwordEncruptada = bcryptjs.hashSync(password, salt);
        const id = await Usuario.create({
            nombre,
            apellido,
            dpi,
            idRol,
            password: passwordEncruptada,
            correo,
            estado: 1
        });
        id.password = undefined;
        id.estado = undefined;

        // Generar el JWT
        const token = await generarJWT(id);

        res.status(200).json(success(successMessages.SUCCESS_ADD, {token}));

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    login,
    signUp
};
