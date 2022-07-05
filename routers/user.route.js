const express = require('express')
const router = express.Router()
const {
    signUp,
    login,
    generatePdf,
    download
} = require('../controllers/user.controller')

 router.post('/register', signUp);
 router.post('/login', login);
 router.get('/generatePdf', generatePdf);
 router.get('/download', download);
// router.post('/purchase', verify,purchaseProduct);
// router.post('/inputProduct',verify,inputProduct);
// router.post('/topUp',verify,topUp);
// router.get('/allProduct',getAllProduct)
// router.get('/product',getProductByName)
// router.get('/getHistory',verify,getHistory)
// router.get('/getBalance',verify,getBalance)

module.exports = router ;