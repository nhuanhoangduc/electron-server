const PouchDB = require('./PouchDB');
const db = new PouchDB('clients', { adapter: 'memory' });


module.exports = db;
