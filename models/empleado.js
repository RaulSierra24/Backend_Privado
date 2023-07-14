/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empleado', {
    idEmpleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_empleado'
    },
    fechaContratacion: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'fecha_contratacion'
    },
    sueldoAPagar: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'sueldo_a_pagar'
    },
    estado: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      },
      unique: "fk_empleado_usuario1",
      field: 'id_usuario'
    },
    idPuesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'puesto',
        key: 'id_puesto'
      },
      unique: "fk_empleado_puesto1",
      field: 'id_puesto'
    }
  }, {
    sequelize,
    tableName: 'empleado',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_empleado" },
        ]
      },
      {
        name: "fk_empleado_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "fk_empleado_puesto1_idx",
        using: "BTREE",
        fields: [
          { name: "id_puesto" },
        ]
      },
    ]
  });
};
