const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const express = require('express');
const app = express();

const db = require(path.resolve(__dirname, './database/db'));

//configurando nunjucks para template engine
nunjucks.configure(path.resolve(__dirname, './views'), {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk');

app.use(express.urlencoded({
    extended: true
}))

//importando as rotas
app.use('/', require('./routes/_router'))


//configurando raiz padrão e rota de 404
app.get('/', (req, res) => {
    res.redirect('/upload');
});

//script para facilitar resetar o banco
app.get('/rebuilddb', async (req, res) => {
    const sql_out = fs.readFileSync(path.resolve(__dirname, './database/cleardb.sql')).toString();
    const sql_in = fs.readFileSync(path.resolve(__dirname, './database/init.sql')).toString();

    await db.raw(sql_out)
    await db.raw(sql_in)
    res.redirect('/');
});

app.use('*', (req, res) => {
    res.render('404')
})

const port = 3000
app.listen(port, () => {
    console.log(`SERVIDOR RODANDO NA PORTA ${port}`);
});

//Run app, then load http://localhost:port in a browser to see the output.