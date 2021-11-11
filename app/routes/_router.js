const router = require('express').Router()

//importando rotas específicas
const storeRouter = require('./storeRouter')
const uploadRouter = require('./uploadRouter')

router.use('/upload',uploadRouter)
router.use('/',storeRouter)

module.exports = router