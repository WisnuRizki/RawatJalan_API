const express = require('express')
const router = express.Router()
const {
    createPoli,
    allPoli,
    updatePoli,
    deletePoli,
    getPoliById
} = require('../controllers/poli.controller')

 router.post('/createPoli', createPoli);
 router.get('/allPoli', allPoli);
 router.put('/updatePoli/:id',updatePoli);
 router.delete('/deletePoli/:id',deletePoli);
 router.get('/getPoli/:id',getPoliById)
 //router.post('/login', login);
// router.post('/purchase', verify,purchaseProduct);
// router.post('/inputProduct',verify,inputProduct);
// router.post('/topUp',verify,topUp);
// router.get('/allProduct',getAllProduct)
// router.get('/product',getProductByName)
// router.get('/getHistory',verify,getHistory)
// router.get('/getBalance',verify,getBalance)

module.exports = router ;