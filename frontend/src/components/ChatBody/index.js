import React, { useState } from 'react';

import './styles.css';

const ChatBody = () => {
    return (
        <div className='component-chat-body'>
            <div id='header'>
                <h2>Chat</h2>
            </div>
            <div id='body'>
                <h5>menssagens</h5>
            </div>
            <div id='footer'>
                <textarea></textarea>
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default ChatBody;