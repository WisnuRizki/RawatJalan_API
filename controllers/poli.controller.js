const { User, Pasien ,Poli,Dokter, sequelize } = require('../models/index')
const bcrypt = require('bcrypt')

const createPoli = async (req, res) => {
    const body = req.body;
    const nama = body.nama;
    const id_dokter = body.id_dokter;
    // Cek di Database apakah user ada atau enggk => User telah terdaftar 
    // Password => Encrypt
    

    try {

        const result = await sequelize.transaction(async (t) => {
        
            const findUser = await Poli.findOne({
                where: {
                    nama: nama
                }
            }, { transaction: t })
            console.log(findUser)
            if(findUser === null){
                const user = await Poli.create({
                    nama: nama,
                    id_dokter: id_dokter
                  }, { transaction: t });

                  res.status(200).json({
                    status: 'success',
                    message: 'Sukses menambahkan user',
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
        console.log("error")
      }
};

const allPoli = async (req,res) => {
    Poli.findAll({
        include:{
            model: Dokter,
            as: 'FkPoliDokter',
        }
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
    
};

const updatePoli = async (req,res) => {
    const {id} = req.params; 
    Poli.update(req.body, {
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            message: "Berhasil mengedit Poli",
            data: data
        })
    }).catch(e => {
        res.status(503).json({
            status: 'Fail',
            message: 'Gagal mengedit'
        })
    })
};

const deletePoli = async (req,res) => {
    const {id} = req.params;
    // Delete everyone named "Jane"
    await Poli.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            message: "Berhasil Hapus Dokter",
        })
    });
};

const getPoliById = async (req,res) => {
    const {id} = req.params;

    Poli.findOne({
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: 'error'
        })
    })
}



module.exports = {
    createPoli,
    allPoli,
    updatePoli,
    deletePoli,
    getPoliById
}