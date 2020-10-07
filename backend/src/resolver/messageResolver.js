const CHAT_CHANNEL = "CHAT_CHANNEL";
const { AuthenticationError } = require('apollo-server');

const Message = require('../model/messageModel');

module.exports = {
    Query: {
        messages: async (parent, args, { user }, info) => {

            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            const messages = await Message.find({});
            return messages;
        }
    },

    Mutation: {
        createMessage: async (parent, { content }, { user, pubsub }, info) => {
            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            const message = await Message.create({ content, user: user.nickname, create_at: new Date().toDateString() });

            await pubsub.publish(CHAT_CHANNEL, { sentMessage: message });

            return message;
        }
    },

    Subscription: {
        sentMessage: (parent, args, { pubsub }, info) => {
            return pubsub.asyncIterator(CHAT_CHANNEL);
        }
    }
}