'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RekamMedis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Pasien,{
        foreignKey: 'id_pasien',
        as: 'FkRekamMedisPasien'
      });

      this.belongsTo(models.Dokter,{
        foreignKey: 'id_dokter',
        as: 'FkRekamMedisDokter'
      });

      this.belongsTo(models.Poli,{
        foreignKey: 'id_poli',
        as: 'FkRekamMedisPoli'
      });

      this.belongsTo(models.RekamMedis,{
        foreignKey: 'id',
        as: 'rekammedis'
      });
    }
  }
  RekamMedis.init({
    id_pasien: DataTypes.INTEGER,
    id_poli: DataTypes.INTEGER,
    id_dokter: DataTypes.INTEGER,
    id_rekam: DataTypes.STRING,
    alergi: DataTypes.STRING,
    gejala: DataTypes.STRING,
    diagnosa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RekamMedis',
  });
  return RekamMedis;
};