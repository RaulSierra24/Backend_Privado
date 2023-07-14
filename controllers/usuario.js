const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

const { Usuario } = require('../models/init-models');


exports.getList = async (req = request, res = response) => {

    // const { busqueda = '', limite = 5, desde = 0, paginacion = '' } = req.query;
    const { limite = 5, desde = 0, paginacion = '',busqueda = '' } = req.query;

    const [total, lista] = await Promise.all([
        Usuario.count({ where: {
            nombre: {[Op.substring]: busqueda},
        },}),
        Usuario.findAll({
            where: {
                nombre: {[Op.substring]: busqueda},
            },
            offset: paginacion === '' ? (desde * limite) : undefined, limit: paginacion === '' ? parseInt(limite) : undefined,
        })
    ]);

    res.json({
        total,
        lista
    });
};

exports.getItem = async (req = request, res = response) => {

    const { idUsuario } = req.query;

    const [item] = await Promise.all([
        Usuario.findByPk(idUsuario)
    ]);

    res.json({
        item
    });
};

exports.saveItem = async (req, res = response) => {

    const { nombre, apellido, areas, password , estado } = req.body;

    const newItem = await Usuario.create({ nombre, apellido, areas, password , estado  });

    res.json({
        newItem
    });
};

exports.editItem = async (req, res = response) => {

    const { idUsuario, nombre, apellido, areas, password , estado  } = req.body;

    await Usuario.update({ nombre, apellido, areas, password , estado  }, {
        where: {
            idUsuario: idUsuario
        }
    });

    res.json({});
};

exports.deleteItem = async (req, res = response) => {

    const { idUsuario } = req.body;

    await Usuario.destroy({
        where: {
            idUsuario: idUsuario
        }
    });

    res.json({});
};
