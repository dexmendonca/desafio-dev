const dayjs = require('dayjs')
const fs = require('fs/promises')

const customParseFormat = require('dayjs/plugin/customParseFormat')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(timezone)
// dayjs.extend(utc)
dayjs.extend(customParseFormat)

const parseLine = (line) => {
    // aplicando lógica de coluna fixa do cnab

    const typeOp = parseInt(line.substr(0,1).trim())
    const date = line.substr(1,8).trim()
    const time =line.substr(42,6).trim()
    const cpf = line.substr(19,11).trim()
    let value = parseInt(line.substr(9,10).trim())/100
    value = [2,3,9].includes(typeOp) ? -value : value
    const card = line.substr(30,12).trim()
    const storeOwner = line.substr(48,14).trim()
    const storeName = line.substr(62,19).trim()

    // Colocando a data e hora no formato correto e setando
    let datetime = dayjs(`${date} ${time}`, 'YYYYDDMM HHmmss').format('YYYY-MM-DDTHH:mm:ss').toString()
    datetime = `${datetime}-0300`

    const lineparsed = {
        typeOp,
        datetime,
        value,
        cpf,
        card,
        storeOwner,
        storeName
    }
    return lineparsed
}

const parseFile = async (file) => {

        // Lendo o Arquivo e transformando num array de linhas para parsear linha a linha
        const fileBinary = await fs.readFile(file, {encoding: 'utf8'})
        const fileLines = fileBinary.toString().split('\n');
        //array de retorno
        const retArr = []
        for (const line of fileLines) {
            if(line!==''){
                retArr.push(parseLine(line))
            }
        }
        return retArr
}


module.exports = {
    parseFile
}