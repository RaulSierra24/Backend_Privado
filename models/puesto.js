/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('puesto', {
    idPuesto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_puesto'
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    sueldoBase: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'sueldo_base'
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idDepartamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departamento',
        key: 'id_departamento'
      },
      unique: "fk_puesto_departamento1",
      field: 'id_departamento'
    }
  }, {
    sequelize,
    tableName: 'puesto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_puesto" },
        ]
      },
      {
        name: "fk_puesto_departamento1_idx",
        using: "BTREE",
        fields: [
          { name: "id_departamento" },
        ]
      },
    ]
  });
};
