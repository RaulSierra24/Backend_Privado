/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departamento', {
    idDepartamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_departamento'
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    idEmpresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresa',
        key: 'id_empresa'
      },
      unique: "fk_departamento_empresa1",
      field: 'id_empresa'
    }
  }, {
    sequelize,
    tableName: 'departamento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_departamento" },
        ]
      },
      {
        name: "fk_departamento_empresa1_idx",
        using: "BTREE",
        fields: [
          { name: "id_empresa" },
        ]
      },
    ]
  });
};
