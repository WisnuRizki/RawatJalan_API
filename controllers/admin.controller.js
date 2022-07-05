const { User, Pasien ,Role, Dokter,Admin,Poli,Pendaftaran,RekamMedis,sequelize } = require('../models/index')
const bcrypt = require('bcrypt');
const pendaftaran = require('../models/pendaftaran');

const createAdmin = async (req, res) => {
    const body = req.body;
    const username = body.username;
    const nama = body.nama;
    const alamat = body.alamat;
    const jenisKelamin = body.jenisKelamin;
    const password = bcrypt.hashSync(body.password, 10);
    // Cek di Database apakah user ada atau enggk => User telah terdaftar 
    // Password => Encrypt
    

    try {

        const result = await sequelize.transaction(async (t) => {
        
            const findAdmin = await User.findOne({
                where: {
                    username: username
                }
            }, { transaction: t })

            if(findAdmin === null){
                const user = await User.create({
                    username: username,
                    nama: nama,
                    password: password
                  }, { transaction: t });


                  const admin = await Admin.create({
                    nama: nama,
                    alamat: alamat,
                    jenisKelamin: jenisKelamin
                  }, { transaction: t });
        
                  const role = await Role.create({
                    id_user: admin.id,
                    role: 'admin'
                  }, { transaction: t });

                  

                  res.status(200).json({
                    status: 'success',
                    message: 'Sukses menambahkan Admin',
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

const allAdmin = async (req,res) => {
    Admin.findAll().then(data => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    })
}

const getAdminById = async (req,res) => {
    const {id} = req.params;

    Admin.findOne({
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
            status: 'Gagal'
        })
    })
}

const updateAdmin = async (req,res) => {
    const {id} = req.params; 
    Admin.update(req.body, {
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

const deleteAdmin = async (req,res) => {
    const {id} = req.params;
    // Delete everyone named "Jane"
    try {

        const result = await sequelize.transaction(async (t) => {
        
            const findAdmin = await Admin.findOne({
                where: {
                    id: id
                }
            }, { transaction: t })

            if(findAdmin !== null){

                const role = await Role.destroy({
                    where: {
                      id_user: findAdmin.id
                    }
                  }, { transaction: t });

                const user = await User.destroy({
                    where: {
                      nama: findAdmin.nama
                    }
                  }, { transaction: t });

                  const pasien = await Admin.destroy({
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

const allPendaftaran = async (req,res) => {
    Pendaftaran.findAll({
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

const addRekamMedis = async (req,res) => {
    const {idPasien,namaPasien,id_rekamPasien,idPoli} = req.body;
    // console.log(id_rekamPasien);
    // res.json({
    //     status:'success'
    // })

    // Poli.findOne({
    //     where: {
    //         id: idPoli
    //     },
    //     include:{
    //         model: Dokter,
    //         as: 'FkPoliDokter',
    //     }
    // }).then(data => {
    //     console.log(data.FkPoliDokter.nama)
    // })

    try {

        const result = await sequelize.transaction(async (t) => {
        
            const findDokter = await Poli.findOne({
                where: {
                    id: idPoli
                },
                include:{
                    model: Dokter,
                    as: 'FkPoliDokter',
                }
            }, { transaction: t })

            const rekamMedis = await RekamMedis.create({
                id_pasien: idPasien,
                id_poli: idPoli,
                id_dokter:findDokter.FkPoliDokter.id,
                id_rekam: id_rekamPasien
            }, { transaction: t });
                
            res.status(200).json({
                status: 'success',
            
            })
          
      
        });
      
      } catch (error) {
        console.log(error)
      }

    


}

const hapusPendaftar = async (req,res) => {
    const {id} = req.body;
    console.log(id)
    Pendaftaran.destroy({
        where: {
          id:id
        }
    }).then(data => {
        res.json({
            status: 'success'
        })
    });
}





module.exports = {
    createAdmin,
    allAdmin,
    deleteAdmin,
    updateAdmin,
    allPendaftaran,
    addRekamMedis,
    hapusPendaftar,
    getAdminById
    
}