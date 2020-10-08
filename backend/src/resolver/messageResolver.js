const CHAT_CHANNEL = "CHAT_CHANNEL";
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

            console.log(messages);

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
        }
    },

    Subscription: {
        sentMessage: {
            subscribe: (parent, args, { pubsub}, info) => {
                // if (!user) {
                //     throw new AuthenticationError('Not Authorized');
                // }

                return pubsub.asyncIterator([CHAT_CHANNEL]);
            }
        }
    }
}