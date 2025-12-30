require('dotenv').config(); 
const knex = require('knex');
const knexConfig = require('../config/knexfile'); 
const knexFile = require('./knexfile');

const envi = process.env.NODE_ENV || 'development';
const config = knexFile[envi];
const db = knex(config);

module.exports = db;