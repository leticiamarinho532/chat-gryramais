import { gql } from '@apollo/client';

export const GETMESSAGESUBSCRIPTION = gql`
    subscription message {
        user,
        content,
        created_at
    }
`;