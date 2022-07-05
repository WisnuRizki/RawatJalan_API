const express = require('express')
const router = express.Router()
const {
    allRekamMedis,
    getRekamMedisByNama,
    generatePdfRawatJalan,
    generatePdfRekamMedisPasien,
    downloadRekamMedisPasien,
    getRekamMedisByIdDokter
} = require('../controllers/rekammedis.controller')

 router.get('/allRekamMedis', allRekamMedis);
 router.get('/getRekamMedisByNama',getRekamMedisByNama)
 router.get('/getRekamMedisByIdDokter/:id',getRekamMedisByIdDokter)
 router.get('/generatePdf',generatePdfRawatJalan)
 router.get('/downloadRekamMedisPasien',downloadRekamMedisPasien)
 router.post('/generatePdfPasien',generatePdfRekamMedisPasien)
 //router.post('/login', login);
// router.post('/purchase', verify,purchaseProduct);
// router.post('/inputProduct',verify,inputProduct);
// router.post('/topUp',verify,topUp);
// router.get('/allProduct',getAllProduct)
// router.get('/product',getProductByName)
// router.get('/getHistory',verify,getHistory)
// router.get('/getBalance',verify,getBalance)

module.exports = router ;