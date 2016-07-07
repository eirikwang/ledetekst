import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import createStore from './store.js';
import Application from './application';
import Rediger from './rediger/rediger';
import Provider from './provider';
import Forside from './forside/forside';
import Login from './logginn/logginn';
import { InnloggingsStatus } from './logginn/logginn-actions';

const history = useRouterHistory(createHistory)({
    basename: '/ledeteksteditor'
});
const store = createStore(history);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Application}>
                <IndexRoute component={Forside} />
                <Route path="/rediger" onEnter={kreverInnlogging}  component={Rediger} />
                <Route path="/login" component={Login} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mainapp'));

function kreverInnlogging(nextState, replace) {
    if(store.getState().autentisert.status !== InnloggingsStatus.LOGGET_INN){
        replace({
            pathname: '/login',
            state: {
                nextPathName: nextState.location.pathname,
                query: nextState.location.query
            }
        });
    }
}
