import { gql } from '@apollo/client';

export const GETUSERSUBSCRIPTION = gql`
    subscription user {
        message {
            user,
            event
        }
    }
`;