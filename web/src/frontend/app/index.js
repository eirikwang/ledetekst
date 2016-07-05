import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import createStore from './store.js';
import Application from './application';
import RedigerTekstboks from './rediger/rediger-tekstboks';
import Provider from './provider';
import Forside from './forside/forside';

const history = useRouterHistory(createHistory)({
    basename: '/ledeteksteditor'
});
const store = createStore(history);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Application}>
                <IndexRoute component={Forside} />
                <Route path="/rediger" component={RedigerTekstboks} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mainapp'));
