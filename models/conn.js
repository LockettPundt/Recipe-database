'use strict'
require('dotenv').config();

const options = {
    host: process.env['DB_HOST'],
    database: process.env['DB_NAME']
}



const pgp = require('pg-promise')({
    query: e => {
    console.log('QUERY', e.query);
    }
});

const db = pgp(options);


module.exports = db;