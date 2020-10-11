import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './pages/Chat';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path='/' exact />
                <Route component={Chat} path='/chat' />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;