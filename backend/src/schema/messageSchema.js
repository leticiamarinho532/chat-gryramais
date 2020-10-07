const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        messages: [Message]
    }
    
    type Mutation {
        createMessage(content: String!): Message
    }
    
    type Subscription {
        sentMessage: Message
    }
    
    type Message {
        id: ID!
        content: String!
        user: String!
        created_at: String!
    }
`

module.exports = typeDefs;