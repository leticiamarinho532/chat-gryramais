const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schemas/schema');

const server = new ApolloServer({
    typeDefs: typeDefs
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});