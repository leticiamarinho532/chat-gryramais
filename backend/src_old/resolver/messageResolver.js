const CHAT_CHANNEL = "CHAT_CHANNEL";
const USER_CHANNEL = "USER_CHANNEL";

const { AuthenticationError, withFilter } = require('apollo-server');

module.exports = {
    Query: {
        messages: async (parent, args , { models, user }, info) => {
            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            const { page = 1, limit = 20 } = args;

            const messages = await models.message
                .find({}).
                limit(limit)
                .skip((page - 1) * limit)
                .sort({created_at: -1})
                .lean();

            return messages;
        }
    },

    Mutation: {
        createMessage: async (parent, args, { models, user, pubsub }, info) => {
            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            const { content } = args.SendMessageInput;

            const message = await models.message
                .create({
                    content,
                    user: user.nickname,
                    created_at: new Date()
                });

            await pubsub.publish(CHAT_CHANNEL, { message: message });

            return message;

        }

    },

    Subscription: {
        message: {
            subscribe: async (parent, args, { pubsub , user}, info) => {
                if (!user) {
                    throw new AuthenticationError('Not Authorized');
                }

                return pubsub.asyncIterator([CHAT_CHANNEL]);
            }
        }
    }
}