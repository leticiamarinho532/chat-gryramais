import { gql } from '@apollo/client';

export const MESSAGESMUTATION = gql`
    mutation message ($content: String!) {
        createMessage(SendMessageInput: {content: $content}) {
            content,
            user,
            created_at
        }
    }
`;
