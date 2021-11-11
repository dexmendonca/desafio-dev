const db = require('../database/db')

const findOrCreate = async (name,owner)=> {
    let store = await db('store').where({storename:name}).select('id')
    if(store.length==0){
        
        try {
            const result = await db('store').insert({storename:name,ownername:owner}).returning('id');
            store = result[0]
        } catch (e) {
            throw e;
        }
    }else{
        store = store[0].id
    }
    return store
}

const list = async ()=> {
    const store = await db('store').orderBy('storename', 'ASC')
    return store
}

module.exports = {
    findOrCreate,
    list
}