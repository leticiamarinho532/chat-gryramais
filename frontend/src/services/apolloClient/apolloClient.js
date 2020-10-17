import { ApolloClient, InMemoryCache, split, createHttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        connectionParams: {
            nickname: localStorage.getItem('nickname')
        },
        reconnect: true
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;