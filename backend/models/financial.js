const sequelize = require('sequelize');
const db = require('./db');

const financialdb = db.define('financials' , {
    
    id: {
        type:sequelize.INTEGER,
        autoIncrement: true,
        allowNULL: false,
        primaryKey: true
    },
    cash_value: {
        type:sequelize.DECIMAL,
        allowNULL: false,
        required: true
    },
    description: {
        type:sequelize.TEXT,
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
})

//financialdb.sync({force: true});
module.exports = financialdb;