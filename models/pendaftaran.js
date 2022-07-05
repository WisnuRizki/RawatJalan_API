'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pendaftaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Pasien,{
        foreignKey: 'id_pasien',
        as: 'FkPendaftaranPasien'
      });

      this.belongsTo(models.Poli,{
        foreignKey: 'id_poli',
        as: 'FkPendaftaranPoli'
      });
    }
  }
  Pendaftaran.init({
    id_pasien: DataTypes.INTEGER,
    id_poli: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pendaftaran',
  });
  return Pendaftaran;
};