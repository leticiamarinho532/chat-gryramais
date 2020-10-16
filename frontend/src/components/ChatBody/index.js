import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useQuery, useSubscription } from '@apollo/client';
import { MESSAGES } from '../../services/apolloClient/query/query';
import { GETMESSAGESUBSCRIPTION } from '../../services/apolloClient/subscription/get_message_subscription';

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


    let subscription = useSubscription(GETMESSAGESUBSCRIPTION,{
        connectionParams: {
            nickname: localStorage.getItem('nickname')
        }
    });

    console.log(JSON.stringify(subscription.error, null, 2));


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
            console.log('aqui');
            return element.scrollTop = element.scrollHeight;
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // if (nickname.length <= 0) {
        //     alert('Nickname precisa ser preenchido para ingresso no chat');
        //     return;
        // }

        // localStorage.setItem('nickname', nickname);
        //
        // return history.push('/chat');
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
            </div>
            <form id='footer' onSubmit={handleSubmit}>
                <textarea placeholder='Digite uma mensagem'></textarea>
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default ChatBody;