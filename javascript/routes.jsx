import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Study from './components/views/study';
import Address from './components/views/address';
import Drug from './components/views/drug';
export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='study' component={Study} />
        <Route path='drug' component={Drug} />
        <Route path='address' component={Address} />
        <Route path='*' component={Home} />
    </Route>
);