const { ApolloServer, gql } = require('apollo-server');
const { typeDefs, resolvers } = require('@backend/graphql');


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    playground: true,
    introspection: true,
});


// The `listen` method launches a web server.
server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
