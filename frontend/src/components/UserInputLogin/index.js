import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

const UserInputLogin = () => {
    const history = useHistory();

    const [nickname, setNickname] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        if (nickname.length <= 0) {
            alert('Nickname precisa ser preenchido para ingresso no chat');
            return;
        }

        localStorage.setItem('nickname', nickname);

        return history.push('/chat');
    }

    return (
        <form id='component-form-user' onSubmit={handleSubmit}>
            <label>Nickname</label>
            <input
                type='text'
                name='nickname'
                onChange={e => setNickname(e.target.value)}
            />
            <button type="submit">Entrar</button>

        </form>
    )
}

export default UserInputLogin;