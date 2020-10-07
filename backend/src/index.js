const { ApolloServer, AuthenticationError, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const messageSchema = require('./schema/messageSchema');
const messageResolver = require('./resolver/messageResolver');
const models = require('./model');

const pubsub = new PubSub()

mongoose.connect(
        'mongodb://root:secret@chat-database:27017/chat?authSource=admin',
    { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

const getUser = async (req, connection) => {

    // if (!req.headers.nickname) {
    //     throw new AuthenticationError('Not Autorized');
    // }

    return req.headers;

    // let user = null
    //
    // if (req && req.headers.authorization) {
    //     const token = req.headers.authorization.replace('Bearer ', '')
    //     user = await models.user.getUserByToken(token)
    // } else if (connection && connection.context.Authorization) {
    //     const token = connection.context.Authorization.replace('Bearer ', '')
    //     user = await models.user.getUserByToken(token)
    // }
    //
    // return user
}

const server = new ApolloServer({
    typeDefs: messageSchema,
    resolvers: messageResolver,
    context: async ({ req, res, connection }) => {
        return {
            models,
            pubsub,
            user: await getUser(req, connection)
        }
    }
    // context: async ({request}) => {
    //     const nickname = request.headers['nickname'];
    //
    //     console.log(nickname);
    // }
});

server
    .listen()
    .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    })
    .catch(error => console.log("Server failed: ", error));