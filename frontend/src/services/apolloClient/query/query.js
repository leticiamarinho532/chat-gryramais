import { gql } from '@apollo/client';

export const MESSAGES = gql`
query messages($page: Int, $limit: Int) {
    messages {
        content,
        user,
        created_at 
    }
}
`;