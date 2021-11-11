const dayjs = require('dayjs')
const db = require('../database/db')

const storeService = require('../services/storeService')

const importFile =async (fileData) => {

    //trabalhando as linhas do arquivo cnab para jogar no banco
    const total = fileData.length

    const tscArr = []
    for (let i = 0; i < total; i++) {
        const line = fileData[i];
        const storeId = await storeService.findOrCreate(line.storeName,line.storeOwner)

        tscArr.push({
            typeop:line.typeOp,
            tscvalue: line.value,
            cpf: line.cpf,
            cardnumber: line.card,
            store_id: storeId,
            occurred_at: line.datetime
        })

    }
    await db('tsc').insert(tscArr)
}

//Lista aqui no código mesmo, apenas para adiantar, o correto seria ela ir para o banco
const operationList = []
operationList[1]= {name:'Débito',signal:'+'}
operationList[2]= {name:'Boleto',signal:'-'}
operationList[3]= {name:'Financiamento',signal:'-'}
operationList[4]= {name:'Crédito',signal:'+'}
operationList[5]= {name:'Recebimento Empréstimo',signal:'+'}
operationList[6]= {name:'Vendas',signal:'+'}
operationList[7]= {name:'Recebimento TED',signal:'+'}
operationList[8]= {name:'Recebimento DOC',signal:'+'}
operationList[9]= {name:'Aluguel',signal:'-'}

const list = async (storeId) => {
    //Selecionando os dados das movimentações e mandando vir também o dado da loja para não usar mais de uma query
    let tscs = await db.raw(`
        select typeop,tscvalue as value,cpf,cardnumber,occurred_at,store.storename,store.ownername from tsc
            inner join store on store.id = tsc.store_id
            where store_id = :storeId
            order by occurred_at ASC
    `, {
        storeId
    })
    tscs = tscs.rows
    let storeinfo={
        name:null,
        owner:null
    }
    const total = tscs.length

    //poderia usar um reduce aqui, mas o for é mais performático
    let balance = 0
    for (let i = 0; i < total; i++) {

        //pegando info de loja
        if(i===0){
            storeinfo.name = tscs[i].storename
            storeinfo.owner = tscs[i].ownername
        }

        tscs[i].occurred_at = dayjs(tscs[i].occurred_at).format('DD/MM/YYYY HH:mm')
        const opdate= operationList[tscs[i].typeop]
        tscs[i].signal = opdate.signal;
        tscs[i].operation = opdate.name;
        
        //poderia excluir o typeop aqui, mas vou passar ele pra frente pra auxiliar alguma regra de front (pode ser baseada no número)
        
        //tratando o valor e calculando aqui,poderia vir na própria query o somatório, mas como já está no for, aproveito para ajeitar tudo
        tscs[i].value = parseFloat(tscs[i].value)
        balance+=tscs[i].value

        tscs[i].value_label = `R$ ${`${tscs[i].value.toFixed(2)}`.split('.').join(',')}`

    }

    //mandar o saldo como formatado ou não pra auxiliar o front já com o modelo pronto
    //formatando com split e join, regex não fica tão performático quanto
    return {
        storeinfo,
        balance,
        balance_label: `R$ ${balance.toFixed(2).split('.').join(',')}`,
        statement:tscs
    }
}

module.exports = {
    importFile,
    list
}

