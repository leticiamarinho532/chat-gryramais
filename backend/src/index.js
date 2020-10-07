const { ApolloServer, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');

const messageSchema = require('./schema/messageSchema');
const messageResolver = require('./resolver/messageResolver');

mongoose.connect('mongodb://192.168.112.2:27017/chat', {useNewUrlParser: true, useUnifiedTopology: true } );

const server = new ApolloServer({
    typeDefs: messageSchema,
    resolvers: messageResolver,
    context: async ({request}) => {
        const nickname = request.headers['nickname'];

        console.log(nickname);
    }
});

server
    .listen()
    .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    })
    .catch(error => console.log("Server failed: ", error));