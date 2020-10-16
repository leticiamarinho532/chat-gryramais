import { gql } from '@apollo/client';

export const MESSAGES = gql`
    query messages {
        messages {
            content,
            user,
            created_at 
        }
    }
`;