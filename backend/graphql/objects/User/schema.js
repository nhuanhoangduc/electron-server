  
const { gql } = require('apollo-server');


module.exports = gql`
    type User {
        id: ID!
        name: String
        email: String
    }

    extend type Query {
        users(filter: JSON, options: JSON): [User]
        user(id: ID): User
    }

    extend type Mutation {
        addUser(user: JSON): User
    }
`;
