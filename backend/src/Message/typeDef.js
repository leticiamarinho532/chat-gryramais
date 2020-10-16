const { gql } =  require('apollo-server');

const typeDefs = gql`
    type Query {
        messages: [Message]
    }
    
    type Mutation {
        createMessage(SendMessageInput: SendMessageInput!): Message!
    }
    
    type Subscription {
        message: Message!
    }
    
    type MessageResult{
        messages: [Message]!
    }
    
    type Message {
        id: ID!
        content: String!
        event: String!
        user: String!
        created_at: String!
    }
    
    input SendMessageInput {
        content: String!
    }
`

module.exports = typeDefs;