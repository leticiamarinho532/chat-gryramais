import { gql } from '@apollo/client';

export const MESSAGES = gql`
    query messages {
        messages {
            id,
            content,
            user,
            created_at 
        }
    }
`;