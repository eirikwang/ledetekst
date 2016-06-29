import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import createStore from './store.js';
import Application from './application';
import TekstBoks from './rediger/rediger-tekstboks';
import Provider from './provider';

const history = useRouterHistory(createHistory)({
    basename: '/ledeteksteditor'
});
const store = createStore(history);

function Root({ children }) {
    return children;
}

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Root}>
                <IndexRoute component={Application} />
                <Route path="nokkel&spraak" component={TekstBoks} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mainapp'));
