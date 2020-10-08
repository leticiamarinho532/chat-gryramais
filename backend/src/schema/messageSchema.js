const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        messages(page: Int, limit: Int): MessageResult!
    }
    
    type Mutation {
        createMessage(SendMessageInput: SendMessageInput!): Message!
        loggedInUser: User!
        loggedOutUser: User!
    }
    
    type Subscription {
        sentMessage: Message!
        loggedUser: User!
    }
    
    type User {
        nickname: String!
    }
    
    type MessageResult{
        currentPage: String!
        totalPages: Boolean!
        messages: [Message]!
    }
    
    type Message {
        id: ID!
        content: String!
        user: String!
        created_at: String!
    }
    
    input SendMessageInput {
        content: String!
    }
`

module.exports = typeDefs;