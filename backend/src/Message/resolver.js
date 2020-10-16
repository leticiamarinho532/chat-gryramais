const { AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        messages: async (parent, args , { messageModel, user }, info) => {
            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            // const { page = 1, limit = 20 } = args;

            const messages = await messageModel
                .find({});
                // .limit(limit)
                // .skip((page - 1) * limit)
                // .sort({created_at: -1})
                // .lean();

            return messages;
        }
    },

    Mutation: {
        createMessage: async (parent, args, { messageModel, user, pubsub }, info) => {
            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            const { content } = args.SendMessageInput;

            const messageInsert = await messageModel
                .create({
                    content,
                    user: user.nickname,
                    created_at: new Date()
                });

            await pubsub.publish("CHAT_CHANNEL", { message: messageInsert });

            return messageInsert;

        }

    },

    Subscription: {
        message: {
            subscribe: async (parent, args, { pubsub , user}, info) => {
                if (!user) {
                    throw new AuthenticationError('Not Authorized');
                }

                return pubsub.asyncIterator(["CHAT_CHANNEL"]);
            }
        }
    }
}