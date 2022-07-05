const { User, Pasien ,Role,Pendaftaran, sequelize,Poli } = require('../models/index')
const bcrypt = require('bcrypt')
var pdf = require("pdf-creator-node");
var fs = require("fs");
const path = require('path')

const updatePasien = async (req, res) => {
    const body = req.body;
    const {id} = req.params;
    

    Pasien.update(req.body, {
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            message: "Berhasil mengedit photo",
            data:data
        })
    }).catch(e => {
        res.status(503).json({
            status: 'Fail',
            message: 'Gagal mengedit'
        })
    })
};

const allPasien = async (req,res) => {
    Pasien.findAll().then(data => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    })
}

const getPasienById = async (req,res) => {
    const {id} = req.params;

    Pasien.findOne({
        where:{
            id: id
        }
    }).then(data => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: 'Pasien tidak ditemukan'
        })
    })
}

const getPendaftaranById = async (req,res) => {
    const {id} = req.params;
    console.log(id)
    Pendaftaran.findAll({
        where: {
            id_pasien: id
        },
        attributes: [
            'id',
            [sequelize.literal(`"FkPendaftaranPasien"."id"`), "idPasien"],
            [sequelize.literal(`"FkPendaftaranPasien"."nama"`), "namaPasien"],
            [sequelize.literal(`"FkPendaftaranPasien"."id_rekam"`), "id_rekamPasien"],
            [sequelize.literal(`"FkPendaftaranPoli"."id"`), "idPoli"],
            [sequelize.literal(`"FkPendaftaranPoli"."nama"`), "namaPoli"],
        ],
        subQuery: false,
        include:[{
            model: Pasien,
            as: 'FkPendaftaranPasien',
            attributes: []
        },{
            model: Poli,
            as: 'FkPendaftaranPoli',
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
            message: 'Gagal mengambil history'
        })
    })
}

const deletePasien = async (req, res) => {
    const {id} = req.params;
    // Cek di Database apakah user ada atau enggk => User telah terdaftar 
    // Password => Encrypt
    try {

        const result = await sequelize.transaction(async (t) => {
        
            const findPasien = await Pasien.findOne({
                where: {
                    id: id
                }
            }, { transaction: t })

            const findUser = await User.findOne({
                where: {
                    nama: findPasien.nama
                }
            }, { transaction: t })

            if(findPasien !== null){

                const role = await Role.destroy({
                    where: {
                      id_user: findUser.id
                    }
                  }, { transaction: t });

                const user = await User.destroy({
                    where: {
                      nama: findPasien.nama
                    }
                  }, { transaction: t });

                  const pasien = await Pasien.destroy({
                    where: {
                      id: id
                    }
                  }, { transaction: t });

                  res.status(200).json({
                    status: 'success',
                    message: 'Sukses menghapus user',
                    data: user
                })
            }else{
                res.status(400).json({
                    status: 'Gagal',
                    message: 'Gagal menambahkan User'
                })
            }
          console.log();
      
        });
      
      } catch (error) {
        console.log(error)
      }
};

const daftarRawatJalan = async (req,res) => {
    const {id_pasien,id_poli} = req.body;

    await Pendaftaran.create({
        id_pasien: id_pasien,
        id_poli: id_poli
    }).then(data => {
        res.status(200).json({
            status: 'success',
            message: 'Berhasil Mendaftar',
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: 'Gagal',
            message: 'Gagal Mendaftar'
        })
    })

                    
}

const generatePdfAntrian = async (req,res) => {
    const {id} = req.params;
    var html = fs.readFileSync(path.join(__dirname,'./templateAntrian.html'), "utf8");
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

    var users = await Pendaftaran.findOne({
        where: {
            id_pasien: id
        },
        raw: true,
        nest: true,
        attributes: [
            'id',
            [sequelize.literal(`"FkPendaftaranPasien"."id"`), "idPasien"],
            [sequelize.literal(`"FkPendaftaranPasien"."nama"`), "namaPasien"],
            [sequelize.literal(`"FkPendaftaranPasien"."id_rekam"`), "id_rekamPasien"],
            [sequelize.literal(`"FkPendaftaranPoli"."id"`), "idPoli"],
            [sequelize.literal(`"FkPendaftaranPoli"."nama"`), "namaPoli"],
        ],
        subQuery: false,
        include:[{
            model: Pasien,
            as: 'FkPendaftaranPasien',
            attributes: []
        },{
            model: Poli,
            as: 'FkPendaftaranPoli',
            attributes: []
        }]
    })

    var document = {
        html: html,
        data: {
            users: users,
        },
        path: "./docs/Antrian.pdf",
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
            status: 'success'
        })
}

const download = async (req,res) => {
    res.download(path.join(__dirname,'../docs/Antrian.pdf'))
}


module.exports = {
    updatePasien,
    allPasien,
    deletePasien,
    daftarRawatJalan,
    generatePdfAntrian,
    getPendaftaranById,
    download,
    getPasienById
}