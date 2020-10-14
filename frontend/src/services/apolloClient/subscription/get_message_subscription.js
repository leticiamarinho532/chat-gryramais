import { gql } from '@apollo/client';

export const MESSAGES = gql`
    subscription message {
        user,
        content,
        created_at
    }
`;