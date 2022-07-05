'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RekamMedis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pasien: {
        type: Sequelize.INTEGER
      },
      id_poli: {
        type: Sequelize.INTEGER
      },
      id_dokter: {
        type: Sequelize.INTEGER
      },
      id_rekam: {
        type: Sequelize.STRING
      },
      alergi: {
        type: Sequelize.STRING
      },
      gejala: {
        type: Sequelize.STRING
      },
      diagnosa: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RekamMedis');
  }
};