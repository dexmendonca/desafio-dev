const router = require('express').Router()

//importando rotas específicas
const apiRouter = require('./apiRouter')
const storeRouter = require('./storeRouter')
const uploadRouter = require('./uploadRouter')

router.use('/upload',uploadRouter)
router.use('/',storeRouter)

router.use('/api',apiRouter)

module.exports = router