const { gql } = require('apollo-server');


module.exports = gql`
    type Message {
        _id: ID
        clientId: ID
        type: String
        message: String
        isServer: Boolean
        created: Int
    }

    extend type Query {
        messages(clientId: ID): [Message]
    }

    extend type Mutation {
        sendMessage(clientId: ID, messageType: String, messageContent: String): Message
    }
`;
