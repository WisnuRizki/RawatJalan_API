'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Poli extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Dokter,{
        foreignKey: 'id_dokter',
        as: 'FkPoliDokter'
      });

      this.hasMany(models.Pendaftaran,{
        foreignKey: 'id',
        as: 'FkPoliPendaftaran'
      });

      this.hasMany(models.RekamMedis,{
        foreignKey: 'id',
        as: 'FkPoliRekamMedis'
      });
    }
  }
  Poli.init({
    nama: DataTypes.STRING,
    id_dokter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Poli',
  });
  return Poli;
};