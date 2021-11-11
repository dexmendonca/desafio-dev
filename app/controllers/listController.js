const storeService = require('../services/storeService')


const render =async (req, res) => {
   const list = await storeService.list()
  
   res.render('list',{stores:list})
}


module.exports = {
   render
}