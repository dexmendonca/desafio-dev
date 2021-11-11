const path = require('path')
const multer = require('multer')
const router = require('express').Router()
const upload = multer({ dest: path.resolve(__dirname,'../files') })

const uploadController = require('../controllers/uploadController')

router.get('/',  uploadController.render)
router.post('/',upload.single('file'),uploadController.uploadFile)


module.exports = router