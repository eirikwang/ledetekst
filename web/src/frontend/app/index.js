import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import createStore from './store.js';
import Application from './application';
import Provider from './provider';
import Applikasjoner from './applikasjoner/applikasjoner';
import Tekster from './tekster/tekster';
import TeksterListe from './tekster/tekster-liste';
import RedigerTekstboks from './rediger/rediger';
import { syncHistoryWithStore } from 'react-router-redux';
import { InnloggingsStatus } from './logginn/logginn-actions';
import Login from './logginn/logginn';


const realHistory = useRouterHistory(createHistory)({
    basename: '/ledeteksteditor'
});
const store = createStore(realHistory);
const history = syncHistoryWithStore(realHistory, store);

function kreverInnlogging(nextState, replace) {
    if (store.getState().autentisert.status !== InnloggingsStatus.LOGGET_INN) {
        replace({
            pathname: '/login',
            state: {
                pathname: nextState.location.pathname,
                query: nextState.location.query
            }
        });
    }
}
render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Application}>
                <IndexRoute component={Applikasjoner} />
                <Route path="/tekster/:applikasjon" component={Tekster}>
                    <IndexRoute component={TeksterListe} />
                    <Route path="rediger" onEnter={kreverInnlogging} component={RedigerTekstboks} />
                </Route>
                <Route path="/login" component={Login} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mainapp'));
