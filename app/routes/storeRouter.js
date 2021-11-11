const router = require('express').Router()

const listController = require('../controllers/listController')
const detailController = require('../controllers/detailController')

router.get('/list', listController.render)

router.get('/detail/:id',detailController.render)

module.exports = router