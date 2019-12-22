const PouchDB = require('./PouchDB');
const db = new PouchDB('messages', { adapter: 'memory' });

db.createIndex({
    index: {fields: ['created', 'clientId']}
});

module.exports = db;
