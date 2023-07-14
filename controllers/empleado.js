const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

const { Empleado } = require('../models/init-models');



exports.getList = async (req = request, res = response) => {

    // const { busqueda = '', limite = 5, desde = 0, paginacion = '' } = req.query;
    const { limite = 5, desde = 0, paginacion = '',busqueda = '' } = req.query;

    const [total, lista] = await Promise.all([
        Empleado.count({ where: {
            nombre: {[Op.substring]: busqueda},
        },}),
        Empleado.findAll({
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

    const { idEmpleado } = req.query;

    const [item] = await Promise.all([
        Empleado.findByPk(idEmpleado)
    ]);

    res.json({
        item
    });
};

exports.saveItem = async (req, res = response) => {

    const { fechaContratacion, sueldoAPagar, estado } = req.body;

    const newItem = await Empleado.create({ fechaContratacion, sueldoAPagar , estado  });

    res.json({
        newItem
    });
};

exports.editItem = async (req, res = response) => {

    const { idEmpleado, fechaContratacion, sueldoAPagar, estado  } = req.body;

    await Empleado.update({ fechaContratacion, sueldoAPagar, estado  }, {
        where: {
            idEmpleado: idEmpleado
        }
    });

    res.json({});
};

exports.deleteItem = async (req, res = response) => {

    const { idEmpleado } = req.body;

    await Empleado.destroy({
        where: {
            idEmpleado: idEmpleado
        }
    });

    res.json({});
};
