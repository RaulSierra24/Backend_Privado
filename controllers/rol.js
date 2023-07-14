const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

const { Rol } = require('../models/init-models');


exports.getList = async (req = request, res = response) => {

    // const { busqueda = '', limite = 5, desde = 0, paginacion = '' } = req.query;
    const { limite = 5, desde = 0, paginacion = '' } = req.query;

    const [total, lista] = await Promise.all([
        5,
        Rol.findAll({
            offset: paginacion === '' ? (desde * limite) : undefined, limit: paginacion === '' ? parseInt(limite) : undefined,
        })
    ]);

    res.json({
        total,
        lista
    });
};

exports.getItem = async (req = request, res = response) => {

    const { idCategoriaMantenimiento } = req.query;

    const [item] = await Promise.all([
        Rol.findByPk(idCategoriaMantenimiento)
    ]);

    res.json({
        item
    });
};

exports.saveItem = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Rol({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
};

exports.editItem = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Rol.findByIdAndUpdate(id, resto);

    res.json(usuario);
};

exports.deleteItem = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Rol.findByIdAndUpdate(id, { estado: false });


    res.json(usuario);
};
