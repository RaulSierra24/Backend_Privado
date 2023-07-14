/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable quotes */

var DataTypes = require("sequelize").DataTypes;
var _departamento = require("./departamento");
var _empleado = require("./empleado");
var _empresa = require("./empresa");
var _puesto = require("./puesto");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var departamento = _departamento(sequelize, DataTypes);
  var empleado = _empleado(sequelize, DataTypes);
  var empresa = _empresa(sequelize, DataTypes);
  var puesto = _puesto(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  return {
    departamento,
    empleado,
    empresa,
    puesto,
    usuario,
  };
}
module.exports = { initModels };
