const express = require('express')
const router = express.Router()
// const todo = require('./todo.router')
const user = require('./user.route')
const dokter = require('./dokter.route')
const poli = require('./poli.route')
const pasien = require('./pasien.route')
const admin = require('./admin.route')
const rekammedis = require('./rekammedis.route')
// const photo = require('./photo.route')
// const comments = require('./comments.route')

// router.use('/todo', todo);
router.use('/user', user);
router.use('/dokter', dokter);
router.use('/poli', poli);
router.use('/pasien', pasien);
router.use('/admin', admin);
router.use('/rekammedis', rekammedis);
// router.use('/photo', photo);
// router.use('/comments',comments);

module.exports = router