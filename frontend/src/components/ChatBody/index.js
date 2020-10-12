import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { MESSAGES } from '../../services/apolloClient/query/query';

import './styles.css';

const ChatBody = () => {
    const userNickname = localStorage.getItem('nickname');

    const { loading, error, data } = useQuery(MESSAGES, {
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

    return (
        <div className='component-chat-body'>
            <div id='header'>
                <h2>Chat</h2>
            </div>
            <div id='body'>
                {data.messages.map(message => (
                        <div id='message'>
                            <div>
                                {message.content}
                            </div>
                            <span>Por: {message.user}</span>
                        </div>
                    )
                )}
                <div id='message'>
                    <div>
                       olá
                    </div>
                    <span><i>Por: Letícia</i></span>
                </div>
            </div>
            <div id='footer'>
                <textarea placeholder='Digite uma mensagem'></textarea>
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default ChatBody;