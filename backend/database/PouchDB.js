const PouchDB = require('pouchdb');

PouchDB.plugin(require('pouchdb-adapter-memory'));
PouchDB.plugin(require('pouchdb-find'));

module.exports = PouchDB;
