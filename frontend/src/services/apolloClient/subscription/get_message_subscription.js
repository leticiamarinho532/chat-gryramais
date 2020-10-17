import { gql } from '@apollo/client';

export const GETMESSAGESUBSCRIPTION = gql`
    subscription message {
        message {
            id,
            user,
            content,
            created_at
        }
    }
`;