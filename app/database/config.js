module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL || { host : 'localhost', port : 5432, user : 'dbuser', password : 'dbpass123', database : 'desafiodev'}
};

