const CHAT_CHANNEL = "CHAT_CHANNEL";
const { AuthenticationError } = require('apollo-server');

// const Message = require('../model/messageModel');

module.exports = {
    Query: {
        messages: async (parent, args, { models, user }, info) => {

            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            const messages = await models.message.find({});
            // const messages = await Message.find({});
            console.log(messages);
            //return messages;
        }
    },

    Mutation: {
        createMessage: async (parent, args, { models, user, pubsub }, info) => {
            if (!user) {
                throw new AuthenticationError('Not Authorized');
            }

            const { content } = args.SendMessageInput;

            const message = await models.message.create({ content, user: user.nickname, created_at: new Date().toDateString() });
            // const message = await Message.create({ content, user: user.nickname, created_at: new Date().toDateString() });

            await pubsub.publish(CHAT_CHANNEL, { sentMessage: message });

            return message;
        }
    },

    Subscription: {
        sentMessage: (parent, args, { pubsub, user }, info) => {
            return pubsub.asyncIterator(CHAT_CHANNEL);
        }
    }
}