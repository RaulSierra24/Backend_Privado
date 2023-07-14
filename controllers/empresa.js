const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

const { Empresa } = require('../models/init-models');



exports.getList = async (req = request, res = response) => {

    // const { busqueda = '', limite = 5, desde = 0, paginacion = '' } = req.query;
    const { limite = 5, desde = 0, paginacion = '',busqueda = '' } = req.query;

    const [total, lista] = await Promise.all([
        Empresa.count({ where: {
            nombre: {[Op.substring]: busqueda},
        },}),
        Empresa.findAll({
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

    const { idEmpresa } = req.query;

    const [item] = await Promise.all([
        Empresa.findByPk(idEmpresa)
    ]);

    res.json({
        item
    });
};

exports.saveItem = async (req, res = response) => {

    const { nombre, telefono, logo, estado, idUsuario } = req.body;

    const newItem = await Empresa.create({ nombre, telefono, logo, estado, idUsuario });

    res.json({
        newItem
    });
};

exports.editItem = async (req, res = response) => {

    const { idEmpresa, nombre, telefono, logo, estado, idUsuario   } = req.body;

    await Empresa.update({ nombre, telefono, logo, estado, idUsuario  }, {
        where: {
            idEmpresa: idEmpresa
        }
    });

    res.json({});
};

exports.deleteItem = async (req, res = response) => {

    const { idEmpresa } = req.body;

    await Empresa.destroy({
        where: {
            idEmpresa: idEmpresa
        }
    });

    res.json({});
};
