const transactionService = require('../services/transactionService')


const render =async (req, res) => {
   const tscs = await transactionService.list(req.params.id)
   res.render('detail',{tscs})
}


module.exports = {
   render
}