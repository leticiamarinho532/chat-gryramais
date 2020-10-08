const CHAT_CHANNEL = "CHAT_CHANNEL";
const USER_CHANNEL = "USER_CHANNEL";

const { AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        messages: async (parent, args , { models, user }, info) => {
            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            const { page = 1, limit = 20 } = args;

            const messages = await models.message.find({}).limit(limit).skip((page - 1) * limit).lean();;

            const count = await models.message.countDocuments(messages);

            return {
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                messages
            };
        }
    },

    Mutation: {
        createMessage: async (parent, args, { models, user, pubsub }, info) => {
            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            const { content } = args.SendMessageInput;

            const message = await models.message.create({ content, user: user.nickname, created_at: new Date() });

            await pubsub.publish(CHAT_CHANNEL, { sentMessage: message });

            return message;

        },

        loggedInUser: async(parent, args, { user, pubsub }, info) => {
            await pubsub.publish(USER_CHANNEL, { loggedUser: user });

            return user;
        },

        loggedOutUser: async(parent, args, { user, pubsub }, info) => {
            return user;
        }

    },

    Subscription: {
        sentMessage: {
            subscribe: (parent, args, { pubsub , user}, info) => {
                if (!user) {
                    throw new AuthenticationError('Not Authorized');
                }

                return pubsub.asyncIterator([CHAT_CHANNEL]);
            }
        },

        loggedUser: {
            subscribe: (parent, args, { pubsub , user }, info) => {
                if (!user) {
                    throw new AuthenticationError('Not Authorized');
                }

                return pubsub.asyncIterator([USER_CHANNEL]);

            }
        }
    }
}