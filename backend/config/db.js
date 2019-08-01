const config = require('../knexfile.js');
const knex = require('knex')(config);

// auto migrate tables when server starts
// not a good practice in a production system just for example
knex.migrate.latest([config]);
module.exports = knex;