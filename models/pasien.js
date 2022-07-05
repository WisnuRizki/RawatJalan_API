'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pasien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: 'id',
        as: 'FkPasienUser'
      });

      this.hasMany(models.Pendaftaran, {
        foreignKey: "id",
        as: "FkPasienPendaftaran"
      });

      this.hasMany(models.RekamMedis, {
        foreignKey: "id",
        as: "FkPasienRekamMedis"
      });
    }
  }
  Pasien.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    jenisKelamin: DataTypes.STRING,
    id_rekam: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pasien',
  });
  return Pasien;
};