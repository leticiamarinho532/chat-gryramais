import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { MESSAGES } from '../../services/apolloClient/query/query';

import './styles.css';
import MessageBody from "../MessageBody";

const ChatBody = () => {
    const history = useHistory();
    const [page, setPage] = useState(1);
    const userNickname = localStorage.getItem('nickname');

    const { loading, error, data, fetchMore } = useQuery(MESSAGES, {
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

    console.log(data);

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
                <button>Carregar mais</button>
                {data.messages.slice(0).reverse().map(message => (
                        <MessageBody content={message.content} user={message.user}/>
                    )
                )}
            </div>
            <div id='footer'>
                <textarea placeholder='Digite uma mensagem'></textarea>
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default ChatBody;