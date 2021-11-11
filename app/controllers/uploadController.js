const cnabService = require('../services/cnabService')
const transactionService = require('../services/transactionService')


const render = (req, res) => {
   res.render('upload')
}

const uploadFile = async (req, res) => {
   if(req.file){
      const fileContent = await cnabService.parseFile(req.file.path)
      await transactionService.importFile(fileContent)
   }
   res.redirect('/list')

}


module.exports = {
   render,
   uploadFile 
}