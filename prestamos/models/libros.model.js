const {Model, DataTypes} = require("sequelize")
const sqz = require('../db');



class Libro extends Model {
}

Libro.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  prestado: {
    type: DataTypes.BOOLEAN,
    // allowNull: false,
    defaultValue: false
  }



}, {

  sequelize: sqz,
  modelName: 'Libro',
  tableName: 'libro',
  timestamps: true,
  // paranoid: true,

});



module.exports = Libro
