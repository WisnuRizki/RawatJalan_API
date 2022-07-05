const { User, Pasien ,Poli,Dokter,RekamMedis, sequelize } = require('../models/index')
const bcrypt = require('bcrypt')
var pdf = require("pdf-creator-node");
var fs = require("fs");
const path = require('path')


const allRekamMedis = async (req,res) => {
    RekamMedis.findAll({
        attributes: [
            'id',
            'id_poli',
            'id_dokter',
            'id_rekam',
            'alergi',
            'gejala',
            'diagnosa',
            [sequelize.literal(`"FkRekamMedisPasien"."nama"`), "namaPasien"],
            [sequelize.literal(`"FkRekamMedisDokter"."nama"`), "namaDokter"],
        ],
        subQuery: false,
        include:[{
            model: Pasien,
            as: 'FkRekamMedisPasien',
            attributes: []
        },{
            model: Dokter,
            as: 'FkRekamMedisDokter',
            attributes: []
        }]
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: 'Gagal',
            message: 'Gagal mengambil history',
            error: e
        })
    })
    
};

const getRekamMedisByIdDokter = async (req,res) => {
    const {id} = req.params;

    RekamMedis.findAll({
        where:{
            alergi: null,
            gejala: null,
            diagnosa: null,
            id_dokter: id
        },
        attributes: [
            'id',
            'id_poli',
            'id_dokter',
            'id_rekam',
            'alergi',
            'gejala',
            'diagnosa',
            [sequelize.literal(`"FkRekamMedisPasien"."nama"`), "namaPasien"],
            [sequelize.literal(`"FkRekamMedisDokter"."nama"`), "namaDokter"],
        ],
        subQuery: false,
        include:[{
            model: Pasien,
            as: 'FkRekamMedisPasien',
            attributes: []
        },{
            model: Dokter,
            as: 'FkRekamMedisDokter',
            attributes: []
        }]
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: 'Gagal',
            message: 'Gagal mengambil history',
            error: e
        })
    })
}

const getRekamMedisByNama = async (req,res) => {
    const {id_pasien} = req.body;

    RekamMedis.findAll({
        where:{
            id_pasien: id_pasien
        },
        attributes: [
            'id',
            'id_rekam',
            'alergi',
            'gejala',
            'diagnosa',
            [sequelize.literal(`"FkRekamMedisPasien"."nama"`), "namaPasien"],
            [sequelize.literal(`"FkRekamMedisPoli"."nama"`), "namaPoli"],
            [sequelize.literal(`"FkRekamMedisDokter"."nama"`), "namaDokter"],
        ],
        subQuery: false,
        include:[{
            model: Pasien,
            as: 'FkRekamMedisPasien',
            attributes: []
        },{
            model: Dokter,
            as: 'FkRekamMedisDokter',
            attributes: []
        },{
            model: Poli,
            as: 'FkRekamMedisPoli',
            attributes: []
        }]
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: 'Gagal',
            message: 'Gagal mengambil history',
            error: e
        })
    })
}

const generatePdfRawatJalan = async (req,res) => {
    const {id_pasien} = req.body;
    var html = fs.readFileSync(path.join(__dirname,'./templateRawatJalan.html'), "utf8");
    var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

      var users = await RekamMedis.findAll({
        raw: true,
        nest: true,
        attributes: [
            'id',
            'id_rekam',
            'alergi',
            'gejala',
            'diagnosa',
            'createdAt',
            [sequelize.literal(`"FkRekamMedisPasien"."nama"`), "namaPasien"],
            [sequelize.literal(`"FkRekamMedisPoli"."nama"`), "namaPoli"],
            [sequelize.literal(`"FkRekamMedisDokter"."nama"`), "namaDokter"],
        ],
        subQuery: false,
        include:[{
            model: Pasien,
            as: 'FkRekamMedisPasien',
            attributes: []
        },{
            model: Dokter,
            as: 'FkRekamMedisDokter',
            attributes: []
        },{
            model: Poli,
            as: 'FkRekamMedisPoli',
            attributes: []
        }]
    });
    
    var document = {
        html: html,
        data: {
            users: users,
        },
        path: "./docs/rawatJalan.pdf",
        type: "",
    };

      pdf
        .create(document, options)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });

        res.json({
            status:users
        })
//   //res.contentType("application/pdf");
//   res.download(path.join(__dirname,'../docs/output.pdf'))
}

const generatePdfRekamMedisPasien = async (req,res) => {
    const {nama} = req.body;
    var html = fs.readFileSync(path.join(__dirname,'./templateRekamMedisPasien.html'), "utf8");
    var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

    // var users = [
    //     {
    //       name: "Shyamasdasdasd",
    //       age: "26",
    //     },
    //     {
    //       name: "Navjotasdasdasd",
    //       age: "26",
    //     },
    //     {
    //       name: "Vitthalasdasd",
    //       age: "26",
    //     },
    //   ];

      let pasien = await Pasien.findOne({
          where:{
              nama: nama
          },
          raw: true,
          nest: true
      })
      
      var users = await RekamMedis.findAll({
        where:{
            id_pasien: pasien.id
        },
        raw: true,
        nest: true,
        attributes: [
            'id',
            'id_rekam',
            'alergi',
            'gejala',
            'diagnosa',
            [sequelize.literal(`"FkRekamMedisPasien"."nama"`), "namaPasien"],
            [sequelize.literal(`"FkRekamMedisPoli"."nama"`), "namaPoli"],
            [sequelize.literal(`"FkRekamMedisDokter"."nama"`), "namaDokter"],
        ],
        subQuery: false,
        include:[{
            model: Pasien,
            as: 'FkRekamMedisPasien',
            attributes: []
        },{
            model: Dokter,
            as: 'FkRekamMedisDokter',
            attributes: []
        },{
            model: Poli,
            as: 'FkRekamMedisPoli',
            attributes: []
        }]
    });
    
    var document = {
        html: html,
        data: {
            users: users,
        },
        path: "./docs/rekamMedisPasien.pdf",
        type: "",
    };

      pdf
        .create(document, options)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });


        res.json({
            status:users
        })
//   //res.contentType("application/pdf");
//   res.download(path.join(__dirname,'../docs/output.pdf'))
}

const downloadRekamMedisPasien = async (req,res) => {
    res.download(path.join(__dirname,'../docs/rekamMedisPasien.pdf'))
}




module.exports = {
    allRekamMedis,
    getRekamMedisByNama,
    generatePdfRawatJalan,
    generatePdfRekamMedisPasien,
    downloadRekamMedisPasien,
    getRekamMedisByIdDokter
  
}