const { User, Pasien ,Role, Dokter,RekamMedis,sequelize } = require('../models/index')
const bcrypt = require('bcrypt')

const createDokter = async (req, res) => {
    const body = req.body;
    const username = body.username;
    const alamat = body.alamat;
    const nama = body.nama;
    const password = bcrypt.hashSync(body.password, 10);
    // Cek di Database apakah user ada atau enggk => User telah terdaftar 
    // Password => Encrypt
    

    try {

        const result = await sequelize.transaction(async (t) => {
        
            const findUser = await Dokter.findOne({
                where: {
                    nama: nama
                }
            }, { transaction: t })

            if(findUser === null){
                const user = await User.create({
                    username: username,
                    nama: nama,
                    password: password
                  }, { transaction: t });


                  const dokter = await Dokter.create({
                    nama: nama,
                    alamat: alamat
                  }, { transaction: t });
        
                  const role = await Role.create({
                    id_user: dokter.id,
                    role: 'dokter'
                  }, { transaction: t });

                  res.status(200).json({
                    status: 'success',
                    message: 'Sukses menambahkan Dokter',
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

const allDokter = async (req,res) => {
    Dokter.findAll().then(data => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    })
}

const updateDokter = async (req,res) => {
    const {id} = req.params; 
    Dokter.update(req.body, {
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            status: 'Success',
            message: "Berhasil mengedit Dokter",
            data: data
        })
    }).catch(e => {
        res.status(503).json({
            status: 'Fail',
            message: 'Gagal mengedit'
        })
    })
};

const deleteDokter = async (req,res) => {
    const {id} = req.params;
    // Delete everyone named "Jane"
    try {

        const result = await sequelize.transaction(async (t) => {
        
            const findDokter = await Dokter.findOne({
                where: {
                    id: id
                }
            }, { transaction: t })

            if(findDokter !== null){

                const role = await Role.destroy({
                    where: {
                      id_user: findDokter.id
                    }
                  }, { transaction: t });

                const user = await User.destroy({
                    where: {
                      nama: findDokter.nama
                    }
                  }, { transaction: t });

                  const pasien = await Dokter.destroy({
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

const inputRekamMedis = async (req,res) => {
    await RekamMedis.update(req.body, {
        where: {
          id: req.body.id
        }
    }).then(data => {
        res.json({
            status: 'Success',
            data: 'Rekam Medis dapat di perbarui'
        })
    }).catch(e =>{
        res.json({
            status: 'Fail'
        })
    });
}

const getDokterById = async (req,res) => {
    const {id} = req.params;

    Dokter.findOne({
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




module.exports = {
    createDokter,
    allDokter,
    deleteDokter,
    updateDokter,
    inputRekamMedis,
    getDokterById
    
}