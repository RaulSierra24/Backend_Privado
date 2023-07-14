const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

const { Puesto } = require('../models/init-models');


exports.getList = async (req = request, res = response) => {

    // const { busqueda = '', limite = 5, desde = 0, paginacion = '' } = req.query;
    const { limite = 5, desde = 0, paginacion = '',busqueda = '' } = req.query;

    const [total, lista] = await Promise.all([
        Puesto.count({ where: {
            nombre: {[Op.substring]: busqueda},
        },}),
        Puesto.findAll({
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

    const { idPuesto } = req.query;

    const [item] = await Promise.all([
        Puesto.findByPk(idPuesto)
    ]);

    res.json({
        item
    });
};

exports.saveItem = async (req, res = response) => {

    const { descripcion, sueldoBase , estado} = req.body;

    const newItem = await Puesto.create({ descripcion, sueldoBase , estado  });

    res.json({
        newItem
    });
};

exports.editItem = async (req, res = response) => {

    const { idPuesto, descripcion, sueldoBase , estado  } = req.body;

    await Puesto.update({ descripcion, sueldoBase , estado  }, {
        where: {
            idPuesto: idPuesto
        }
    });

    res.json({});
};

exports.deleteItem = async (req, res = response) => {

    const { idPuesto } = req.body;

    await Puesto.destroy({
        where: {
            idPuesto: idPuesto
        }
    });

    res.json({});
};
