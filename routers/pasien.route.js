const express = require('express')
const router = express.Router()
const {
    updatePasien,
    allPasien,
    deletePasien,
    daftarRawatJalan,
    generatePdfAntrian,
    getPendaftaranById,
    download,
    getPasienById
} = require('../controllers/pasien.controller')

router.put('/updatePasien/:id', updatePasien);
router.post('/daftarrawatjalan', daftarRawatJalan);
router.get('/allPasien',allPasien);
router.get('/getPasienById/:id',getPasienById);
router.get('/download', download);
router.get('/getPendaftaranById/:id',getPendaftaranById);
router.get('/generatePdfAntrian/:id',generatePdfAntrian);
router.delete('/deletePasien/:id',deletePasien);

module.exports = router ;