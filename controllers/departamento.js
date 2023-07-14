const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

const { Departamento } = require('../models/init-models');



exports.getList = async (req = request, res = response) => {

    // const { busqueda = '', limite = 5, desde = 0, paginacion = '' } = req.query;
    const { limite = 5, desde = 0, paginacion = '',busqueda = '' } = req.query;

    const [total, lista] = await Promise.all([
        Departamento.count({ where: {
            nombre: {[Op.substring]: busqueda},
        },}),
        Departamento.findAll({
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

    const { idDepartamento } = req.query;

    const [item] = await Promise.all([
        Departamento.findByPk(idDepartamento)
    ]);

    res.json({
        item
    });
};

exports.saveItem = async (req, res = response) => {

    const { descripcion, estado, idEmpresa } = req.body;

    const newItem = await Departamento.create({ descripcion, estado, idEmpresa  });

    res.json({
        newItem
    });
};

exports.editItem = async (req, res = response) => {

    const { idDepartamento, descripcion, estado, idEmpresa  } = req.body;

    await Departamento.update({ descripcion, estado, idEmpresa  }, {
        where: {
            idDepartamento: idDepartamento
        }
    });

    res.json({});
};

exports.deleteItem = async (req, res = response) => {

    const { idDepartamento } = req.body;

    await Departamento.destroy({
        where: {
            idDepartamento: idDepartamento
        }
    });

    res.json({});
};
