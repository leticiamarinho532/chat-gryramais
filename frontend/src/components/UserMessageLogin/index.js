import React from 'react';

import './styles.css';

const UserMessageLogin = ({ user, event }) => {

    return (
        <div className='component-user-body'>
            {
                event === 'UserloggedIn'&& (
                    <div id='content'>
                        Usuário {user} acabou de entrar
                    </div>
                )
            }
            {
                event === 'UserloggedOut'&& (
                    <div id='content'>
                        Usuário {user} acabou de sair
                    </div>
                )
            }
        </div>
    )
}

export default UserMessageLogin;