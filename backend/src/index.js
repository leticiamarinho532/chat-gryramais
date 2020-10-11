const { ApolloServer, AuthenticationError, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const messageSchema = require('./schema/messageSchema');
const messageResolver = require('./resolver/messageResolver');
const models = require('./model');

const CHAT_CHANNEL = "CHAT_CHANNEL";

const pubsub = new PubSub();

mongoose.connect(
        'mongodb://root:secret@chat-database:27017/chat?authSource=admin',
    { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

const getUser = async (req, connection) => {

    if (!req.headers.nickname) {
        throw new AuthenticationError('Not Autorized');
    }

    return req.headers;

}

const server = new ApolloServer({
    typeDefs: messageSchema,
    resolvers: messageResolver,
    context: async ({ req, res, connection }) => {
        if (connection) {
            return {
                ...connection.context,
                pubsub
            }
        }

        return {
            models,
            pubsub,
            user: await getUser(req, connection)
        }
    },
    subscriptions: {
        onConnect: async (connectionParams, webSocket) => {

            if (!connectionParams.nickname) {
                throw new AuthenticationError('Not Autorized');
            }

            const message = {
                event: 'UserloggedIn',
                user: connectionParams.nickname
            }

            await pubsub.publish('CHAT_CHANNEL', { message: message });

            return {
                user: connectionParams.nickname
            };
        },
        onDisconnect: async (webSocket, context) => {

            const user = await context.initPromise;

            const message = {
                event: 'UsserloggeOut',
                user: user.user
            }

            await pubsub.publish('CHAT_CHANNEL', { message: message });

        }
    }
});

server
    .listen()
    .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    })
    .catch(error => console.log("Server failed: ", error));