const PouchDB = require('./PouchDB');
const db = new PouchDB('server', { adapter: 'memory' });
 
module.exports = db;
