const net = require('net');
const uuidv1 = require('uuid/v1');

const ClientDB = require('@backend/database/ClientDB');
const MessageDB = require('@backend/database/MessageDB');


let server = null;
let clients = {};


const getMessageType = (data) => {
    const splitIndex = data.toString().indexOf('-');
    return data.toString().slice(0, splitIndex);
};
const getMessageData = (data) => {
    const splitIndex = data.toString().indexOf('-');
    return data.toString().slice(splitIndex + 1);
};


const onNewClientConnected = async (socket) => {
    // const clientId = uuidv1();
    const clientId = '123123';
    clients[clientId] = socket;

    socket.on('data', (data) => {
        console.log(data.toString());

        MessageDB.put({
            _id: uuidv1(),
            clientId: clientId,
            type: getMessageType(data),
            message: getMessageData(data),
            isServer: false,
            created: Date.now(),
        });
    });

    socket.on('close', async () => {
        const client = await ClientDB.get(clientId);
        client.status = 'disconnected';
        ClientDB.put(client);
    });

    socket.on('error', function (err) {
        console.log('Connection %s error: %s', socket.remoteAddress, socket.remotePort, err.message);
    });

    try {
        // Save to db
        await ClientDB.put({
            _id: clientId,
            status: 'connected',
            remoteAddress: socket.remoteAddress,
            remotePort: socket.remotePort,
        });
    } catch (error) {
        console.log(error);
        socket.destroy();
    }
};


module.exports = {
    startServer: (host, port) => {
        server = net.createServer(socket => onNewClientConnected(socket));
        server.listen(port, '127.0.0.1');
        console.log('Server stated');
    },

    sendMessage: (clientId, message) => {
        clients[clientId].send(message);
    },
};

