const { gql } = require('apollo-server');


module.exports = gql`
    type Server {
        _id: ID!
        host: String
        port: Int
    }

    extend type Mutation {
        startServer(host: String, port: Int): Server
    }
`;
