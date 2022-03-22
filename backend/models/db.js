//variavel para Heroku process.env.DATABASE_URL

require('dotenv').config();
const Sequelize = require('sequelize')

const database = process.env.DATABASE
const user = process.env.USER
const password = process.env.PASSWORD

const db = new Sequelize(database, user, password, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
})

db.authenticate().then(function(){
    console.log('Conexão realizada com sucesso');
}).catch(function(err){
    console.log('Erro ao realizar a conexão com banco de dados: ' + err);
})

module.exports = db