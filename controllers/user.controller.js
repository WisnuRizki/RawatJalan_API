const { User, Pasien ,Role, sequelize } = require('../models/index')
var pdf = require("pdf-creator-node");
var fs = require("fs");
const path = require('path')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')

const signUp = async (req, res) => {
    const body = req.body;
    const username = body.username;
    const nama = body.nama;
    const password = bcrypt.hashSync(body.password, 10);
    // Cek di Database apakah user ada atau enggk => User telah terdaftar 
    // Password => Encrypt

    let nomor_rekam = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
      });

    
    

    try {

        const result = await sequelize.transaction(async (t) => {
        
            const findUser = await User.findOne({
                where: {
                    username: username
                }
            }, { transaction: t })

            if(findUser === null){
                const user = await User.create({
                    username: username,
                    nama: nama,
                    password: password
                  }, { transaction: t });
        
                  const role = await Role.create({
                    id_user: user.id
                  }, { transaction: t });

                  const pasien = await Pasien.create({
                    nama: nama,
                    id_rekam: nomor_rekam
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
        console.log(error)
      }
};

const login = async (req,res) => {
    const {username,password} = req.body;
    User.findOne({
        where: {
            username: username
        },
        attributes: [
            'id',
            'password',
        ],
        subQuery: false,
        include:[{
            model: Role,
            as: 'FkUserRole',
            attributes: [
              'id_user',
                'role'
            ]
        }]
    }).then( user => {
        const passwordValid = bcrypt.compareSync(password, user.password);

            if(!passwordValid) {                        
                return res.status(401).send({
                    message: "Email and Password is not match"
                });
            }


            return res.status(200).send({
                status: "SUCCESS",
                message:"User Login Success",
                data: user
            })
    }).catch(e => {
        return res.status(400).send({
            status: "SUCCESS",
            message:"User Login Gagal",
        })
    })
};

const generatePdf = async (req,res) => {
    var html = fs.readFileSync(path.join(__dirname,'./template.html'), "utf8");
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

    var users = [
        {
          name: "Shyamasdasdasd",
          age: "26",
        },
        {
          name: "Navjotasdasdasd",
          age: "26",
        },
        {
          name: "Vitthalasdasd",
          age: "26",
        },
      ];
      var document = {
        html: html,
        data: {
          users: users,
        },
        path: "./docs/output.pdf",
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
  //res.contentType("application/pdf");
  //res.download(path.join(__dirname,'../docs/output.pdf'))
  console.log('success')
  res.download(path.join(__dirname,'../docs/output.pdf'))
}

const download = async (req,res) => {
    res.sendFile(path.join(__dirname,'../docs/output.pdf'))
}



module.exports = {
    signUp,
    login,
    generatePdf,
    download
}