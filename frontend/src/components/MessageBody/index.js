import React from 'react';

import './styles.css';

const MessageBody = ({ content, user }) => {
    return (
        <div className='component-message-body'>
            <div id='content'>
                {content}
            </div>
            <span><i>Por: {user}</i></span>
        </div>
    )
}

export default MessageBody;