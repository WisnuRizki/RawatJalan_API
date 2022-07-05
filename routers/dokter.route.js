const express = require('express')
const router = express.Router()
const {
    createDokter,
    allDokter,
    deleteDokter,
    updateDokter,
    inputRekamMedis,
    getDokterById
} = require('../controllers/dokter.controller')

 router.post('/createDokter', createDokter);
 router.post('/inputRekamMedis', inputRekamMedis);
 router.get('/allDokter',allDokter);
 router.get('/getDokterById/:id',getDokterById);
router.delete('/deleteDokter/:id',deleteDokter);
router.put('/updateDokter/:id',updateDokter);
 //router.post('/login', login);
// router.post('/purchase', verify,purchaseProduct);
// router.post('/inputProduct',verify,inputProduct);
// router.post('/topUp',verify,topUp);
// router.get('/allProduct',getAllProduct)
// router.get('/product',getProductByName)
// router.get('/getHistory',verify,getHistory)
// router.get('/getBalance',verify,getBalance)

module.exports = router ;