import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store.js';
import Application from './application';
import RedigerTekstboks from './rediger/rediger-tekstboks';
import Provider from './provider';

const history = useRouterHistory(createHistory)({
    basename: '/ledeteksteditor'
});
const store = createStore(history);

//history = syncHistoryWithStore(useRouterHistory(history, store));

function Root({ children }) {
    return children;
}

render((
    <Provider store={store} >
        <Router history={history}>
            <Route path="/" component={Root}>
                <IndexRoute component={Application} />
                <Route path="/rediger" component={RedigerTekstboks} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mainapp'));
