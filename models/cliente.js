/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('cliente', {
        idCliente: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'id_cliente'
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'Nombre'
    },
    apellido: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'Apellido'
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'Fecha_nacimiento'
    },
    direccion: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: 'Coban'
    }
  }, {
    sequelize,
    tableName: 'Cliente',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
};
