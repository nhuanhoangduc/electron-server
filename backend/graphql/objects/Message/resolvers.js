const MessageDB = require('@backend/database/MessageDB');
const tcpServer = require('../../../tcpServer');


module.exports = {
    Query: {
        messages: async (_, { clientId }) => {
            const result = await MessageDB.find({
                selector: {
                    clientId: { $eq: clientId },
                },
            });
            return result.docs;
        },
    },

    Mutation: {
        sendMessage: (_, { clientId, messageType, messageContent }) => {
            const newMessage = {
                _id: uuidv1(),
                clientId: clientId,
                type: messageType,
                message: messageContent,
                isServer: true,
                created: Date.now(),
            };
    
            // Save db
            MessageDB.put(newMessage);
            
            // Send to client socket
            const message = `${messageType}-${messageContent}`;
            tcpServer.sendMessage(clientId, message);
    
            return newMessage;
        },
    },

    Message: {

    },
};