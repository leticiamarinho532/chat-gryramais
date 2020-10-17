import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useQuery, useSubscription } from '@apollo/client';
import { MESSAGES } from '../../services/apolloClient/query/query';
import { GETMESSAGESUBSCRIPTION } from '../../services/apolloClient/subscription/get_message_subscription';

import './styles.css';
import MessageBody from "../MessageBody";

const ChatBody = () => {
    const history = useHistory();
    const [message, setMessage] = useState([{}]);
    const userNickname = localStorage.getItem('nickname');

    const query = useQuery(MESSAGES, {
        context: {
            headers: {
                nickname: userNickname
            }
        }
    });

    let subscription = useSubscription(GETMESSAGESUBSCRIPTION);

    useEffect(() => {
        if (!subscription.loading) {
            setMessage((a) => a.concat([{
                id: subscription.data.message.id,
                user: subscription.data.message.user,
                content: subscription.data.message.content,
                created_at: subscription.data.message.created_at
            }]));

            // setMessage(<MessageBody
            //     key={subscription.data.message.id}
            //     content={subscription.data.message.content}
            //     user={subscription.data.message.user}/>
            //     );
        }
    }, [subscription.data]);


    // console.log(JSON.stringify(subscription.error, null, 2));

    if (query.loading) {
        return <h1>{query.loading}</h1>;
    }

    if (!userNickname) {
        alert('Você precisa fornecer um nickname!');
        history.push('/');
    }

    function handleScroll(event) {
        let element = event.target;

        if (element.scrollHeight + element.scrollTop === element.clientHeight) {
            return element.scrollTop = element.scrollHeight;
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

    }

    return (
        <div className='component-chat-body'>
            <div id='header'>
                <h2>Chat</h2>
            </div>
            <div id='body' onScroll={handleScroll}>
                {
                    query.data.messages.map(message => (
                        <MessageBody key={message.id} content={message.content} user={message.user}/>
                    ))
                }
                {
                   message.length && message.map(message => (
                       <MessageBody key={message.id} content={message.content} user={message.user}/>
                   ))
                }

            </div>
            <form id='footer' onSubmit={handleSubmit}>
                <textarea placeholder='Digite uma mensagem'></textarea>
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default ChatBody;