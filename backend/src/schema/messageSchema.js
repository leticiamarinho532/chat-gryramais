const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        messages(page: Int, limit: Int): [Message]
    }
    
    type Mutation {
        createMessage(SendMessageInput: SendMessageInput!): Message!
    }
    
    type Subscription {
        message: Message!
        loggedUser: User!
    }
    
    type User {
        nickname: String!
    }
    
    input getUser {
        nickname: String!
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