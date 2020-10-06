const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        messages: Message
    }
    
    type Message {
        id: ID!
        message: String!
        user: User!
    }
    
    type User {
        id: ID!
        nickname: String!
    }
`

module.exports = typeDefs;