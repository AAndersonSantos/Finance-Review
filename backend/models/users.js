const sequelize = require('sequelize');
const db = require('./db');


const usersdb = db.define('users' , {
    id: {
        type:sequelize.INTEGER,
        autoIncrement: true,
        allowNULL: false,
        primaryKey: true
    },
    first_name: {
        type:sequelize.STRING,
        allowNULL: false,
        required: true
    },
    last_name: {
        type:sequelize.STRING,
        allowNULL: false,
        required: true
    },
    email: {
        type:sequelize.STRING,
        allowNULL: false,
        unique: true,
        required: true
    },
    password: {
        type:sequelize.STRING,
        allowNULL: false,
        required: true
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultVaue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNULL: false
    },
    updatedAt: {
        type: 'TIMESTAMP',
        defaultVaue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNULL: false
    }
});

//usersdb.sync({force: true});
module.exports = usersdb;