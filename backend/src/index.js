const { ApolloServer, gql, PubSub, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');

const { resolverMessage, typeDefMessage, messageModel } = require('./Message/');

mongoose.connect(
    'mongodb://root:secret@chat-database:27017/chat?authSource=admin',
    { useUnifiedTopology: true, useNewUrlParser: true }
)
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

const pubsub = new PubSub();

const getUser = async (req, connection) => {

    if (!req.headers.nickname) {
        throw new AuthenticationError('Not Autorized');
    }

    return req.headers;

}

const server = new ApolloServer({
    typeDefs: [typeDefMessage],
    resolvers: resolverMessage,
    context: async ({ req, res, connection }) => {
        console.log(connection);

        if (connection) {
            return {
                ...connection.context,
                pubsub
            }
        }

        return {
            messageModel,
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

