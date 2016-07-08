import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';
import createStore from './store.js';
import Application from './application';
import Rediger from './rediger/rediger';
import Provider from './provider';
import Forside from './forside/forside';
import Login from './logginn/logginn';
import kreverInnlogging from './felles/krever-innlogging';

const realHistory = useRouterHistory(createHistory)({
    basename: '/ledeteksteditor'
});

const store = createStore(realHistory);
const history = syncHistoryWithStore(realHistory, store);
render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Application}>
                <IndexRoute component={Forside} />
                <Route path="/rediger" component={kreverInnlogging(Rediger)} />
                <Route path="/login" component={Login} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mainapp'));
