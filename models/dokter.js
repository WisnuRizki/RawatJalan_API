'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dokter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Poli, {
        foreignKey: "id",
        as: "FkDokterPoli"
      });

      this.hasMany(models.RekamMedis, {
        foreignKey: "id",
        as: "FkDokterRekamMedis"
      });
    }
  }
  Dokter.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dokter',
  });
  return Dokter;
};