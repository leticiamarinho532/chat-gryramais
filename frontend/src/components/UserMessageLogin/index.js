import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSubscription } from '@apollo/client';
import { MESSAGES } from '../../services/apolloClient/subscription/get_message_subscription';

import './styles.css';

const UserMessageLogin = () => {
    const history = useHistory();
    const [page, setPage] = useState(1);
    const userNickname = localStorage.getItem('nickname');

    const { loading, error, data, fetchMore } = useSubscription(MESSAGES, {
        context: {
            headers: {
                nickname: userNickname
            }
        },
        variables: {
            page: 1,
            limit: 10
        }
    });

    if (loading) {
        return <h1>{loading}</h1>;
    }

    if (error) {
        // return <p>{error.networkError.result.errors}</p>;
        console.log(JSON.stringify(error, null, 2));
    }

    if (!userNickname) {
        alert('Você precisa fornecer um nickname!');
        history.push('/');
    }

    function handleScroll(event) {
        let element = event.target;

        if (element.scrollHeight + element.scrollTop === element.clientHeight) {
            return element.scrollTop;
        }
    }

    return (
        <div className='component-chat-body'>
            <div id='header'>
                <h2>Chat</h2>
            </div>
            <div id='body' onScroll={handleScroll}>
                {data.messages.map(message => (
                        <MessageBody content={message.content} user={message.user}/>
                    )
                )}
                {/*<MessageBody />*/}
            </div>
            <div id='footer'>
                <textarea placeholder='Digite uma mensagem'></textarea>
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default UserMessageLogin;