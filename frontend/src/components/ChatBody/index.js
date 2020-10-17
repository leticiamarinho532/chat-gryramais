import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useQuery, useMutation , useSubscription } from '@apollo/client';
import { MESSAGES } from '../../services/apolloClient/query/query';
import { MESSAGESMUTATION } from '../../services/apolloClient/mutation/mutation';
import { GETMESSAGESUBSCRIPTION } from '../../services/apolloClient/subscription/get_message_subscription';
import { GETUSERSUBSCRIPTION } from '../../services/apolloClient/subscription/get_user_subscription';

import './styles.css';
import MessageBody from "../MessageBody";
import UserMessageLogin from '../UserMessageLogin';

const ChatBody = () => {
    const history = useHistory();
    const [content, setContent] = useState();
    const [message, setMessage] = useState([]);
    const [user, setUser] = useState([]);
    const [addMessage] = useMutation(MESSAGESMUTATION);
    let message_subscription = useSubscription(GETMESSAGESUBSCRIPTION);
    let user_subscription = useSubscription(GETUSERSUBSCRIPTION);

    const userNickname = localStorage.getItem('nickname');

    if (!userNickname) {
        alert('Você precisa fornecer um nickname!');
        history.push('/');
    }

    const query = useQuery(MESSAGES, {
        context: {
            headers: {
                nickname: userNickname
            }
        }
    });

    useEffect(() => {
        if (!message_subscription.loading) {
            setMessage((a) => a.concat([{
                id: message_subscription.data.message.id,
                user: message_subscription.data.message.user,
                content: message_subscription.data.message.content,
                created_at: message_subscription.data.message.created_at
            }]));
        }
    }, [message_subscription.data]);


    useEffect(() => {
        if (!user_subscription.loading && !user_subscription.error) {
            setUser((a) => a.concat([{
                user: user_subscription.data.message.user,
                event: user_subscription.data.message.event
            }]));
        }
    }, [user_subscription.data]);

    function handleScroll(event) {
        let element = event.target;

        if (element.scrollHeight + element.scrollTop === element.clientHeight) {
            return element.scrollTop = element.scrollHeight;
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await addMessage({
                context: {
                    headers: {
                        nickname: userNickname
                    }
                },
                variables: {
                    content: content
                }
            })

            setContent('');
        } catch (error) {
            alert('Ocorreu um erro ao mandar a mensagem');
            console.log(error);
        }

    }

    return (
        <div className='component-chat-body'>
            <div id='header'>
                <h2>Chat</h2>
            </div>
            <div id='body' onScroll={handleScroll}>
                {
                    !query.loading && query.data.messages.map(message => (
                        <MessageBody key={message.id} content={message.content} user={message.user}/>
                    ))
                }
                {
                   message.length > 0 && message.map(message => (
                       <MessageBody key={message.id} content={message.content} user={message.user}/>
                   ))
                }
                {
                    user.length > 0 && user.map(user => (
                        <UserMessageLogin key={user.user} user={user.user} event={user.event}/>
                    ))
                }
            </div>
            <form id='footer' onSubmit={handleSubmit}>
                <textarea
                    onChange={event => setContent(event.target.value)}
                    placeholder='Digite uma mensagem'
                    value={content}
                />
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default ChatBody;