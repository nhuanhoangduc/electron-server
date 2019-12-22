const ServerDB = require('@backend/database/ServerDB');
const tcpServer = require('../../../tcpServer');


module.exports = {
    Query: {

    },

    Mutation: {
        startServer: (_, { host, port }) => {
            tcpServer.startServer(host, port);
            return {
                host: host,
                port: port,
            };
        },
    },

    Server: {

    },
};