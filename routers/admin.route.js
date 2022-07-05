const express = require('express')
const router = express.Router()
const {
    createAdmin,
    allAdmin,
    allPendaftaran,
    addRekamMedis,
    hapusPendaftar,
    getAdminById,
    updateAdmin,
    deleteAdmin
} = require('../controllers/admin.controller')


router.post('/registerAdmin', createAdmin);
router.get('/allPendaftaran',allPendaftaran);
router.get('/allAdmin',allAdmin);
router.get('/getAdminById/:id',getAdminById);
router.put('/updateAdmin/:id',updateAdmin);
router.post('/addRekamMedis',addRekamMedis);
router.post('/hapusPendaftar',hapusPendaftar)
router.delete('/deleteAdmin/:id',deleteAdmin)
 //router.post('/login', login);
// router.post('/purchase', verify,purchaseProduct);
// router.post('/inputProduct',verify,inputProduct);
// router.post('/topUp',verify,topUp);
// router.get('/allProduct',getAllProduct)
// router.get('/product',getProductByName)
// router.get('/getHistory',verify,getHistory)
// router.get('/getBalance',verify,getBalance)

module.exports = router ;