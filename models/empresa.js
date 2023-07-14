/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detalle_ventas', {
    idDetalle: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_detalle'
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Cantidad'
    },
    descuento: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'Descuento'
    },
    idVentas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ventas',
        key: 'id_ventas'
      },
      unique: "fk_DetalleVentas_Ventas1",
      field: 'id_ventas'
    },
    idProductos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Productos',
        key: 'id_productos'
      },
      unique: "fk_DetalleVentas_Productos1",
      field: 'id_productos'
    }
  }, {
    sequelize,
    tableName: 'DetalleVentas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_detalle" },
        ]
      },
      {
        name: "fk_DetalleVentas_Ventas1_idx",
        using: "BTREE",
        fields: [
          { name: "id_ventas" },
        ]
      },
      {
        name: "fk_DetalleVentas_Productos1_idx",
        using: "BTREE",
        fields: [
          { name: "id_productos" },
        ]
      },
    ]
  });
};
